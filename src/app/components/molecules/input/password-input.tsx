import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

/**
 * `PasswordInput` es un componente de formulario reutilizable que permite mostrar u ocultar
 * el contenido del campo de contraseña. Usa el componente `Input` estilizado y accesible,
 * junto con un botón de alternancia que muestra los íconos `EyeIcon` y `EyeOffIcon` de Lucide.
 *
 * Este componente es útil para formularios de autenticación, restablecimiento de contraseñas
 * u otros flujos sensibles donde se requiere validación visual y accesibilidad.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <PasswordInput />
 * ```
 *
 * @accessibility
 * - Usa `aria-label` y `aria-pressed` para accesibilidad del botón.
 * - El botón tiene `aria-controls` que vincula con el `id` generado del input.
 * - Soporta navegación con teclado y lectores de pantalla.
 */
export default function PasswordInput() {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Show/hide password input</Label>
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          placeholder="Password"
          type={isVisible ? "text" : "password"}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
