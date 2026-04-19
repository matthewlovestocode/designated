import Typography from "@mui/material/Typography";

interface PageHeaderProps {
  heading: string;
}

export default function PageHeader({ heading }: PageHeaderProps) {
  return (
    <Typography component="h1" variant="h3">
      {heading}
    </Typography>
  );
}
