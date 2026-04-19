import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Tables } from "../../lib/supabase/database.types";
import { cancelRideRequest, claimRideRequest, completeRideRequest } from "./actions";

type RideRequest = Pick<
  Tables<"ride_requests">,
  | "created_at"
  | "id"
  | "matched_driver_user_id"
  | "notes"
  | "pickup_label"
  | "pickup_latitude"
  | "pickup_longitude"
  | "requested_by_role"
  | "status"
>;

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export default function RideRequestList({
  currentUserId,
  emptyMessage,
  requests,
  showClaimAction = false,
  showCancelAction = false,
  showCompleteAction = false
}: {
  currentUserId?: string;
  emptyMessage: string;
  requests: RideRequest[];
  showCancelAction?: boolean;
  showClaimAction?: boolean;
  showCompleteAction?: boolean;
}) {
  if (!requests.length) {
    return <Typography>{emptyMessage}</Typography>;
  }

  return (
    <Stack spacing={2}>
      {requests.map((request, index) => (
        <Stack
          key={request.id}
          spacing={1}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            p: 2.5
          }}
        >
          <Typography variant="h6">Ride Request {index + 1}</Typography>
          <Typography color="text.secondary" variant="body2">
            Created {formatTimestamp(request.created_at)} by {request.requested_by_role}.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Chip
              color={
                request.status === "open"
                  ? "warning"
                  : request.status === "matched"
                    ? "info"
                    : request.status === "completed"
                      ? "success"
                      : "default"
              }
              label={`Status: ${request.status}`}
              variant="outlined"
            />
            {currentUserId && request.matched_driver_user_id === currentUserId ? (
              <Chip color="success" label="Claimed by you" variant="outlined" />
            ) : null}
          </Stack>
          <Typography>
            Pickup: {request.pickup_label || "Unnamed pickup"} at{" "}
            {request.pickup_latitude.toFixed(4)}, {request.pickup_longitude.toFixed(4)}
          </Typography>
          <Typography>
            Notes: {request.notes?.trim() ? request.notes : "No additional notes."}
          </Typography>
          {request.matched_driver_user_id ? (
            <Typography>Matched driver: {request.matched_driver_user_id}</Typography>
          ) : null}
          {showCancelAction ? (
            <form action={cancelRideRequest.bind(null, request.id)}>
              <Button color="warning" type="submit" variant="outlined">
                Cancel request
              </Button>
            </form>
          ) : null}
          {showClaimAction && request.status === "open" ? (
            <form action={claimRideRequest.bind(null, request.id)}>
              <Button type="submit" variant="contained">
                Claim request
              </Button>
            </form>
          ) : null}
          {showCompleteAction &&
          request.status === "matched" &&
          currentUserId &&
          request.matched_driver_user_id === currentUserId ? (
            <form action={completeRideRequest.bind(null, request.id)}>
              <Button color="success" type="submit" variant="contained">
                Mark completed
              </Button>
            </form>
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
}
