import PageHeader from "./components/page-header";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <PageHeader
          eyebrow="Starter App"
          heading="Designated"
          description="This Next.js app lives in the web workspace and is styled with plain global CSS."
        />
      </section>
    </main>
  );
}
