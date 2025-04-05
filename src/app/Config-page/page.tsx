"use client";

import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { CustomBreadcrumb } from "@/components/breadcrumb";

const configurations = [
  {
    title: "Institute Configuration",
    description: "Customize & Optimize Your Campus Operations",
    path: "/Config-page/Institute-Config",
  },
  {
    title: "Library Configuration",
    description: "Streamline Your Institution’s Knowledge Hub",
    path: "/Config-page/Library-Config",
  },
];

const Page = () => {
  const router = useRouter();



  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-6">
      <Header heading="Configuration" subheading="Tanvir Chavan" />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-5 w-fit">
        {configurations.map((config, index) => (
          <Card
            key={index}
            className="p-6 border border-gray-300 rounded-lg shadow-sm w-[500px] ml-5"
          >
            <CardContent className="space-y-2 text-left">
              <h3 className="text-lg font-semibold">{config.title}</h3>
              <p className="text-gray-500">{config.description}</p>
              <div className="mt-12">
                <Button
                  onClick={() => handleClick(config.path)}
                  className="flex items-center gap-2 bg-[#1E40AF] text-white rounded-md px-4 py-2 hover:bg-blue-900"
                >
                  Primary <ArrowUpRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
