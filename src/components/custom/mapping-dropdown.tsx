interface MappingDropdownProps<T extends Record<string, any>> {
  label: string;
  isRequired?: boolean;
  importData: { headers: string[] };
  mapping: Partial<T>;
  fieldKey: keyof T;
  setMapping: (update: (prev: Partial<T>) => Partial<T>) => void;
  className?: string;
}

const MappingDropdown = <T extends Record<string, any>>({
  label,
  isRequired,
  importData,
  mapping,
  fieldKey,
  setMapping,
}: MappingDropdownProps<T>) => {

  const handleMappingChange = (value: string) => {
    setMapping((prev) => ({ ...prev, [fieldKey]: value }));
  };
  
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 text-black-600 font-bold">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <select
        className="border border-gray-300 rounded p-2"
        value={mapping[fieldKey] || ""}
        required={isRequired}
        onChange={(e) => handleMappingChange(e.target.value)}
      >
        <option value="">Select Column</option>
        {importData.headers.map((header: any, index: any) => (
          <option key={index} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MappingDropdown;
