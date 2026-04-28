import type { Request, Response, NextFunction } from "express";
import type { ApiError } from "../lib/ApiError.js";
import {
  loginUserZodSchema,
  registerUserZodSchema,
} from "../schemas/User.zodschema.js";
import z from "zod";
import { User } from "../models/User.model.js";
import type { ApiResponse } from "../lib/ApiResponse.js";


export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get body
    const body = req.body;

    //check if body is empty
    if (!body || Object.keys(body).length === 0) {
      const response: ApiError = {
        success: false,
        message: "Invalid Data",
      };
      res.status(400).json(response);
    }

    //check schema
    const parsedData = registerUserZodSchema.safeParse(body);

    if (!parsedData.success) {
      const pretty = z.prettifyError(parsedData.error);
      const response: ApiError = {
        success: false,
        message: pretty || "Invalid Data",
      };

      res.status(400).json(response);
    }

    const data = parsedData.data;
    const email = data?.email || "";
    const username = data?.username || "";

    //if user exists

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const response: ApiError = {
        success: false,
        message: "User or Email already Exists",
      };
      res.status(409).json(response);
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      const response: ApiError = {
        success: false,
        message: "Username already Exists",
      };
      res.status(409).json(response);
    }

    //password hash => done in pre method

    //save user and checks if it is not undefined
    if (typeof data !== "undefined") {
      const user = await User.create({
        username: data.username,
        email: data.email,
        fullName: data.email,
        password: data.password,
      });

      //if user is not saved
      if (!user) {
        const response: ApiError = {
          success: false,
          message: "Something Went wrong while saving user",
        };
        res.status(500).json(response);
      }

      //deleting refinedData before registering the user
      const refinedData: any = user;
      delete refinedData.password;

      const existingUser = await User.findById(user?._id).select("-password -__v -role");
      

      const response: ApiResponse = {
        success: true,
        message: "User created successfully",
        data: existingUser,
      };
     return res.status(201).json(response);
    }
  } catch (err) {
    console.error(err);

    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    res.status(500).json(response);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //STEP 1: getbody
    const body = req.body;

    //STEP 2: sanitise the body
    if (!body || Object.keys(body).length === 0) {
      const response: ApiError = {
        success: false,
        message: "Invalid Data",
      };
      res.status(400).json(response);
    }

    // STEP 3: check schema
    const parsedData = loginUserZodSchema.safeParse(body);
    if (!parsedData.success) {
      const pretty = z.prettifyError(parsedData.error);
      const response: ApiError = {
        success: false,
        message: pretty || "Invalid Data",
      };

      res.status(400).json(response);
    }

    const data = parsedData.data;
    const usernameOrEmail = data?.usernameOrEmail;

    //STEP 4: if user not exists return error
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail }, 
        { email: usernameOrEmail }],
    });

    if (!user) {
      const response: ApiError = {
        success: false,
        message: "Invalid Username or Password",
      };

      res.status(401).json(response);
    }

    //STEP 5: password check
    if(typeof data !== "undefined"){
        const isPasswordCorrect = await user?.comparePassword(data?.password);

        if (!isPasswordCorrect) {
          const response: ApiError = {
            success: false,
            message: "Invalid Username or Password",
          };
    
          res.status(401).json(response);
        }
    }

    //step 6: generate accessToken

    const accessToken = await user?.generateAccessToken();

    if (!accessToken) {
      const response: ApiError = {
        success: false,
        message: "Something went wrong",
      };

      res.status(500).json(response);
    }
  
    const loggedInUser = await User.findById(user?._id).select("-password")
    
    const options = {
        maxAge : 604800000,
        httpOnly: true, 
        secure: process.env.ENVIRONMENT === "prod"
    }

    //Step 7: return user
    const response: ApiResponse = {
      success: true,
      message: "User logged in successfully",
      data : loggedInUser
    };

    return res
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(response);


  } catch (err) {
    console.error(err);

    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    res.status(500).json(response);
  }
};

export const logOutUser = async(req: Request, res: Response, next: NextFunction) => {
 try {
  //if user obj exists
  const user = req.user;

  if(!user){
     const response: ApiError = {
        success: false,
        message: "Something went wrong",
      };

      res.status(401).json(response);
  }

  //check if user is valid 

  //remove jwt token
  
 } catch (error) {
  
 }
}
