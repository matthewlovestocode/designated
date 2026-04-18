import Link from "next/link";

export default function TopNav() {
  return (
    <nav aria-label="Primary">
      <ul className="top-nav">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
