// app/layout.tsx

"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { RefineContext } from "./_refine_context";
import Sidebar from "./Sidebar/sidebar";
import Navbar from "./Navbar/navbar";
import "../styles/global.css";
import { Toaster } from "sonner";
// import LoginPage from "./LoginPage/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0">
        <Provider store={store}>
          <RefineContext>
            <div className="flex flex-col md:flex-row h-screen">
              <div className="md:w-56 lg:w-64 shrink-0 md:block hidden">
                <Sidebar />
              </div>
              <div className="flex-1 flex flex-col w-full">
                <Navbar />
                <main className="flex-1 overflow-y-auto  ">
                  {children}
                </main>
                <Toaster />
              </div>
            </div>
          </RefineContext>
          {/* <LoginPage/> */}
        </Provider>
      </body>
    </html>
  );
}
