import { redirect } from "next/navigation";

// Hard redirect at the app level, so the homepage never depends on middleware.
export default function RootPage() {
  redirect("/hu");
}
