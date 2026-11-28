import Mail from "@/components/dashboard/Mail";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mail" };

export default function MailPage({ searchParams }: { searchParams: { to?: string } }) {
  return <Mail initialTo={typeof searchParams.to === "string" ? searchParams.to : undefined} />;
}
