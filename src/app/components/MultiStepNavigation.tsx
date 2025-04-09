"use client";

import React, { use, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  children: React.ReactNode;
  steps: Array<{
    id: string;
    name: string;
    fields?: string[];
  }>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  submitForm: (data: any) => void;
}

const MultiStepNavigation: React.FC<Props> = ({
  children,
  steps = [],
  currentStep,
  setCurrentStep = () => {},
  submitForm = () => {},
}) => {
  const { handleSubmit } = useForm();
  return (
    <div>
      <form
        className="absolute inset-0 flex flex-col justify-between p-24"
        onSubmit={handleSubmit(submitForm)}
      >
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {steps?.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-sky-600 transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-sky-600">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-12 py-12">{children}</div>
        <div className="mt-12 flex justify-between">
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold cursor-pointer ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep === steps?.length - 1 ? (
            <>
              <button
                className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 cursor-pointer"
                type="submit"
                // onClick={() => window.alert("Form submitted successfully!")}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 cursor-pointer"
                type="button"
                onClick={() =>
                  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
                }
              >
                Next
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepNavigation;
