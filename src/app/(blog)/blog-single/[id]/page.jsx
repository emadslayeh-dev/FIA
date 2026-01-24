import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import BlogArea4 from "@/components/section/BlogArea4";
import RecentPostArea1 from "@/components/section/RecentPostArea1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Blog Single",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <BlogArea4 />
      <RecentPostArea1 />
      <Footer4 />
    </>
  );
}
