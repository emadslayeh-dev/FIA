import Header7 from "@/components/header/Header7";
import Footer4 from "@/components/footer/Footer4";
import TabSection1 from "@/components/section/TabSection1";
import FreelancerDetails2 from "@/components/section/FreelancerDetails2";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import prisma from "@/lib/prisma";

export const metadata = { title: "פרופיל פרילנסר" };

export default async function Page({ params }) {
  const { id } = params || {};
  let user = null;
  if (id) {
    try {
      user = await prisma.user.findUnique({ where: { id: String(id) }, include: { company: true } });
    } catch (e) {
      console.error("FREELANCER_V2_FETCH_FAILED", e);
    }
  }
  return (
    <>
			<Header7 />
			<TabSection1 />
			 <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      {user ? (
        <FreelancerDetails2 user={user} />
      ) : (
        <div className='container py-5'>
          <div className='alert alert-danger'>הפרופיל לא נמצא.</div>
        </div>
      )}
      <Footer4 />
    </>
  );
}
