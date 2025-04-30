// src/hooks/useAuthSessionListener.ts
"use client";

import { useEffect } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

type SetUser = (user: User | null) => void;

export function useAuthSessionListener(setUser: SetUser) {
  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUser]);
}
