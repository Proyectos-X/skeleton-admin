import { useId, useRef, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import clsx from "clsx";
import { CircleXIcon } from "lucide-react";
import { FormFieldAdapter } from "../../../form/adapters/form-field-adapter";
import type { AdapterFieldProps } from "../../../form/types/adapter-field-type";

interface AdvancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  showCharCount?: boolean;
  maxLength?: number;
  clearable?: boolean;
}


export function AdvancedInput({
  label,
  iconStart,
  iconEnd,
  prefix,
  suffix,
  showCharCount,
  maxLength,
  clearable = false,
  className,
  value: controlledValue,
  onChange,
  ...rest
}: AdvancedInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const value = controlledValue ?? uncontrolledValue;
  const characterCount = typeof value === "string" ? value.length : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!controlledValue) setUncontrolledValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  const hasIconStart = !!iconStart;
  const hasIconEnd = !!iconEnd || clearable;

  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {prefix && (
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-sm">
            {prefix}
          </span>
        )}

        {iconStart && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            {iconStart}
          </div>
        )}

        <Input
          id={id}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={clsx(
            className,
            {
              "ps-9": hasIconStart || prefix,
              "pe-9": hasIconEnd || suffix || showCharCount,
              "ps-16": prefix,
              "pe-12": suffix,
            }
          )}
          aria-describedby={showCharCount ? `${id}-description` : undefined}
          {...rest}
        />

        {suffix && (
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-sm">
            {suffix}
          </span>
        )}

        {iconEnd && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            {iconEnd}
          </div>
        )}

        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex w-9 items-center justify-center rounded-e-md transition outline-none focus:z-10 focus-visible:ring-[3px]"
          >
            <CircleXIcon size={16} aria-hidden="true" />
          </button>
        )}

        {showCharCount && typeof value === "string" && (
          <div
            id={`${id}-description`}
            className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-xs tabular-nums"
            aria-live="polite"
            role="status"
          >
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}

type AdvancedInputFieldProps = AdapterFieldProps & Omit<AdvancedInputProps, "value" | "onChange" | "onBlur" | "name"> 

export function AdvancedInputField({
  name,
  rules,
  label,
  className,
  ...inputProps
}: AdvancedInputFieldProps) {
  return (
    <FormFieldAdapter
      name={name}
      label={label}
      rules={rules}
      className={className}
    >
      {({ value, onChange, onBlur, name, error }) => (
        <AdvancedInput
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange((e?.target?.value ?? e))}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...inputProps}
        />
      )}
    </FormFieldAdapter>
  );
}