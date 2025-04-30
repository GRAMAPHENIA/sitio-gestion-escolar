import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { LuCircleUserRound } from "react-icons/lu";
import { BiMenu } from "react-icons/bi"; // Ícono de menú de hamburguesa

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el modal en móvil
  const router = useRouter();

  const handleLoginRedirect = () => router.push("/inicio-de-sesion");
  const handleRegisterRedirect = () => router.push("/registro");
  const handleDashboardRedirect = () => router.push("/tablero");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error al cerrar sesión");
    setUser(null);
  };

  return (
    <div>
      <header className="max-w-7xl mx-auto p-4">
        <nav className="flex items-center justify-between">
          <div className="font-bold text-zinc-400">
            <Image
              src={"/logo/view-kanbab.svg"}
              alt="Logo estilo SVG de la aplicación"
              width={70}
              height={70}
              className="opacity-90 w-1/2 sm:w-2/5 md:w-16 md:h-16" // Ajuste del tamaño según pantalla
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Menú de hamburguesa para dispositivos móviles */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-400"
              >
                <BiMenu className="w-6 h-6" />
              </button>
            </div>

            {/* Modal para dispositivos móviles */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex justify-center items-center">
                <div className="shadow-xl w-3/4 sm:w-96 p-6">
                  <div className="flex flex-col items-center gap-4">
                    {!user ? (
                      <>
                        <button
                          onClick={handleLoginRedirect}
                          className="w-full text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
                        >
                          Ingresar
                        </button>
                        <button
                          onClick={handleRegisterRedirect}
                          className="w-full text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
                        >
                          Registrarse
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <button
                          onClick={handleDashboardRedirect}
                          className="w-full py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-zinc-200 hover:text-orange-300 border border-zinc-700/50 rounded-full p-2 transition duration-100 bg-neutral-700/50"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Menú para escritorio */}
            <div className={`hidden md:flex items-center gap-4 ${isMobileMenuOpen ? "block" : "hidden"}`}>
              {user ? (
                <div className="relative z-50">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex px-4 py-2 bg-zinc-500/10 text-white rounded-lg hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
                  >
                    <LuCircleUserRound className="w-5 h-5 text-zinc-400" />
                    <BiChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ml-2 ${isMenuOpen ? "-rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-xl border border-zinc-700 overflow-hidden">
                      <button
                        onClick={handleDashboardRedirect}
                        className="w-full px-4 py-2 text-left text-zinc-200 hover:bg-zinc-700 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-700 transition-colors"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLoginRedirect}
                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={handleRegisterRedirect}
                    className="px-4 py-2 bg-zinc-500/10 text-white rounded-full hover:bg-zinc-400/10 transition-colors border border-zinc-700/50"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
