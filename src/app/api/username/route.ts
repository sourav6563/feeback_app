import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";
import { createResponse } from "@/lib/apiResponse";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export const GET = async (request: Request) => {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const quaryParam = {
      username: searchParams.get("username"),
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(quaryParam);
    // console.log(result); //TODO: remove

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return createResponse(
        false,
        usernameErrors.length > 0
          ? usernameErrors.join(", ")
          : "Invalid query parameters",
        400
      );
    }
    const { username } = result.data;
    console.log(result.data);
    const existingVerifiedUser = await User.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return createResponse(false, "Username is already taken", 400);
    }
    return createResponse(true, "Username is available", 200);
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
