"use client";

import MultiStepNavigation from "./components/MultiStepNavigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

interface formFields {
  fullName: string;
  email: string;
  phoneNo: number;
  streetAddress: string;
  city: string;
  zipCode: number;
  userName: string;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const form = useForm<formFields>();
  // const { register, handleSubmit, formState: { errors } } = form;
  const { register, handleSubmit } = form;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const submitForm: SubmitHandler<formFields> = (data) => {
    console.log(data);
  };

  const steps = [
    {
      id: "Step 1",
      name: "Personal Information",
      fields: ["firstName", "lastName", "email"],
    },
    {
      id: "Step 2",
      name: "Address Details",
      fields: ["country", "state", "city", "street", "zip"],
    },
    { id: "Step 3", name: "Account Setup" },
    { id: "Step 4", name: "Summery" },
  ];

  return (
    <>
      <section className="py-24">
        <div className="container">
          <MultiStepNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            submitForm={handleSubmit(submitForm)}
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  {steps[currentStep].name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please fill in the required fields.
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-12">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your full name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("fullName")}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("email")}
                      />
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="PhoneNo"
                        type="number"
                        placeholder="Enter your phone number"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("phoneNo", {
                          valueAsNumber: true,
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  {steps[currentStep].name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please fill in the required fields.
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Street Address */}
                  <div className="sm:col-span-12">
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street Address <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="streetAddress"
                        placeholder="Enter Address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("streetAddress")}
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="city"
                        id="email"
                        placeholder="Enter your City"
                        autoComplete="city"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("city")}
                      />
                    </div>
                  </div>
                  {/* Zip Code */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Zip Code <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="zipCode"
                        type="text"
                        placeholder="Enter your Zip code"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("zipCode", {
                          valueAsNumber: true,
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  {steps[currentStep].name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please fill in the required fields.
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Street Address */}
                  <div className="sm:col-span-12">
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      User Name <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="userName"
                        placeholder="Enter User Name"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("userName")}
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="city"
                        id="password"
                        placeholder="Enter Password"
                        autoComplete="city"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("password")}
                      />
                    </div>
                  </div>
                  {/* Zip Code */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        type="text"
                        placeholder="Confirm Password"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("confirmPassword")}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </MultiStepNavigation>
        </div>
      </section>
    </>
  );
}
