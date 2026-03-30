import type { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location?: string;
  dateOfBirth?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

/**
 * Register a new user
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as RegisterBody;
    const result = await registerUserService(body);

    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage === "User already exists") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

/**
 * Log in a user
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    const result = await loginUserService(email, password);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage === "Invalid credentials") {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: errorMessage });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};