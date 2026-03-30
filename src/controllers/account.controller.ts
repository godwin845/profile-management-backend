import type { Request, Response } from "express";
import { deleteAccountService } from "../services/account.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

/**
 * Controller to delete a user account
 */
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { reason } = req.body as { reason?: string };
    const userId = (req as { userId?: string }).userId as string; // assuming userId is attached by auth middleware

    if (!userId) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }

    const result = await deleteAccountService(userId, reason || "");

    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage === "Reason is required") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to process account deletion",
    });
  }
};