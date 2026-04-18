interface PageHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  heading,
  description
}: PageHeaderProps) {
  return (
    <div>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{heading}</h1>
      {description ? <p className="copy">{description}</p> : null}
    </div>
  );
}
