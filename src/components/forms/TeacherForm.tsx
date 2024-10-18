"use client";

import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number().min(10),
  });



const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  return (
    <form>
      <input type="text"></input>
    </form>
  );
};

export default TeacherForm;
