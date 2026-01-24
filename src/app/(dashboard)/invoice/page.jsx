import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvoiceInfo from "@/components/dashboard/section/InvoiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "FIA - Food Industry Assistance | Invoice",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <InvoiceInfo />
      </DashboardLayout>
    </>
  );
}
