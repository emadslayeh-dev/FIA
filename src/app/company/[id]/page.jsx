import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";
import CompanyDetail1 from "@/components/section/CompanyDetail1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import BreadcumbCompany from "@/components/breadcumb/BreadcumbCompany";
import TabSection1 from "@/components/section/TabSection1";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "FIA - Company Profile",
};

export default async function Page({ params }) {
  const { id } = params;
  const company = await prisma.company.findUnique({
    where: { id: String(id) },
    include: { users: true },
  });
  if (!company) {
    return (
      <>
        <Header7 />
        <div className='container py100'>לא נמצאה חברה</div>
        <Footer4 />
      </>
    );
  }
  return (
    <>
      <Header7 />
      <TabSection1 />
      <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      <BreadcumbCompany company={company} />
      <CompanyDetail1 company={company} />
      <Footer4 />
    </>
  );
}
