import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Images from "@/images";
import { useRouter } from "next/navigation";

const ImportBookButton = () => {
  const router = useRouter();
  return (
    <Button
      className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
      variant="outline"
      onClick={() => router.push("/book-pages/import-book")}
    >
      <Image src={Images.ImportDrop} alt="Import" width={20} height={25} />{" "}
      Import
    </Button>
  );
};

export default ImportBookButton;