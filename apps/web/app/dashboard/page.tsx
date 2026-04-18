import { redirect } from "next/navigation";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import { signOut } from "../auth/actions";
import { createClient } from "../../lib/supabase/server";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const supabase = await createClient();
  const { message } = await searchParams;
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
        <AuthMessage message={message} />
        <p>Signed in as: {user.email}</p>
        <form action={signOut}>
          <button type="submit">Sign Out</button>
        </form>
      </section>
    </main>
  );
}
