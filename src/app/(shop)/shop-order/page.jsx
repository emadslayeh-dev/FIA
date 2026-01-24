import OrderComplete1 from "@/components/element/OrderComplete1";
import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";

export const metadata = {
  title: "FIA - Food Industry Assistance | Shop Order",
};

export default function page() {
  return (
    <>
      <Header7 />
      <OrderComplete1 />
      <Footer4 />
    </>
  );
}
