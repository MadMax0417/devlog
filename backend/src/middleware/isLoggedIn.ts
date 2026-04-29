import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { ApiError } from "../lib/ApiError.js";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get cookie from accessToken
    const accessToken = req.cookies.accessToken;


    if (!accessToken) {

      const errorResponse: ApiError = {
        success: false,
        message: "Please log in or invalid token",
      };
      return res.status(401).json(errorResponse); 
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
    // console.log({ decoded });

    // console.log(typeof decoded, "-----type of decoded"); //object
    req.user = decoded as JwtPayload;


    next();
  } catch (err) {


    const response: ApiError = {
      success: false,
      message: "Invalid or expired token",
    };
    return res.status(401).json(response);
  }
};
