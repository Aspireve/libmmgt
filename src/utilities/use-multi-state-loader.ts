import { useState } from "react";

export type StepFunction<T> = (data?: T) => Promise<T>;

export const useMultiStepLoader = <T>(steps: StepFunction<T>[]) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startProcessing = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    let stepData: T | undefined = undefined;

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      try {
        stepData = await steps[i](stepData);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred");
        setCurrentStep(0);
        setIsLoading(false);
        return;
      }
    }
    setIsLoading(false);
  };

  return { isLoading, currentStep, errorMessage, startProcessing };
};