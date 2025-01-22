import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StripePricingTable from "@/components/stripe/StripeTable";
import Admin from "@/components/Admin";

export const dynamic = "force-dynamic";

const supabase = createServerComponentClient({ cookies });
export default async function Index() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <Admin />
  );
}
