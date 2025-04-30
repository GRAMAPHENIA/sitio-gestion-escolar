import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    if (!email.includes("@") || password.length < 6) {
      return NextResponse.json(
        { error: "Email o contraseña inválidos" },
        { status: 400 }
      );
    }

    // Registrar en sistema de autenticación
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes("user already registered")) {
        return NextResponse.json(
          { error: "El correo electrónico ya está registrado" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "No se pudo registrar el usuario" },
        { status: 500 }
      );
    }

    const userId = authData.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "No se pudo obtener el ID del usuario" },
        { status: 500 }
      );
    }

    // Guardar usuario en tabla "users"
    const { error: dbError } = await supabase.from("users").insert([
      {
        auth_id: userId,
        email,
      },
    ]);

    if (dbError) {
      console.error("Error al insertar en la base de datos:", dbError);
      return NextResponse.json(
        { error: "Error al guardar los datos del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Usuario registrado exitosamente", userId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
