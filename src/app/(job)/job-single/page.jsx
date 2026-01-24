import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import Header7 from "@/components/header/Header7";

import JobDetail1 from "@/components/section/JobDetail1";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "FIA - Food Industry Assistance | Job Single",
};

export default function page() {
  return (
    <>
      <Header7 />
      <TabSection1 />
      <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}
