import PageHeader from "./components/page-header";
import ClickCounter from "./components/click-counter";

export default function Home() {
  return (
    <main>
      <section>
        <PageHeader heading="Designated" />
        <ClickCounter />
      </section>
    </main>
  );
}
