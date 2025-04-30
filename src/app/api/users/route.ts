// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/supabase/supabaseClient';
import { User } from '@/types/users/types';
import { validateUserInput } from '@/validation/users/validations';


// POST: Registrar un usuario
export async function POST(request: Request) {
  try {
    const body: User = await request.json();

    // Validación de datos
    if (!validateUserInput(body as unknown as string, 'create')) {
      return NextResponse.json(
        { error: 'Los datos enviados no son válidos.' },
        { status: 400 }
      );
    }

    // Verificar si el email ya está registrado
    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', body.email)
      .single();

    if (searchError && searchError.code !== 'PGRST116') { // Ignorar error si no se encuentra
      throw new Error(`Error al verificar el email: ${searchError.message}`);
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado.' },
        { status: 400 }
      );
    }

    // Registrar usuario
    const { data, error } = await supabase
      .from('users')
      .insert(body)
      .select();

    if (error) {
      throw new Error(`Error al registrar el usuario: ${error.message}`);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
