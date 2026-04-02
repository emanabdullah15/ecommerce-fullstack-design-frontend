import HeroSection from "../components/HeroSection";
import Deals from "../components/Deals";
import HomeOutdoor from "../components/HomeOutdoor";
import Consumer from "../components/Consumer";
import Inquiry from "../components/inquiry";
import Recommended from "../components/Recommended";
import Services from "../components/Service";
import Suppliers from "../components/Suppliers";

function Home() {
  return (
    <>
      <HeroSection />
      <Deals />
      <HomeOutdoor />
      <Consumer />
      <Inquiry />
      <Recommended />
      <Services />
      <Suppliers />
    </>
  );
}

export default Home;