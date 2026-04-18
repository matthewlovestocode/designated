import PageHeader from "./components/page-header";
import ClickCounter from "./components/click-counter";

export default function Home() {
  return (
    <main>
      <section>
        <PageHeader heading="Designated" />
        <p>Supabase client helpers are set up for this Next.js app.</p>
        <ClickCounter />
      </section>
    </main>
  );
}
