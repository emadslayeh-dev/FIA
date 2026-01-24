import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import PriceTable1 from "@/components/section/PriceTable1";
import Link from "next/link";

// This page will act as the mock payment page when reached with ?tempId=...

export const metadata = {
  title: "FIA - Food Industry Assistance | Pricing",
};

export default async function page({ searchParams }) {
  const sp = await searchParams;
  const tempId = sp?.tempId || null;

  return (
    <>
      <Header7 />
      <PriceTable1 />
      {tempId ? (
        <div className='container my-4'>
          <div className='card p-4'>
            <h5>Mock תשלום לחבילה בסיסית</h5>
            <p>תשלום מדומה עבור tempId: {tempId}</p>
            <Link href={`/post-registration?tempId=${encodeURIComponent(tempId || "")}`} className='ud-btn btn-thm'>
              בצע תשלום (מדומה)
            </Link>
          </div>
        </div>
      ) : null}
      <Footer4 />
    </>
  );
}
