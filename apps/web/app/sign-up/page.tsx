import Link from "next/link";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import { signUp } from "../auth/actions";

export default async function SignUpPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <main>
      <section>
        <PageHeader heading="Sign Up" />
        <AuthMessage message={message} />
        <form action={signUp}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
