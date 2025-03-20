import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InputFieldProps } from "@/types/student";

export const InputField: React.FC<InputFieldProps> = ({ label, name, type, register, validation = {}, errors, placeholder, readOnly=false }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
};
