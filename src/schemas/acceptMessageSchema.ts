import { HardDriveDownload } from "lucide-react";
import { z } from "zod";

export const acceptMessageSchema = z.object({
  acceptMessage: z.boolean(),
});