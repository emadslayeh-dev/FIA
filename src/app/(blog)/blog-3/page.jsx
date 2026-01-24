import Breadcumb2 from "@/components/breadcumb/Breadcumb2";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import BlogArea3 from "@/components/section/BlogArea3";

export const metadata = {
  title: "FIA - Food Industry Assistance | Blog 3",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb2 title='Freeio Blog' brief='Give your visitor a smooth online experience with a solid UX design' />
      <BlogArea3 />
      <Footer4 />
    </>
  );
}
