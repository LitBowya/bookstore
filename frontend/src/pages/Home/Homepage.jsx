import HeroSection from "./Herosection";
import Map from "../../components/Map/Map";
import AboutUs from "./AboutUs";
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
      <AboutUs />
      <LatestBooksSection />
      <BooksByCategorySection />
      <CountsSection />
      <TestimonialsSection />
      <MeetOurStaff />
      <Map />
      <Footer />
    </div>
  );
};

export default Homepage;
