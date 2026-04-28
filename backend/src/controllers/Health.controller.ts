import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../lib/ApiResponse.js";
import type { ApiError } from "../lib/ApiError.js";

export const getHealthStatus = async (
req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response: ApiResponse = {
      success: true,
      message: "Healthy",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);

    const response: ApiError = {
      success: false,
      message: "Unhealthy",
    };

    return res.status(200).json(response);
  }
};
