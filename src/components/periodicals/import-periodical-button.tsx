import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Images from "@/images";
import { useRouter } from "next/navigation";

const ImportPeriodicalButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
      onClick={() => router.push("/periodicals-pages/import-periodicals")}
    >
      <Image src={Images.ImportDrop} alt="Import" width={20} height={25} />{" "}
      Import
    </Button>
  );
};

export default ImportPeriodicalButton;
