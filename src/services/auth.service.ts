import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/user.model.ts";

interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location?: string;
  dateOfBirth?: string;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

/**
 * Registers a new user
 * @param userData - User registration data
 * @returns JWT token and created user
 */
export const registerUserService = async (
  userData: RegisterUserDTO
): Promise<AuthResponse> => {
  const { firstName, lastName, email, password, location, dateOfBirth } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    ...(location && { location }),
    ...(dateOfBirth && { dateOfBirth }),
  });

  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

/**
 * Logs in a user
 * @param email - User email
 * @param password - User password
 * @returns JWT token and authenticated user
 */
export const loginUserService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};