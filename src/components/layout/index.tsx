"use client";

import type { PropsWithChildren } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
