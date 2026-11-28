import type { Metadata } from "next";

import AuthPanel from "@/components/site/Auth";

export const metadata: Metadata = {
  title: "Account aanmaken",
  robots: { index: false, follow: true },
  alternates: { canonical: "/signup" },
};

export default function SignUpPage() {
  return <AuthPanel mode="signup" />;
}
