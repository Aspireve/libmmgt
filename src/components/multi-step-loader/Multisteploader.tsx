import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type MultiStepLoaderProps = {
  loading?: boolean;
  currentStep?: number;
  errorMessage?: string | null;
  close?: () => void;
};

const MultiStepLoader = ({
  loading = false,
  currentStep = 0,
  errorMessage = null,
  close,
}: MultiStepLoaderProps) => {
  const [steps, setSteps] = useState([
    { label: "Validating Data", completed: false },
    { label: "Match Columns to Fields", completed: false },
    { label: "Importing Students", completed: false },
    { label: "Import Complete!", completed: false },
  ]);

  useEffect(() => {
    if (!loading) {
      setSteps([
        { label: "Validating Data", completed: false },
        { label: "Match Columns to Fields", completed: false },
        { label: "Importing Students", completed: false },
        { label: "Import Complete!", completed: false },
      ]);
      return;
    }
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        completed: index < currentStep,
      }))
    );
  }, [loading, currentStep]);

  return (
    <div
      // className={cn(
      //   "fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50",
      //   loading
      //     ? "opacity-100 scale-100 pointer-events-auto"
      //     : "scale-95 pointer-events-none"
      // )}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] mx-auto relative">
        <Button
          variant="ghost"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={close}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3",
                index === currentStep ? "opacity-100" : "opacity-70"
              )}
            >
              <CheckCircle
                className={cn(
                  "w-5 h-5",
                  step.completed ? "text-blue-500" : "text-gray-300"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  step.completed ? "text-blue-600" : "text-gray-400",
                  index === currentStep && "font-semibold text-blue-600"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        {errorMessage && (
          <div className="mt-6 text-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
            <p className="text-red-600 font-semibold mt-2">Error</p>
            <p className="text-sm text-gray-600">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepLoader;
