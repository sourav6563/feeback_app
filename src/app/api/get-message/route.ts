import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import { createResponse } from "@/lib/apiResponse";
import UserModel from "@/model/user";
import mongoose from "mongoose";
export const GET = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !user) {
    return createResponse(false, "Unauthorized", 401);
  }
  const userid = new mongoose.Types.ObjectId(user._id); // user._id;
  try {
    const foundUser = await UserModel.aggregate([
      { $match: { _id: userid } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]);
    if (!foundUser || foundUser.length === 0) {
      return createResponse(true, "No messages found", 200, []);
    }

    return createResponse(
      true,
      "User fetched successfully",
      200,
      foundUser[0].messages
    );
  } catch (error) {
    console.error(`error while fetching messages`, error);
    return createResponse(false, "Error ", 500);
  }
};
