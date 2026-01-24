import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import BlogArea1 from "@/components/section/BlogArea1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Blog 1",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb3 />
      <BlogArea1 />
      <Footer4 />
    </>
  );
}
