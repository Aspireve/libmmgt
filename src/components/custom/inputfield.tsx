import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "../ui/skeleton";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // ✅ Ensuring type safety
  type: string;
  register: UseFormRegister<T>;
  validation?: object;
  errors: Record<string, any>;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const InputField = <T extends FieldValues>({
  label,
  name,
  type,
  register,
  validation = {},
  errors,
  placeholder,
  readonly = false,
  disabled = false,
  loading = false,
}: InputFieldProps<T>) => {
  return (
    <div className="transition-all duration-200">
      <Label>{label}</Label>
      {loading ? (
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      ) : (
        <Input
          className="text-[#717680]"
          type={type}
          max={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
          {...register(name, validation)} // ✅ Type-safe register
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
};
