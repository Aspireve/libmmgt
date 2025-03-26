import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputFieldProps } from "@/types/student";
import { Skeleton } from "../ui/skeleton";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  validation = {},
  errors,
  placeholder,
  readonly=false,
  disabled=false,
  loading = false
}) => {
  return (
    <div>
      <Label>{label}</Label>
      {loading ? (
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      ) : (
        <Input
          className="text-[#717680]"
          type={type}
          max={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
          {...register(name, validation)} // Correct usage
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
};
