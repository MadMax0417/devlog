import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt, {type SignOptions} from "jsonwebtoken";

enum RoleEnum {
  Admin = "admin",
  User = "user",
}

interface UserType extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: RoleEnum;

  //timestamps
  createdAt?: Date;
  updatedAt?: Date;

  //methods
  comparePassword(password: string) : Promise<boolean>;
  generateAccessToken(): string
}

const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email address",
      },
      maxLength: 350,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    // for future proofing 
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.User,
    },
  },
  { timestamps: true },
);

// TODO : NEED TO CHECK THIS
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken =  function () {
  // make accessToken with jwt
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: this.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '7d'
    }
  );
};

export const User = mongoose.model<UserType>("User", userSchema);
