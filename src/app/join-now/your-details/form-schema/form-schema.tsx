import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
  disabledAccess: z.enum(["No", "Yes"], { message: "This option is required" }),
  telephone: z
    .string()
    .regex(/^\d+$/, { message: "Telephone must contain only numbers" })
    .min(10, { message: "Telephone must be at least 10 digits" }),
  postCode: z
    .string()
    .regex(/^[A-Za-z0-9\s]{3,10}$/, { message: "Invalid postcode format" }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date of birth must be in YYYY-MM-DD format",
    })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      { message: "Date of birth must be in the past" }
    )
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < date.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),

  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Start Date must be in YYYY-MM-DD format",
    })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime()) && date > new Date();
      },
      { message: "Start Date must be in the future" }
    ),
});

export type YourDetailFormData = z.infer<typeof formSchema>;
