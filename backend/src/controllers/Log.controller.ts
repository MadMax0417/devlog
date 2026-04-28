import type { NextFunction, Response, Request } from "express";
import type { ApiError } from "../lib/ApiError.js";
import { User } from "../models/User.model.js";
import { Log } from "../models/Log.model.js";
import type { ApiResponse } from "../lib/ApiResponse.js";
import { createLogZodSchema, updateLogZodSchema } from "../schemas/Log.zodschema.js";
import z from "zod";
import { parse } from "node:path";

export const getAllLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    let isCompleted = req.query.isCompleted as string;

    if (!isCompleted) isCompleted = "false";

    if (!user) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }
    const userId = user.id as string;

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      const response: ApiError = {
        success: false,
        message: "User not found.",
      };
      return res.status(404).json(response);
    }

    const allLogs = await Log.find({
      user: userId,
      isCompleted: isCompleted === "true" ? true : false,
    }).lean();

    if (!allLogs) {
      const response: ApiError = {
        success: false,
        message: "Error getting logs.",
      };
      return res.status(500).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: "Fetched logs successfully",
      data: allLogs,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    return res.status(400).json(response);
  }
};

export const getSingleLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get data
    const user = req.user;
    const logId = req.params;

    //check if undefined
    if (!user || !logId) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }

    //find if user exists
    const userId = user.id as string;

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      const response: ApiError = {
        success: false,
        message: "User not found.",
      };
      return res.status(404).json(response);
    }

    //check single log now
    const log = await Log.findOne({
      user: userId,
      _id: logId,
    }).lean();

    if (!log) {
      const response: ApiError = {
        success: false,
        message: "Error while fetching log.",
      };
      return res.status(500).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: "Log fetched successfully",
      data: log || [],
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    return res.status(400).json(response);
  }
};
export const createLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //STEP 1: get user & body
    const user = req.user;
    const body = req.body;

    //STEP 2: check body & user
    if (!user) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }

    if (!body || Object.keys(body).length === 0) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }
    //Step 2.5: check if user exists
    const userId = user.id as string;

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      const response: ApiError = {
        success: false,
        message: "User not found.",
      };
      return res.status(404).json(response);
    }

    //STEP 3:check zodSchema
    const parsedData = createLogZodSchema.safeParse(body);

    if (!parsedData.success) {
      const prettyError = z.prettifyError(parsedData.error);

      const response: ApiError = {
        success: false,
        message: "Invalid data please check again.",
        error: prettyError,
      };

      return res.status(401).json(response);
    }

    const data = parsedData.data;

    const createdUser = { user: userId, ...data };

    //STEP 4:create entry

    const createdLog = await Log.create({ ...createdUser });

    if (!createdLog) {
      const response: ApiError = {
        success: false,
        message: "Error creating log",
      };

      return res.status(500).json(response);
    }

    //STEP 5: sent data
    const response: ApiResponse = {
      success: true,
      message: "Created log successfully",
      data: createdLog,
    };

    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    return res.status(400).json(response);
  }
};

export const updateLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const logId = req.params;
    const body = req.body;

    //check if undefined
    if (!user || !logId) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }
    //TODO : check body is undefined or not
    if(!body || Object.values(body).length === 0) {
      const response: ApiError = {
        success: false,
        message: "Invalid data",
      };
      return res.status(401).json(response);
    }

    //not sure about this since everything is optional here
    const parsedData = updateLogZodSchema.safeParse(body);

    if(!parsedData.success){
      const prettifyError = z.prettifyError(parsedData?.error)
      const response: ApiError = {
        success: false,
        message: "Invalid data",
        error: prettifyError 
      };

      return res.status(401).json(response);
    }

    const data = parsedData.data

    //find if user exists
    const userId = user.id as string;

    //can we find like this User find and log together
    const logWithUser = await User.findOneAndUpdate(
      {user : userId},
      {...data},
      {new: true}
    ).select("-__v").lean(); 

    /*
    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      const response: ApiError = {
        success: false,
        message: "User not found.",
      };
      return res.status(404).json(response);
    }
    //check log 
  
     const editedLog = await Log.findOne({
      user: userId,
      _id: logId,
    }).lean();
    */

     if (!logWithUser) {
      const response: ApiError = {
        success: false,
        message: "Error while updating log.",
      };
      return res.status(500).json(response);
    }
  

    const response: ApiResponse = {
      success: true,
      message: "Log fetched successfully",
      data: logWithUser || [],
    };

    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    return res.status(400).json(response);
  }
};

export const deleteLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get user & id
    const user = req.user;
    const logId = req.params;

    //check user and id if they are valid
    if (!user || !logId) {
      const response: ApiError = {
        success: false,
        message: "Invalid Data",
      };
      return res.status(401).json(response);
    }
    //check if user exists
    const userId = user.Id as string;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      const response: ApiError = {
        success: false,
        message: "User does not exists",
      };
      return res.status(404).json(response);
    }

    // find log and delete it

    const existingLog = await Log.findOne({
      user: userId,
      _id: logId,
    });

    if (!existingLog) {
      const response: ApiError = {
        success: false,
        message: "Log does not exist or Invalid Data",
      };
      return res.status(404).json(response);
    }

    const deletedLog = await Log.findOneAndUpdate(
      { _id: logId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    ).lean();

    if(!deletedLog){
         const response: ApiError = {
        success: false,
        message: "Error deleting log",
      };
      return res.status(500).json(response);
    }


    //TODO : We can also add deletedAt in schema 

    //sent
     const response: ApiResponse = {
        success: true,
        message: "Log deleted successfully",
        data: deletedLog
      };

      return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    const response: ApiError = {
      success: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
    };
    return res.status(400).json(response);
  }
};
