import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb4 from "@/components/breadcumb/Breadcumb4";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import Listing3 from "@/components/section/Listing3";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Service 1",
};

export default function page() {
  return (
    <>
      <Header7 />
      <TabSection1 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb4 />
      <Listing3 />
      <Footer4 />
    </>
  );
}
