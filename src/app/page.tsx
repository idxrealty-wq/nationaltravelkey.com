import NavBar from "../components/home/NavBar";
import HeroSection from "../components/home/HeroSection";
import StatsBar from "../components/home/StatsBar";
import CountyGrid from "../components/home/CountyGrid";
import AvailableNow from "../components/home/AvailableNow";
import HowItWorks from "../components/home/HowItWorks";
import SiteFooter from "../components/home/SiteFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#08152b] text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <NavBar />
      <HeroSection />
      <StatsBar />
      <CountyGrid />
      <AvailableNow />
      <HowItWorks />
      <SiteFooter />
    </main>
  );
}
