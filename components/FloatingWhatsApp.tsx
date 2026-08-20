import { MessageCircle } from "lucide-react";
import { SITE } from "@/content";

export default function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda por WhatsApp"
      className="floating-safe fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-gold transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-5"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
