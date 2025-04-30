import React from "react";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

type HeroSectionProps = {
  user: boolean;
  handleDashboardRedirect: () => void;
  handleScrollToForm: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  handleDashboardRedirect,
  handleScrollToForm,
}) => {
  return (
    <section className="max-w-7xl mx-auto text-white mt-16 lg:py-0 sm:mt-5 flex flex-col md:flex-row items-center justify-between px-4 lg:px-0">
      {/* Contenido del lado izquierdo */}
      <div className="relative md:absolute z-10 flex flex-col text-center md:text-left w-full md:w-3/4 lg:w-1/2 lg:ml-20">
        <p className={`${merriweather.className} text-xl sm:text-2xl text-gray-400`}>Gestión escolar</p>
        <h2 className={`${merriweather.className} my-6 text-4xl sm:text-5xl lg:text-6xl text-zinc-200`}>
          Organízate en minutos {" "}
          <span className=" text-orange-400">
            Crecé sin límites
          </span>
        </h2>
        <p className={`${merriweather.className} text-lg text-gray-400 font-thin italic mb-6 max-w-md mx-auto md:mx-0`}>
          Optimiza las operaciones y mejora la experiencia educativa con nuestra solución completa.
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {user ? (
            <button
              onClick={handleDashboardRedirect}
              className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full transition-colors"
            >
              Administrar instituciones
            </button>
          ) : (
            <button
              onClick={handleScrollToForm}
              className="px-6 py-3 border border-white/20 hover:bg-zinc-600/20 text-white rounded-full transition-colors"
            >
              Contáctanos
            </button>
          )}
          <button className="px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-zinc-400/20 text-white rounded-full transition-colors">
            Más información
          </button>
        </div>
      </div>

      {/* Luz y video en pantallas más grandes */}
      <div className="hidden md:flex relative w-full md:w-full justify-end items-center">
        {/* Luz de fondo */}
        <div className="absolute right-4 bottom-4 lg:right-10 lg:bottom-8 blur-[300px] w-[150px] h-[200px] sm:w-[200px] sm:h-[300px] lg:w-[300px] lg:h-[300px] bg-orange-400 rounded-3xl"></div>

        {/* Card del lado derecho con video */}
        <div className="flex relative w-full md:w-[600px] lg:w-[930px] h-auto sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden">
          <video
            className="relative inset-0 w-full h-full object-cover brightness-80 rounded-3xl max-w-none border-2 border-orange-400/50"
            src="/video-hero/video-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/90 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
