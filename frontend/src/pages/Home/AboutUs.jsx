import { Container } from "@mui/material";
import AboutUsCss from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div>
      <Container className={AboutUsCss.container}>
        <div className={AboutUsCss.aboutUsImage}>
          <img src="/images/HeroSection/bookstore.webp" alt="about us" />
          <img
            className={AboutUsCss.img}
            src="/images/gctu-logo.png"
            alt="about us"
          />
        </div>

        <div className={AboutUsCss.aboutUsText}>
          <h4>About Us</h4>
          <p>
            <span className="fw-bold">Welcome to the GCTU Bookstore</span>, your
            dedicated source for academic and personal development resources. We
            are proud to serve the vibrant GCTU community by offering a
            carefully curated selection of textbooks, reference materials, and
            enriching reads that foster intellectual growth and academic
            success.
            <br />
            <span className="fw-bold">Our mission is simple</span>: to provide
            every student and faculty member with access to essential learning
            materials, alongside a diverse range of books for personal
            exploration and inspiration. Whether you are preparing for your next
            exam, conducting research, or seeking out a captivating novel, the
            GCTU Bookstore is here to support your journey. We believe that
            knowledge is power, and through the resources we offer, we strive to
            empower the GCTU community to reach its full potential. At GCTU
            Bookstore, we’re more than just a bookstore – we’re partners in your
            academic and personal success.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
