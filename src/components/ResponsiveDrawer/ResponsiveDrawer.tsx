"use client";

import { ReactNode } from "react";

type ResponsiveDrawerProps = {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
};

const ResponsiveDrawer = ({
  isOpen,
  toggle,
  children,
}: ResponsiveDrawerProps) => {
  return (
    <>
      {/* Botón hamburguesa visible solo en mobile */}
      <div className="lg:hidden fixed top-2 left-2 z-40">
        <button
          onClick={toggle}
          className="text-zinc-300 bg-zinc-800 p-2 rounded-md shadow-md"
        >
          ☰
        </button>
      </div>

      {/* Menú lateral */}
      <aside
        className={`
          bg-[#1d1e20] text-white fixed top-0 left-0 h-full z-30 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-56 lg:relative lg:translate-x-0 lg:flex
        `}
      >
        {children}
      </aside>

      {/* Fondo oscurecido solo en mobile al abrir */}
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default ResponsiveDrawer;
