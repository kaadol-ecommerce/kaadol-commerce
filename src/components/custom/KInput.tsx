import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";

interface KInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  name: string;
  control: any;
}

const Kinput = forwardRef(({
  label,
  id,
  type = "text",
  placeholder,
  error,
  name,
  control,
}: KInputProps, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-1">
          <Label htmlFor={id}>{label}</Label>
          {error && (
            <div
              className="text-sm font-medium text-destructive"
              id={`${id}-error`}
              aria-live="polite"
            >
              {error}
            </div>
          )}
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={error ? "true" : undefined}
            {...field}
          />
        </div>
      )}
    ></Controller>
  );
})

export default Kinput;