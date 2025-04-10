"use client";

import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor, RootState } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { RefineContext } from "./_refine_context";
import Sidebar from "@/components/custom/sidebar";
import Navbar from "@/components/custom/navbar";
import "../styles/global.css";
import { Toaster } from "@/components/ui/sonner";
import DarkModeWrapper from "@/components/custom/DarkModeWrapper";
import { usePathname, useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const authPages = ["/LoginPage"];
  const isAuthPage = authPages.includes(pathname);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token && !isAuthPage) {
  //     router.push("/LoginPage");
  //   }
  // }, [pathname]);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={<> loading...</>}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RefineContext>
                {/* Move dark mode handling to a wrapper component */}
                <TooltipProvider>
                  <DarkModeWrapper>
                    {isAuthPage ? (
                      <div>{children}</div>
                    ) : (
                      <div className="flex h-screen overflow-hidden">
                        <Sidebar />
                        <div className="flex flex-1 flex-col h-full">
                          <Navbar />
                          <div className="flex-1 overflow-y-auto h-0 scrollbar-none">
                            {children}
                          </div>
                        </div>
                      </div>
                    )}
                  </DarkModeWrapper>
                </TooltipProvider>
              </RefineContext>
            </PersistGate>
          </Provider>
        </Suspense>
        <Toaster theme="light" richColors position="top-center" />
      </body>
    </html>
  );
}
