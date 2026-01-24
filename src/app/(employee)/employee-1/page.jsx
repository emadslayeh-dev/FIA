import Breadcumb14 from "@/components/breadcumb/Breadcumb14";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import Listing11 from "@/components/section/Listing11";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Employee 1",
};

export default function page() {
  return (
    <>
      <Header7 />
      <TabSection1 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb14 />
      <Listing11 />
      <Footer4 />
    </>
  );
}
