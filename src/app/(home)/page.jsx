import Footer4 from "@/components/footer/Footer4";
import Hero1 from "@/components/hero/Hero1";
import BrowserCategory6 from "@/components/section/BrowserCategory6";
import CtaBanner6 from "@/components/section/CtaBanner6";
import HighestRated2 from "@/components/section/HighestRated2";
import LatestProjects1 from "@/components/section/LatestProjects1";
import OurBlog1 from "@/components/section/OurBlog1";
import OurCta3 from "@/components/section/OurCta3";
import OurFunFact3 from "@/components/section/OurFunFact2";
import OurPartner1 from "@/components/section/OurPartner1";
import PopularService4 from "@/components/section/PopularService4";
import Header7 from '@/components/header/Header7';
import Testimonial1 from '@/components/section/Testimonial1';


export const metadata = {
  title: "FIA - Food Industry Assistance",
};

export default function page() {
  return (
    <>
      <div className='wrapper ovh'>
        <Header7 />
        <Hero1 />
        <PopularService4 />
        <BrowserCategory6 />
        <CtaBanner6 />
        <OurPartner1 />
        <HighestRated2 />
        <OurFunFact3 />
        <LatestProjects1 />
        <OurBlog1 />
        <Testimonial1 />

        {/* <OurCta3 /> */}
        <Footer4 />
      </div>
    </>
  );
}
