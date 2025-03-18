import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputFieldProps } from "@/types/student";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  validation = {},
  errors,
  placeholder,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        max={
          type === "date" ? new Date().toISOString().split("T")[0] : undefined
        }
        {...register(name, validation)}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};
