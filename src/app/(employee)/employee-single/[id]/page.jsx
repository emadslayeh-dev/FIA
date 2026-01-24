import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb15 from "@/components/breadcumb/Breadcumb15";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import EmplyeeDetail1 from "@/components/section/EmplyeeDetail1";
import JobInvision1 from "@/components/section/JobInvision1";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Emplyee Single",
};

export default function page() {
  return (
    <>
      <Header7 />
      <TabSection1 />
      <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb15 />
      <EmplyeeDetail1 />
      <JobInvision1 />
      <Footer4 />
    </>
  );
}
