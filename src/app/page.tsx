"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

import { useAuthSessionListener } from "@/hooks/useAuthSessionListener";
import { supabase } from "@/supabase/supabaseClient";

import Management from "@/components/Management/Management";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesGrid from "@/components/Features/FeaturesGrid";
import Header from "@/components/Header/Header";

import { BiSend } from "react-icons/bi";
import { Merriweather, Fira_Code } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const firacode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useAuthSessionListener(setUser);

  const handleDashboardRedirect = () => router.push("/tablero");

  const handleScrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de envío de formulario aquí
  };

  return (
    <div className="relative">
      <Header />
      <HeroSection
        user={!!user}
        handleDashboardRedirect={handleDashboardRedirect}
        handleScrollToForm={handleScrollToForm}
      />

      <section className="max-w-7xl mx-auto space-y-4">
        <Management />
        <FeaturesGrid />
      </section>

      <section
        className="max-w-7xl mx-auto mb-20 lg:px-20"
        id="contact-form"
        aria-labelledby="contact-form-title"
      >
        <div className="bg-[#292a2d] rounded-lg border border-zinc-700 p-8">
          <h2
            id="contact-form-title"
            className={`${merriweather.className} text-3xl font-bold text-orange-400 text-center mb-8`}
          >
            ¿Listo para transformar tu organización?
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit} aria-label="Formulario de contacto">
            <input
              type="text"
              name="nombre"
              aria-label="Tu nombre"
              placeholder="Tu Nombre"
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />
            <input
              type="email"
              name="email"
              aria-label="Tu correo electrónico"
              placeholder="Tu Email"
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />
            <textarea
              name="mensaje"
              aria-label="Tu mensaje"
              placeholder="Tu Mensaje"
              rows={4}
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />
            <button
              type="submit"
              className={`${merriweather.className} w-full px-6 py-3 bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md flex items-center justify-center gap-2`}
            >
              <BiSend className="w-4 h-4" />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
