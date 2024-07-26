import { MainHeader } from "@/features/Home/MainHeader";
import { About } from "../features/Home/About";
import { HowItWorks } from "@/features/Home/HowItWorks";
import { JoinUs } from "@/features/Home/JoinUs";
import { Footer } from "@/features/Home/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <div>
      <MainHeader />
      <About />
      <HowItWorks />
      <JoinUs />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
