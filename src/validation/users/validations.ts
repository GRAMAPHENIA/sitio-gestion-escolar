// src/validation/users/validations.ts

export function validateEmail(email: string): boolean {
    // Verifica que el email contenga un "@"
    return typeof email === 'string' && email.includes("@");
  }
  
  export function validatePassword(password: string): boolean {
    // Verifica que la contraseña tenga al menos 6 caracteres
    return typeof password === 'string' && password.length >= 6;
  }
  
  export function validateUserInput(email: string, password: string): string | null {
    if (!email || !password) {
      return "Todos los campos son obligatorios";
    }
  
    if (!validateEmail(email) || !validatePassword(password)) {
      return "Email o contraseña inválidos";
    }
  
    return null; // No hay errores de validación
  }
  