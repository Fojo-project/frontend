/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import InputForm from "@/components/form/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/validation/schema";
import GoogleAuth from '@/components/GoogleAuth'

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <h1>Homepage</h1>
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <InputForm
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            register={register}
            error={errors.firstName}
          />

          <InputForm
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            register={register}
            error={errors.lastName}
          />

          <InputForm
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-6 rounded text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}
