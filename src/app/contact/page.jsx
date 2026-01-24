import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import ContactInfo1 from "@/components/section/ContactInfo1";
import GoogleMap1 from "@/components/section/GoogleMap1";
import OurFaq1 from "@/components/section/OurFaq1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Contact",
};

export default function page() {
  return (
    <>
      <Header7 />
      <Breadcumb1 title={"Contact us"} brief={`We'd love to talk about how we can help you.`} isBtnActive={false} />
      <ContactInfo1 />
      <GoogleMap1 />
      <OurFaq1 />
      <Footer4 />
    </>
  );
}
