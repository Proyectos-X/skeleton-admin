import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "El email es requerido" }).email({ message: "Debe ser un email válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
