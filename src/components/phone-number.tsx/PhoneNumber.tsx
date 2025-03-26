import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import PhoneInput, {
  getCountries,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { StudentData } from "@/types/student";

// Define props type for the component
interface PhoneNumberProps {
  name: keyof StudentData;
  value?: string; // Accept external value
  readOnly?: boolean;
  setValue: (name: keyof StudentData, value: string | undefined) => void;
  error: any;
}

// Define props type for the custom input
interface CustomInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

// Custom input with proper typing for ref
const CustomPhoneInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => (
    <input
      {...props}
      ref={ref}
      className="block w-full px-3 border rounded-md border-input focus:outline-none sm:text-sm text-md py-2"
    />
  )
);

// Custom Country Select Component without flags
const CustomCountrySelect = forwardRef<
  HTMLSelectElement,
  {
    name?: string;
    value?: string;
    onChange: (value: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    readOnly?: boolean;
    options: { value: string; label: string }[];
    iconComponent?: React.ReactNode; // Ignore this prop to prevent the error
  }
>(({ value, onChange, options, iconComponent, ...rest }, ref) => {
  return (
    <select
      ref={ref}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="block w-16 px-3 border-transparent focus:outline-none sm:text-sm text-md py-2 rounded-md "
      {...rest} // Spreading remaining props
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

const PhoneNumber: React.FC<PhoneNumberProps> = ({
  name,
  value,
  readOnly,
  setValue,
  error,
}) => {
  const [phoneValue, setPhoneValue] = useState<E164Number | undefined>(
    value as E164Number
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");

  // Sync external value changes
  useEffect(() => {
    setPhoneValue(value as E164Number);
  }, [value]);

  const handleCountryChange = (country: string | undefined) => {
    if (country && getCountries().includes(country as any)) {
      setSelectedCountry(country);
    }
  };

  const handleChange = (phoneValue: E164Number | undefined) => {
    setPhoneValue(phoneValue);
    setValue(name, phoneValue ? String(phoneValue) : ""); // Convert E164Number to string
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <PhoneInput
          defaultCountry="IN"
          name={name}
          international
          countryCallingCodeEditable={false}
          readOnly={readOnly}
          value={phoneValue}
          onChange={handleChange}
          onCountryChange={handleCountryChange}
          countrySelectComponent={CustomCountrySelect}
          inputComponent={CustomPhoneInput}
          // error
          // error={phoneValue ? (isValidPhoneNumber(phoneValue) ? undefined : 'Invalid phone number') : 'Phone number required'}
          className="w-full flex flex-row gap-2 m-0 p-0 items-center"
        />

      </div>
        {error?.[name] && (
          <p className="text-red-500 text-sm">{error[name]?.message}</p>
        )}
    </div>
  );
};

export default PhoneNumber;
