"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword } from "./action";
import { TbLoader2 } from "react-icons/tb";

const formSchema = z.object({
  email: z.string().email(),
});

// Componente principal envuelto en Suspense
export default function ForgotPasswordPage() {
  return (
    // TODO: Reemplazar con un componente de carga dinámico.
    <Suspense fallback={<div>Cargando...</div>}>
      <ForgotPassword />
    </Suspense>
  );
}

// Componente que usa useSearchParams
function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: decodeURIComponent(searchParams.get("email") ?? ""),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await forgotPassword({
        email: data.email,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        router.push("/forgot-password/confirmation");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="w-[380px]">
        <header>
          <title>Password Reset</title>
          <p>Introduce tu correo electrónico para restablecer tu contraseña Correo electrónico</p>
        </header>
        <article>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <label>Email</label>
            <input type="email" className="input" {...form.register("email")} />
            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Forget password"
              )}
            </button>
          </form>
        </article>
        <footer className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            Remember your password?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Dont have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
