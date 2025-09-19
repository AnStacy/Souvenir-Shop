import { z } from "zod";

export const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const onlyDigits = (v) => v.replace(/\D/g, "");

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name (min: 2 symbols)"),

  email: z.string().trim().email("Enter a valid email"),

  phone: z
    .string()
    .trim()
    .refine((v) => onlyDigits(v).length === 10, "Phone must contain 10 digits"),

  street: z.string().trim().min(5, "Street required"),

  city: z.string().trim().min(2, "Enter a valid city"),

  state: z
    .string()
    .trim()
    .refine((v) => US_STATES.includes(v), {
      message: "Choose a state",
    }),

  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "ZIP must be 5 digits"),
});
