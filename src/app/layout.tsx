// app/layout.tsx
import React from "react";
import { RefineContext } from "./_refine_context";
import Sidebar from "./Sidebar/sidebar";
import Navbar from "./Navbar/navbar";
import "../styles/global.css"

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0">
        <RefineContext>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Navbar />
              <div className="flex-1  overflow-y-auto">{children}</div>
            </div>
          </div>
        </RefineContext>
      </body>
    </html>
  );
}
