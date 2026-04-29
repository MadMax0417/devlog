import z from "zod";
import { EMood } from "../models/Log.model.js";

export const createLogZodSchema = z.object({
  goal: z.string()
        .min(2, "Goal should be at least 2 characters")
        .max(1000, "Goal should be at most 100 characters"),
  achieved: z.string()
            .min(2, "Goal should be at least 2 characters")
            .max(1000, "Goal should be at most 100 characters")
            .optional(),
    date:z.coerce.date(),
    mood:z.enum(Object.values(EMood)).optional(),
    tags: z.string().array().optional(),
    isCompleted: z.coerce.boolean().default(false),
});

export const updateLogZodSchema = z.object({
  goal: z.string()
        .min(2, "Goal should be at least 2 characters")
        .max(1000, "Goal should be at most 100 characters").optional(),
  achieved: z.string()
            .min(2, "Goal should be at least 2 characters")
            .max(1000, "Goal should be at most 100 characters")
            .optional(),
    date:z.coerce.date().optional(),
    mood:z.enum(Object.values(EMood)).optional(),
    tags: z.string().array().optional(),
    isCompleted: z.coerce.boolean().default(false),
});




