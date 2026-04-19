import Alert from "@mui/material/Alert";

interface AuthMessageProps {
  message?: string;
}

export default function AuthMessage({ message }: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return <Alert severity="info">{message}</Alert>;
}
