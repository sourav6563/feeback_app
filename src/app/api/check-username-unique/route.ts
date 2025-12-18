import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import { createResponse } from "@/lib/apiResponse";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export const GET = async (request: Request) => {
  try {

    const
  } catch (error) {
    console.error(`Error Checking Username: ${error}`);
    return createResponse(
      false,
      "Error Checking Username",
      500,
      undefined,
      error
    );
  }
};
