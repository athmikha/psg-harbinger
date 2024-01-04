import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User , UserRole, userRole} from "../schema/user";


export async function getrole(input: string) {
  try {
    console.log(input, "Emp_id");
    console.log("tryinggggggggggg\n\n");

    const user = await prisma.user.findUnique({
      where: {
        employeeId: input,
      },
    });

    if (user) {
      const role = user.role;
      console.log(role, "role");
      return role as UserRole | null;
    } else {
      return null; 
    }

    
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export async function getUserId(input: string): Promise<boolean|null> {
  try {
    console.log(input, "Emp_id");
    console.log("tryinggggggggggg\n\n");

    const user = await prisma.user.findUnique({
      where: {
        employeeId: input,
      },
    });

    console.log(user, "user\n\n\n");
    
     
    if (user) {
      
      console.log(user, "user innnn\n\n\n");
      return true;
    } else {
      return null; 
    }
  } catch (error) {
    throw new Error("User not found");
  }
}
