import { deleteAccountService } from "../services/account.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const deleteAccount = async (req, res) => {
  try {
    const { reason } = req.body;
    const userId = req.user;

    const result = await deleteAccountService(userId, reason);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error(error);

    if (error.message === "Reason is required") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to process account deletion",
    });
  }
};