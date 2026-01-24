import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import ShopSingleArea1 from "@/components/section/ShopSingleArea1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Shop Single",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <ShopSingleArea1 />
      <Footer4 />
    </>
  );
}
