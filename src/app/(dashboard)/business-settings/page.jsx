import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BusinessSettingsInfo from "@/components/dashboard/section/BusinessSettingsInfo";

export const metadata = { title: "FIA - Business Settings" };

export default function page() {
  return (
    <DashboardLayout>
      <BusinessSettingsInfo />
    </DashboardLayout>
  );
}
