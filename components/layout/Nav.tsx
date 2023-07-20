import { auth } from "@/lib/auth";
import Navbar from "./Navbar";

export default async function Nav() {
  const session = await auth();

  return <Navbar session={session} />;
}
