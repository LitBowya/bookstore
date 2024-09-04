import HeroSection from "./Herosection";
import LatestBooksSection from "./LatestBooksSection";
import BooksByCategorySection from "./BooksByCategorySection";
import CountsSection from "./CountSection";
import TestimonialsSection from "./TestimonialSection";
import MeetOurStaff from "./MeetOurStaff";
import Footer from "../../components/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <LatestBooksSection />
      <BooksByCategorySection />
      <CountsSection />
      <TestimonialsSection />
      <MeetOurStaff />
      <Footer />
    </div>
  );
};

export default Homepage;
