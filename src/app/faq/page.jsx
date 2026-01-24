import Footer4 from "@/components/footer/Footer4";
import Header7 from "@/components/header/Header7";
import FaqPayment from "@/components/section/FaqPayment";
import FaqSuggestion from "@/components/section/FaqSuggestion";

export const metadata = {
  title: "FIA - Food Industry Assistance | FAQ",
};

export default function page() {
  return (
    <>
      <Header7 />
      <section className='our-faq pb50'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 m-auto wow fadeInUp' data-wow-delay='300ms'>
              <div className='main-title text-center'>
                <h2 className='title'>Frequently Asked Questions</h2>
                <p className='paragraph mt10'>Give your visitor a smooth online experience with a solid UX design</p>
              </div>
            </div>
          </div>
          <div className='row wow fadeInUp' data-wow-delay='300ms'>
            <div className='col-lg-8 mx-auto'>
              <FaqPayment />
              <FaqSuggestion />
            </div>
          </div>
        </div>
      </section>
      <Footer4 />
    </>
  );
}
