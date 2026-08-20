import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Precios from "@/components/Precios";
import About from "@/components/About";
import Cases from "@/components/Cases";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Agenda from "@/components/Agenda";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Precios />
      <About />
      <Cases />
      <WhyUs />
      <Testimonials />
      <Process />
      <Faq />
      <Agenda />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
