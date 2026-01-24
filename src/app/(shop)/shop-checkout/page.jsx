import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import HeaderInfo1 from "@/components/section/HeaderInfo1";
import ShopCheckoutArea1 from "@/components/section/ShopCheckoutArea1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Shop Checkout",
};

export default function page() {
  return (
    <>
      <Header7 />

      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <HeaderInfo1 title='Shop Checkout' brief='Give your visitor a smooth online experience with a solid UX design' />
      <ShopCheckoutArea1 />
      <Footer4 />
    </>
  );
}
