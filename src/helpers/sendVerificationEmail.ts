import VerificationEmail from "@/app/components/emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification Email send Successfully" };
  } catch (emailError) {
    console.error(`Error Sending Verification Email: ${emailError}`);
    return { success: false, message: "Failed to send Verification Email" };
  }
};
