"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  birthDate: z.date({ message: "Birth date is required" }),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  profilePicture: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">Create New Attendance Form</h1>
      <span className="text-sm text-gray-500 font-medium">
        Athunetication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="userName"
          defaultValue={data?.userName}
          register={register}
          error={errors?.userName}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-sm text-gray-500 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          error={errors?.phoneNumber}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Blood Group"
          name="bloodGroup"
          defaultValue={data?.bloodGroup}
          register={register}
          error={errors?.bloodGroup}
        />
        <InputField
          label="Birth Date"
          name="birthDate"
          type="date"
          defaultValue={data?.birthDate}
          register={register}
          error={errors?.birthDate}
        />
      
      <div className="flex flex-col gap-2 w-full md:w-1/4 ">
        <label className="text-sm text-gray-500">Gender</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-s w-full"
          {...register("gender")}
          defaultValue={data?.gender}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender?.message && (
          <p className="text-xs text-red-400 ">
            {errors.gender.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4 ">
        <label className="text-sm text-gray-500 flex items-center ga-2 cursor-pointer" htmlFor="profilePicture">
          <Image src="/upload.png" alt="upload" width={28} height={28} />
          <span>Upload Profile Picture</span>
        </label>
        <input type="file" id="profilePicture" {...register("profilePicture")} className="hidden" />
        {errors.gender?.message && (
          <p className="text-xs text-red-400 ">
            {errors.gender.message.toString()}
          </p>
        )}
      </div>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;
