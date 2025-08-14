"use server";
import { google } from "googleapis";

export const storeInGoogleSheet = async (
  googleSheetId: string,
  readRange: string,
  valueToCheck: string,
  rangeToSave: string,
  values: string[]
) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const getResult = await sheets.spreadsheets.values.get({
      spreadsheetId: googleSheetId,
      range: readRange,
    });
    const valueChecked = getResult.data.values?.flat().includes(valueToCheck);
    if (valueChecked) {
      throw new Error("data already in system");
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: googleSheetId,
        range: rangeToSave,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [values],
        },
      });
    }
  } catch (error) {
    if (error instanceof Error && error.message === "data already in system") {
      throw error; // Re-throw the original specific error
    } else {
      console.error(
        "An unexpected error occurred during Google Sheet operation:",
        error
      );
      throw new Error("something went wrong");
    }
  }
};
