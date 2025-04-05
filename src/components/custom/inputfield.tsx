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
  required?: boolean;
  disablePast?:boolean;
  disableFuture?:boolean;
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
  required = true,
  disableFuture= false,
  disablePast= false,
}: InputFieldProps<T>) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="transition-all duration-200">
      <Label className="text-[#808080]">
        {label} {required && <span className="text-red-500"> *</span>}
      </Label>
      {loading ? (
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      ) : (
        <Input
          className="text-[#000000] placeholder:text-[#717680] border-[#D5D7DA] rounded-[8px] relative"
          type={type}
          min={disablePast ? today : undefined} 
          max={disableFuture ? today : undefined}
          {...register(name, validation)} // ✅ Type-safe register
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};
