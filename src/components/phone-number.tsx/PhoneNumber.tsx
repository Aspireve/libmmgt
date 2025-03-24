import React, { ForwardedRef, forwardRef } from 'react';
import PhoneInput, { getCountries } from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

// Define props type for the component
interface PhoneNumberProps {
  name: string;
  readOnly?: boolean;
  setValue: (name: string, value: E164Number | undefined) => void;
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
      className="block w-full px-3 border rounded-md shadow-sm focus:outline-none sm:text-sm text-md py-2"
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
  }
>(({ value, onChange, options, ...rest }, ref) => {
  return (
    <select
      ref={ref}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="block w-32 px-3 border rounded-md shadow-sm focus:outline-none sm:text-sm text-md py-2"
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

const PhoneNumber: React.FC<PhoneNumberProps> = ({ name, readOnly, setValue }) => {
  const [value, setLocalValue] = React.useState<E164Number | undefined>();
  const [selectedCountry, setSelectedCountry] = React.useState<string>('IN');

  const handleCountryChange = (country: string | undefined) => {
    if (country && getCountries().includes(country as any)) {
      setSelectedCountry(country);
    }
  };

  const handleChange = (phoneValue: E164Number | undefined) => {
    setLocalValue(phoneValue);
    setValue(name, phoneValue);
  };

  const countryName = selectedCountry
    ? new Intl.DisplayNames(['en'], { type: 'region' }).of(selectedCountry) || selectedCountry
    : '';

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <PhoneInput
            defaultCountry="IN"
            name={name}
            international
            countryCallingCodeEditable={false}
            readOnly={readOnly}
            value={value}
            onChange={handleChange}
            onCountryChange={handleCountryChange}
            countrySelectComponent={CustomCountrySelect}
            inputComponent={CustomPhoneInput}
            className="w-full flex flex-row gap-2 m-0 p-0 items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneNumber;