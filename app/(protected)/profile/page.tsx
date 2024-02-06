import { auth } from "@clerk/nextjs";

export default function page() {
  const { user } = auth();
  return <div>{user?.firstName}</div>;
}
