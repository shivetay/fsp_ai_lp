import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { CaseStudies } from "@/components/case-studies";
import { DemoSection } from "@/components/demo-section";
import { Stack } from "@/components/stack";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <CaseStudies />
        <DemoSection />
        <Stack />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
