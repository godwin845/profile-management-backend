import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    console.error(error);

    if (error.message === "User already exists") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error(error);

    if (error.message === "Invalid credentials") {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
