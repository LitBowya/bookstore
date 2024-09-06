import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HeroCss from "./Herosection.module.css";

const HeroSection = () => {
  return (
    <div className={HeroCss.hero}>
      <Container>
        <div className={HeroCss.heroContainer}>
          <div className={HeroCss.heroContentLeft}>
            <div className={HeroCss.title}>
              <h1>GCTU Bookstore:</h1>
              <h3>Empowering Minds, One Book at a Time</h3>
            </div>
            <div className={HeroCss.subtitle}>
              <p>Your Gateway to Academic Excellence and Personal Growth</p>
            </div>
            <Link to="/shop/all" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" size="large">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className={HeroCss.heroContentRight}>
            <img
              src="/images/HeroSection/memory.jpg"
              alt="Hero"
              className={HeroCss.img1}
            />
            <img
              src="/images/HeroSection/million.webp"
              alt="Hero"
              className={HeroCss.img2}
            />
            <img
              src="/images/HeroSection/modern.webp"
              alt="Hero"
              className={HeroCss.img3}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
