import { connect, disconnect, ConnectOptions } from "mongoose";
import { Users } from "./schema";
import { Request, Response } from "express";

/**
 *
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(obj: {}): boolean {
  for (var x in obj) {
    return false;
  }
  return true;
}

export const Register = async (req: Request, res: Response) => {
  const exisitingUser = await Users.find({ email: req.body.email });

  if (typeof exisitingUser === "object" && !isEmpty(exisitingUser))
    return res.status(400).json({
      message:
        "Registration was not successful. The issue is with the details you sent to us.",
    });
  const newUser = new Users({
    email: req.body?.email,
    password: req.body?.password,
  });
  await newUser.save();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    message: "You have successfully registered with " + req.body.email,
  });
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req?.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Please provide your email and password",
    });
  const user = await Users.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({
      message: "Invalid credentials. Please try again.",
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    message: "You have successfully logged in with " + email,
  });
};
