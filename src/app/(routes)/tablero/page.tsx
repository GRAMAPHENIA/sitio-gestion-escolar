// src/app/dashboard/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { GoOrganization, GoRepo } from "react-icons/go";

import {
  PiCalendarDots,
  PiCertificate,
  PiChair,
  PiChalkboardTeacher,
  PiChartBar,
  PiHouseLine,
} from "react-icons/pi";
import MainContent from "@/components/Dashboard/MainContent";
import PanelContent from "@/components/Dashboard/PanelContent";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

import AvatarMenu from "./customs/AvatarMenu";
import { Tooltip } from "react-tooltip";
import Image from "next/image";

const Dashboard = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isSecondAsideOpen, setIsSecondAsideOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("institucion");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const menuItems = [
    { name: "Institución", route: "institucion", icon: <GoOrganization /> },
    { name: "Cursos", route: "cursos", icon: <GoRepo /> },
    { name: "Clases", route: "clases", icon: <PiChalkboardTeacher /> },
    { name: "Estudiantes", route: "estudiantes", icon: <PiChair /> },
    { name: "Evaluaciones", route: "evaluaciones", icon: <PiChartBar /> },
    { name: "Notas", route: "notas", icon: <PiCertificate /> },
    { name: "Calendario", route: "calendario", icon: <PiCalendarDots /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsAsideOpen(isDesktop);
    };

    handleResize();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      } else {
        router.push("/inicio-de-sesion");
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/inicio-de-sesion");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="text-zinc-200 bg-zinc-950 h-screen flex justify-center items-center">
        Cargando...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">
        <div className="w-full pl-20 pr-4 py-2 flex justify-end items-center">
          <AvatarMenu user={user} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <aside
            className={`bg-[#1d1e20] transition-all duration-100 ease-in-out z-30 absolute lg:relative flex flex-col justify-start overflow-hidden ${
              isAsideOpen ? "w-56" : "w-[53px]"
            }`}
            onMouseEnter={() => setIsAsideOpen(true)}
            onMouseLeave={() => setIsAsideOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              zIndex: 30,
              transition: "width 0.125s ease-in-out",
            }}
          >
            <div className="flex items-center justify-start m-[6px]">
              <Image
                src={"/logo/view-kanbab.svg"}
                alt=""
                width={40}
                height={40}
                className=" w-10 h-10 opacity-90 transition-all duration-200"
              />
            </div>

            <div>
              <div
                onClick={() => router.push("/")}
                className="flex items-center px-2 py-2 mx-2 my-2 cursor-pointer rounded-md text-zinc-400/75 hover:text-zinc-300 hover:bg-zinc-300/5 transition-all duration-200 "
              >
                <span className="text-xl flex-shrink-0">
                  <PiHouseLine className="w-5 h-5" />
                </span>
                <span
                  className={`text-sm whitespace-nowrap transition-all duration-200 ease-in-out absolute ${
                    isAsideOpen ? "opacity-100 ml-8 relative" : "opacity-0 w-0"
                  }`}
                >
                  Volver
                </span>
              </div>
              <div className="border-b-2 border-dashed border-zinc-700 mt-2 mx-2"></div>
            </div>

            <div className="flex flex-col space-y-4 p-2">
              {menuItems.map((item) => (
                <div
                  key={item.route}
                  onClick={() => setSelectedSection(item.route)}
                  className={`flex items-center px-2 py-2 rounded-[3px] transition-all cursor-pointer hover:bg-zinc-700/50 ${
                    selectedSection === item.route
                      ? "bg-neutral-600/40 hover:bg-neutral-500/20 text-zinc-300"
                      : "text-zinc-400/75 hover:text-zinc-300 hover:bg-zinc-300/5"
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span
                    className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out absolute ${
                      isAsideOpen ? "opacity-100 ml-8 relative" : "opacity-0 w-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-b-2 border-dashed border-zinc-700 mx-2"></div>
          </aside>

          <aside
            className={`transition-all duration-200 bg-[#1d1e20] ml-10 ${
              isSecondAsideOpen ? "w-1/5" : "w-0"
            }`}
          >
            <div className="relative flex items-center justify-start mt-3">
              <div className="group relative pl-8">
                <button
                  data-tooltip-id="panel-tooltip"
                  className="flex justify-center items-center rounded text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 h-8 w-8 "
                  onClick={() => setIsSecondAsideOpen((prev) => !prev)}
                >
                  {isSecondAsideOpen ? (
                    <LuPanelLeftClose className="h-6 w-6" />
                  ) : (
                    <LuPanelRightClose className="h-6 w-6" />
                  )}
                </button>

                <Tooltip
                  id="panel-tooltip"
                  border="1px solid #434343"
                  place="right-end"
                  content={isSecondAsideOpen ? "Cerrar panel" : "Abrir panel"}
                  className="custom-tooltip z-50"
                />
              </div>
            </div>

            {isSecondAsideOpen && (
              <div className="p-4">
                <PanelContent selectedSection={selectedSection} />
              </div>
            )}
          </aside>

          <main className="flex-1 bg-[#1d1e20] px-20 pt-4 overflow-y-auto max-h-screen">
            <MainContent selectedSection={selectedSection} />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
