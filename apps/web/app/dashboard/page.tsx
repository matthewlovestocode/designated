import { redirect } from "next/navigation";
import PageHeader from "../components/page-header";
import { signOut } from "../auth/actions";
import { createClient } from "../../lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the dashboard.");
  }

  return (
    <main>
      <section>
        <PageHeader heading="Dashboard" />
        <p>Signed in as: {user.email}</p>
        <form action={signOut}>
          <button type="submit">Sign Out</button>
        </form>
      </section>
    </main>
  );
}
