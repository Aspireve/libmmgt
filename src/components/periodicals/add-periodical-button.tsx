"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AddPeriodicalButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
      onClick={() => router.push("/periodicals-pages/add-periodical")}
    >
      Add Periodical
    </Button>
  );
};

export default AddPeriodicalButton;
