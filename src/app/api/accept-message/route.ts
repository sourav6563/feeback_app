import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import { createResponse } from "@/lib/apiResponse";
import UserModel from "@/model/user";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";

export const POST = async (request: Request) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !user) {
    return createResponse(false, "Unauthorized", 401);
  }
  const userid = user._id;
  const body = await request.json();
  const result = acceptMessageSchema.safeParse(body);

  if (!result.success) {
    return createResponse(
      false,
      "Validation Error",
      400,
      undefined,
      result.error.format()
    );
  }
  const { acceptMessage } = result.data;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userid,
      {
        isAcceptingMessage: acceptMessage,
      },
      { new: true }
    );
    if (!updatedUser) {
      return createResponse(false, "User not found", 404);
    }
    return createResponse(
      true,
      "Message accepted successfully",
      200,
      updatedUser
    );
  } catch (error) {
    console.error(`Error accepting message`, error);
    return createResponse(false, "Error ", 500);
  }
};

export const GET = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !user) {
    return createResponse(false, "Unauthorized", 401);
  }
  const userid = user._id;
  try {
    const updatedUser = await UserModel.findById(userid);
    if (!updatedUser) {
      return createResponse(false, "User not found", 404);
    }
    return createResponse(
      true,
      "User fetched successfully",
      200,
      updatedUser.isAcceptingMessage
    );
  } catch (error) {
    console.error(`Error while fetching error Accepting Message Status`, error);
    return createResponse(false, "Error ", 500);
  }
};
