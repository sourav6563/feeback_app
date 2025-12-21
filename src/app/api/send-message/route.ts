import { createResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { Message } from "@/model/user";
import { messageSchema } from "@/schemas/messageSchema";
import { z } from "zod";

export const POST = async (request: Request) => {
  await dbConnect();

  const body = await request.json();
  const result = messageSchema.extend({ username: z.string() }).safeParse(body);

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
  const { username, content } = result.data;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      createResponse(false, "User not found", 404);
    }
    if (!user?.isAcceptingMessage) {
      return createResponse(false, "user is not accepting the messages", 403);
    }
    const newMessage = {
      content,
      createdAt: new Date(),
    };
    user.messages.push(newMessage as Message);
    await user.save();
    return createResponse(true, "Message sent successfully", 200);
  } catch (error) {
    console.error(`Error while sending message`, error);
    return createResponse(false, " Internal Error on sending message ", 500);
  }
};
