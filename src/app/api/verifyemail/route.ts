import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { createResponse } from "@/lib/apiResponse";
import { verifySchema } from "@/schemas/verifySchema";

export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const body = await request.json();
    const result = verifySchema.safeParse(body);

    if (!result.success) {
      return createResponse(
        false,
        "Validation Error",
        400,
        undefined,
        result.error.format()
      );
    }
    const { code, username } = result.data;
    const decodedUsername = decodeURIComponent(username);
    const user = await User.findOne({ username: decodedUsername });
    if (!user) {
      return createResponse(false, "User not found", 404);
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return createResponse(true, "User verified successfully", 200);
    } else if (!isCodeNotExpired) {
      return createResponse(
        false,
        "Verification Code Expired Please signUp Again",
        400
      );
    } else {
      return createResponse(false, "Invalid Verification Code", 400);
    }
  } catch (error) {
    console.error(`Error verifying User: ${error}`);
    return createResponse(
      false,
      "Error Checking Username",
      500,
      undefined,
      error
    );
  }
};
