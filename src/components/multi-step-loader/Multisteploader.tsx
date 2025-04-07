import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Summary = {
  inserted_data: number;
  duplicate_data_pl: number;
  duplicate_date_db: number;
  invalid_data: number;
  unique_data: number;
};

type MultiStepLoaderProps = {
  loading?: boolean;
  currentStep?: number;
  errorMessage?: string | null;
  close?: () => void;
  summary?: Summary | null;
};

const MultiStepLoader = ({
  loading = false,
  currentStep = 0,
  errorMessage = null,
  summary = null,
  close,
}: MultiStepLoaderProps) => {
  const steps = [
    { label: "Validating Data" },
    { label: "Match Columns to Fields" },
    { label: "Importing Data" },
    { label: "Import Complete!" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] mx-auto relative">
        {/* Close button only when done or error */}
        {(currentStep === steps.length - 1 || errorMessage) && (
          <Button
            variant="ghost"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={close}
          >
            <X className="w-5 h-5" />
          </Button>
        )}

        {/* Step progress */}
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3",
                  isActive ? "opacity-100" : "opacity-70"
                )}
              >
                <CheckCircle
                  className={cn(
                    "w-5 h-5",
                    isCompleted ? "text-blue-500" : "text-gray-300"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCompleted ? "text-blue-600" : "text-gray-400",
                    isActive && "font-semibold text-blue-600"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ✅ Summary block */}
        {currentStep === steps.length - 1 && !errorMessage && summary && (
          <div className="mt-4 text-sm text-gray-700 space-y-1 border-t pt-4">
            <p>
              <span className="text-green-600 font-medium">
                ✔ {summary.inserted_data ?? 0}
              </span>{" "}
              students inserted
            </p>

            <p>
              <span className="text-yellow-600 font-medium">
                ⚠{" "}
                {(summary.duplicate_data_pl ?? 0) +
                  (summary.duplicate_date_db ?? 0)}
              </span>{" "}
              duplicates skipped
            </p>

            <p>
              <span className="text-red-600 font-medium">
                ❌ {summary.invalid_data ?? 0}
              </span>{" "}
              invalid rows
            </p>

            <p>
              <span className="text-blue-600 font-medium">
                📊 {summary.unique_data ?? 0}
              </span>{" "}
              unique records processed
            </p>

            <Button
              onClick={close}
              className="w-full bg-blue-600 text-white mt-3"
            >
              Done
            </Button>
          </div>
        )}

        {/* 🚨 Error block */}
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
