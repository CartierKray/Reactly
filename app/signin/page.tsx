import type { Metadata } from "next";

import AuthPanel from "@/components/site/Auth";

export const metadata: Metadata = {
  title: "Inloggen",
  robots: { index: false, follow: true },
  alternates: { canonical: "/signin" },
};

export default function SignInPage() {
  return <AuthPanel mode="signin" />;
}
