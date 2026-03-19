import { redirect } from "next/navigation";

// Redirect /archive to /issues
export default function ArchivePage() {
  redirect("/issues");
}
