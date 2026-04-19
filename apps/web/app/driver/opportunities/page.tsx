import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import OpportunitiesMap from "../../components/opportunities-map";
import PageHeader from "../../components/page-header";
import RideRequestList from "../../ride-requests/ride-request-list";
import type { Tables } from "../../../lib/supabase/database.types";
import { getDistanceMiles } from "../../../lib/driver-availability";
import { requireUserWithRole } from "../../../lib/roles";
import { createClient } from "../../../lib/supabase/server";

export default async function DriverOpportunitiesPage() {
  const user = await requireUserWithRole("driver", {
    signedInMessage: "Please sign in to view driver opportunities.",
    unauthorizedMessage: "Driver access required."
  });
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("ride_requests")
    .select(
      "cancelled_at, claimed_at, completed_at, created_at, id, matched_driver_user_id, notes, pickup_label, pickup_latitude, pickup_longitude, requested_by_role, status"
    )
    .in("status", ["open", "matched"])
    .order("created_at", { ascending: false });
  const { data: availability } = await supabase
    .from("driver_availability")
    .select("latitude, longitude, radius_miles, is_available")
    .eq("driver_user_id", user.id)
    .maybeSingle();

  const typedRequests: Array<
    Pick<
      Tables<"ride_requests">,
      | "cancelled_at"
      | "claimed_at"
      | "completed_at"
      | "created_at"
      | "id"
      | "matched_driver_user_id"
      | "notes"
      | "pickup_label"
      | "pickup_latitude"
      | "pickup_longitude"
      | "requested_by_role"
      | "status"
    >
  > = requests ?? [];

  const openRequests = typedRequests.filter((request) => request.status === "open");
  const claimedRequests = typedRequests.filter(
    (request) =>
      request.status === "matched" && request.matched_driver_user_id === user.id
  );
  const rankedOpenRequests =
    availability?.is_available && availability.latitude !== null && availability.longitude !== null
      ? openRequests
          .map((request) => {
            const distanceMiles = getDistanceMiles(
              availability.latitude as number,
              availability.longitude as number,
              request.pickup_latitude,
              request.pickup_longitude
            );
            const isInRange = distanceMiles <= (availability.radius_miles ?? 10);

            return {
              ...request,
              distanceMiles,
              isInRange
            };
          })
          .sort((left, right) => {
            if (left.isInRange !== right.isInRange) {
              return left.isInRange ? -1 : 1;
            }

            return left.distanceMiles - right.distanceMiles;
          })
      : openRequests.map((request) => ({
          ...request,
          distanceMiles: null,
          isInRange: true
        }));
  const visibleOpenRequests = rankedOpenRequests.filter((request) => request.isInRange);
  const hiddenOutOfRangeCount = rankedOpenRequests.filter((request) => !request.isInRange).length;
  const mapRequests = [...visibleOpenRequests, ...claimedRequests];

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Opportunities" />
        <Typography>
          This page shows persisted ride requests created by patrons and concierges
          inside your current driving context.
        </Typography>
        <OpportunitiesMap
          driverLatitude={availability?.latitude ?? null}
          driverLongitude={availability?.longitude ?? null}
          driverRadiusMiles={availability?.radius_miles ?? 10}
          opportunities={mapRequests}
        />
        <Stack spacing={2}>
          <Typography variant="h5">Open Opportunities</Typography>
          {hiddenOutOfRangeCount ? (
            <Typography color="text.secondary" variant="body2">
              {hiddenOutOfRangeCount} open request
              {hiddenOutOfRangeCount === 1 ? "" : "s"} outside your current
              coverage radius {hiddenOutOfRangeCount === 1 ? "is" : "are"} hidden for
              now.
            </Typography>
          ) : null}
          <RideRequestList
            currentUserId={user.id}
            emptyMessage="There are no open ride requests right now."
            requests={visibleOpenRequests}
            showClaimAction
          />
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Typography variant="h5">Claimed By You</Typography>
          <RideRequestList
            currentUserId={user.id}
            emptyMessage="You have not claimed any ride requests yet."
            requests={claimedRequests}
            showCompleteAction
          />
        </Stack>
        {!availability?.is_available ? (
          <Box
            sx={{
              bgcolor: "action.hover",
              borderRadius: 3,
              p: 2.5
            }}
          >
            <Typography color="text.secondary">
              Turn on availability from the Driver page to compare requests against
              your live coverage area.
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </DashboardShell>
  );
}
