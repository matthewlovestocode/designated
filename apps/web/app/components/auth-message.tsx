interface AuthMessageProps {
  message?: string;
}

export default function AuthMessage({ message }: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return <p>{message}</p>;
}
