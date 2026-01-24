import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MyFreelancerInfo from "@/components/dashboard/section/MyFreelancerInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = { title: "FIA - הפרופיל שלי" };

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <MyFreelancerInfo />
      </DashboardLayout>
    </>
  );
}
