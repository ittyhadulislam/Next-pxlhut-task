"use client";

import MultiStepNavigation from "./components/MultiStepNavigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setShowDetails } from "@/lib/features/showData/showDataSlice";

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["fullName", "email", "phoneNo"],
  },
  {
    id: "Step 2",
    name: "Address Details",
    fields: ["streetAddress", "city", "zipCode"],
  },
  {
    id: "Step 3",
    name: "Account Setup",
    fields: ["userName", "password", "confirmPassword"],
  },
  { id: "Step 4", name: "Summery", fields: [] },
];

type Inputs = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // const { register, handleSubmit, formState: { errors } } = form;
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const submitForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(setShowDetails({ key: "getData", value: data }));
    router.push("/showData");
  };

  // console.log("router", router)

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (output) {
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    setPreviousStep(currentStep);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <section className="py-24">
        <div className="container">
          <MultiStepNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            submitForm={handleSubmit(submitForm as SubmitHandler<Inputs>)}
            next={next}
            prev={prev}
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
                        {...register("fullName", { required: true })}
                      />
                      {errors.fullName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.fullName.message}
                        </p>
                      )}
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
                        {...register("email", { required: true })}
                      />
                      {errors.email?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
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
                        id="phoneNo"
                        type="text"
                        placeholder="Enter your phone number"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("phoneNo", {
                          required: true,
                        })}
                      />
                      {errors.phoneNo?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.phoneNo.message}
                        </p>
                      )}
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
                        {...register("streetAddress", { required: true })}
                      />
                      {errors.streetAddress?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.streetAddress.message}
                        </p>
                      )}
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
                        type="text"
                        id="city"
                        placeholder="Enter your City"
                        autoComplete="city"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("city", { required: true })}
                      />
                      {errors.city?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.city.message}
                        </p>
                      )}
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
                        type="number"
                        placeholder="Enter your Zip code"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("zipCode", {
                          valueAsNumber: true,
                          required: true,
                        })}
                      />
                      {errors.zipCode?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.zipCode.message}
                        </p>
                      )}
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
                  {/* User Name */}
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
                        {...register("userName", { required: true })}
                      />
                      {errors.userName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        autoComplete="city"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("password", { required: true })}
                      />
                      {errors.password?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Confirm Pass */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password <span className="text-red-600"> *</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        {...register("confirmPassword", { required: true })}
                      />
                      {errors.confirmPassword?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-12">
                    <h2 className=" mb-5 text-2xl font-bold text-gray-900">
                      {steps[currentStep].name}
                    </h2>
                    <p className="mb-5">
                      Full Name: {form.getValues("fullName")}
                    </p>
                    <p className="mb-5">Email: {form.getValues("email")}</p>
                    <p className="mb-5">
                      Phone Number:{" "}
                      {form.getValues("phoneNo")
                        ? form.getValues("phoneNo")
                        : ""}
                    </p>
                    <p className="mb-5">
                      Street Address: {form.getValues("streetAddress")}
                    </p>
                    <p className="mb-5">City: {form.getValues("city")}</p>
                    <p className="mb-5">
                      Zip Code:{" "}
                      {form.getValues("zipCode")
                        ? form.getValues("zipCode")
                        : ""}
                    </p>
                    <p className="mb-5">
                      User Name: {form.getValues("userName")}
                    </p>
                    <p className="mb-5">
                      Password:{" "}
                      {"*".repeat(form.getValues("password")?.length || 0)}
                    </p>
                    <p className="mb-5">
                      Confirm:{" "}
                      {"*".repeat(
                        form.getValues("confirmPassword")?.length || 0
                      )}
                    </p>
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
