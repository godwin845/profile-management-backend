import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { _id: string };
  userId?: { _id: string };
}

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    // Attach authenticated user to request for controllers/services
    req.user = { _id: decoded.id };
    req.userId = { _id: decoded.id };
    next();
  } catch (err: unknown) {
    console.error("JWT_VERIFY_ERROR:", err);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};