interface PageHeaderProps {
  heading: string;
}

export default function PageHeader({ heading }: PageHeaderProps) {
  return (
    <div>
      <h1>{heading}</h1>
    </div>
  );
}
