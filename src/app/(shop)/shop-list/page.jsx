import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import HeaderInfo1 from "@/components/section/HeaderInfo1";
import ShopArea1 from "@/components/section/ShopArea1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Job List",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <HeaderInfo1
        title='Shop Pages'
        brief='Give your visitor a smooth online experience
                                    with a solid UX design'
      />
      <ShopArea1 />
      <Footer4 />
    </>
  );
}
