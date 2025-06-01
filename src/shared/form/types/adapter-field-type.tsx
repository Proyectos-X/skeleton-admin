import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface AdapterFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  name: TName;
  label?: string;
  className?: string;
  rules?: RegisterOptions<TFieldValues, TName>;
}
