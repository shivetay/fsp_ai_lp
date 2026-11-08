import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Processes } from "@/components/processes";
import { Industries } from "@/components/industries";
import { RoiCalculator } from "@/components/roi-calculator";
import { Process } from "@/components/process";
import { DemoSection } from "@/components/demo-section";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Processes />
        <Industries />
        <RoiCalculator />
        <Process />
        <DemoSection />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
