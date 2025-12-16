import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import User from "@/model/user";
import { SignUpSchema } from "@/schemas/signupSchema";
import { success } from "zod";

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const body = await request.json();
    const result = SignUpSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Validation Error",
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    const ExistingUserVerifiedByUsername = await User.findOne({
      username,
      isVerified: true,
    });
    if (ExistingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username is already exists" },
        { status: 400 }
      );
    }
    const ExistingUserByEmail = await User.findOne({
      email,
    });
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
    if (ExistingUserByEmail) {
      //todo
      if (ExistingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "Email is already exists" },
          { status: 400 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    //send Verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User Registered SuccessFully,Please Verify Your Email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error registering User: ${error}`);
    return Response.json(
      { success: false, message: "Error registering User" },
      { status: 500 }
    );
  }
};
