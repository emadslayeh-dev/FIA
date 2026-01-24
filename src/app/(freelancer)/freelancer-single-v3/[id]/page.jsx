import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

import FreelancerDetail3 from "@/components/section/FreelancerDetails3";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Freelancer Single",
};

export default function page() {
  return (
    <>
      <Header7 />
      <TabSection1 />
      <div className='bgc-thm3'>
        <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />

        <FreelancerDetail3 />
      </div>
      <Footer4 />
    </>
  );
}
