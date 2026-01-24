import AboutArea1 from "@/components/section/AboutArea1";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import OurFaq1 from "@/components/section/OurFaq1";
import OurFeature1 from "@/components/section/OurFeature1";
import OurTeam1 from "@/components/section/OurTeam1";
import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";

export const metadata = {
  title: "FIA - Food Industry Assistance | Become seller",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb1
        title={"Work Your Way"}
        brief={` Give your visitor a smooth online
                                        experience with a solid UX design.`}
        isBtnActive={true}
      />
      <AboutArea1 />
      <OurFeature1 />
      <CtaBanner1 />
      <CounterInfo1 />
      <OurTeam1 />
      <OurFaq1 />
      <Footer4 />
    </>
  );
}
