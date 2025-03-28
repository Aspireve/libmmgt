import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  label: string;
  completed: boolean;
};

type MultiStepLoaderProps = {
  loading?: boolean;
  currentStep?: number;
  errorMessage?: string | null;
};

const initialSteps: Step[] = [
  { label: "Validating Data", completed: false },
  { label: "Match Columns to Fields", completed: false },
  { label: "Importing Students", completed: false },
  { label: "Import Complete!", completed: false },
];

const MultiStepLoader = ({ loading = false, currentStep = 0, errorMessage = null }: MultiStepLoaderProps) => {
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    if (!loading) {
      setSteps(initialSteps); // Reset steps when not loading
      return;
    }

    // Update steps based on currentStep
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => ({
        ...step,
        completed: index < currentStep,
      }))
    );
  }, [loading, currentStep]);

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg p-6 w-[350px] mx-auto transition-all duration-300",
        loading ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 transition-opacity duration-500",
              index === currentStep ? "opacity-100" : "opacity-70"
            )}
          >
            <CheckCircle
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                step.completed ? "text-blue-500" : "text-gray-300"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
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
        <div className="mt-6 text-center transition-opacity duration-500 opacity-100">
          <AlertTriangle className="w-6 h-6 text-red-500 mx-auto" />
          <p className="text-red-600 font-semibold mt-2">Error</p>
          <p className="text-sm text-gray-600">
            {errorMessage} <a href="#" className="text-blue-500 underline">Learn more</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiStepLoader;