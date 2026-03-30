// src/constants/httpStatus.ts

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
} as const;

// Type-safe access for values
export type HTTP_STATUS = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];