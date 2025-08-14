"use server";
import { $ZodIssue } from "zod/v4/core";
import z from "zod";
import { storeInGoogleSheet } from "./storeInGoogleSheet";

type FormState = {
  success: boolean;
  errors:
    | $ZodIssue[]
    | {
        message: string | undefined;
      }
    | undefined;
};

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
});
export const subscribeAction = async (
  formState: FormState,
  formData: FormData
): Promise<FormState> => {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
  };
  const googleSheetId = process.env.GOOGLE_SHEET_ID;

  if (!googleSheetId) {
    return {
      success: false,
      errors: {
        message: "No google sheet found!",
      },
    };
  }

  const { data, success, error } = formSchema.safeParse(rawData);
  if (!success) {
    console.error(error.issues);
    return { success: false, errors: error.issues };
  }
  const readRange = "B1:B";
  const rangeToSave = "A1:B1";
  const values = [data.name, data.email];
  try {
    await storeInGoogleSheet(
      googleSheetId,
      readRange,
      data.email,
      rangeToSave,
      values
    );
    return {
      errors: undefined,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      errors: { message: `You're already in the system` },
      success: false,
    };
  }
  // return {
  //   success: false,
  //   errors: ["not implemeneted"],
  // };
};
