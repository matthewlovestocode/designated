import Link from "next/link";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import { signIn } from "../auth/actions";

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <main>
      <section>
        <PageHeader heading="Sign In" />
        <AuthMessage message={message} />
        <form action={signIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Need an account? <Link href="/sign-up">Sign up</Link>
        </p>
      </section>
    </main>
  );
}
