import { Request, Response } from "express";
import { generateJWTTokenUsingPrisma } from "../util/jwtUtils";
import { getrole, getUserId } from "../services/user";

import { authenticateUser } from "../services/authService";
import { LoginUserSchema } from "../schema/auth";

export async function login(input: LoginUserSchema): Promise<any | null> {
  
  const userDetails = await authenticateUser(input);
  const userDetail = userDetails[0];

  //console.log(userCheck, "usercheck\n\n\n");
   console.log("\n\n\n\n userDetails:----",userDetails);

  if (userDetail.Response == false) {
    console.log("Authentication Failed in login \n");
    return null;
  } else {
    const empid = userDetail.Id;
    const userCheck = await getUserId(userDetail.Id);
    if (userCheck != null) {
      const role = await getrole(userDetail.Id);

      console.log(role, "role");
      userDetail.RoleName = role;

      const jwtToken: string = generateJWTTokenUsingPrisma(userDetail);

      return { token: jwtToken, userDetail };
    } else {
      console.log("user not found");

      return null;
    }
  }
}
