import { Button } from "@/components/ui/button";
import Image from "next/image";

const PaginationButton = ({
  onClick,
  disabled,
  text,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  text: string;
  icon: string;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="transition-all duration-200 disabled:opacity-50 border-2 border-[#D5D7DA] shadow-none rounded-xl text-[#414651] flex items-center gap-2"
  >
    <Image src={icon} alt="Icon" />
    {text}
  </Button>
);

export default PaginationButton;
