import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ReportStage, ReportContent, Report, report } from "../schema/report";
import { User, user } from "../schema/user";
import { JwtPayload } from "../schema/user";
import { boolean } from "zod";
import { ProgressStepStatus,progressComment,ProgressComment } from "../schema/progressStep";

export async function createReport(
  reqbody: ReportContent,
  requser: JwtPayload
): Promise<boolean> {
  console.log(reqbody, "body \n");
  console.log(requser, "user \n");

  try {
    // Replace 'YourModel' with the actual model name and provide the data to be inserted
    const user = await prisma.user.findUnique({
      where: {
        employeeId: requser.employeeId,
      },
    });
    

    const result = await prisma.report.create({
      data: {
        content: {},
        departmentId: user?.departmentId,
        quater: "1",
        stage: "ACTION_FROM_REPRESENTATIVE" as ReportStage,
        assignedUsers: {
          connect: {
            employeeId: user?.employeeId
          }
        }
      },
    });

    return true;
  } catch (error) {
    console.error("Error inserting data:", error);
    return false;
  }
}

export async function updateReport(
  reqbody: ReportContent,
  requser: JwtPayload,
  reqbodyid: Report["id"]
): Promise<boolean> {

  try {
    // Replace 'YourModel' with the actual model name and provide the data to be inserted
    console.log(reqbody);
    const result = await prisma.report.update({
      where: {
        id: reqbodyid,
      },
      data: {
        // Specify the fields and values you want to insert
        content: reqbody,
      },
    });
    console.log(result, "result");

    return true;
  } catch (error) {
    console.error("Error inserting data:", error);
    return false;
  }
}

export async function deleteReport(
  reqbody: Report["id"],
  requser: JwtPayload
): Promise<boolean> {
  try {
    const repid = await prisma.report.findUnique({
      where: {
        id: reqbody,
      },
    });
    const result = await prisma.report.delete({
      where: {
        id: reqbody,
      },
    });

    console.log("deleted  report:", result);
    return true;
  } catch (error) {
    console.error("Error inserting data:", error);
    return false;
  }
}

export async function getReport(reqbody: Report["id"]) {
  const report = await prisma.report.findUnique({
    where: {
      id: reqbody,
    },
    include: {
      department: true,
      progressSteps: true,
    },
  });

  if (report == null) return null;

  return report;
}


export async function getReports(userId: User["employeeId"]) {
  const reports = await prisma.report.findMany({

    include: {
      assignedUsers: true,
      department: true,
      progressSteps: true
    }
  })
  return reports.filter((r) => r.assignedUsers.filter(u => u.employeeId == userId).length > 0);
}


export async function gethodId(userId: User["employeeId"],reqbody: Report["id"]) {
  const user = await prisma.user.findUnique({
    where: {
      employeeId: userId,
    },
  })
  const dept=user?.departmentId;
  console.log(dept,"dept");
  const hod = await prisma.user.findMany({
    where: {
      departmentId: dept,
      role: "HOD"
    },
    
  })
  
  hod.forEach((hod)=>{
    insertUserReport(hod.employeeId,reqbody)
  });
  
   
 return true; 
}

export async function insertUserReport(userId: User["employeeId"],reqbody: Report["id"]) {

  console.log(userId,"userId")
const result = await prisma.report.update({
  where:{
    id:reqbody,
  },
  data: {
    assignedUsers: {
      connect: {
        employeeId: userId
      }
    },
    
  },
});

const progstatus= await prisma.progressStep.create({
  data:{
    reportId: reqbody,
    status:"AWAITING" as ProgressStepStatus,
    currentStage:1,
  
  }
})
console.log(progstatus,"progstatus");
return true;
}


export async function updateProgressStep(reqparam: Report["id"],reqbody:ProgressComment) {
  const progstatus= await prisma.progressStep.update({
    where:{
      reportId: reqparam,
      status:"AWAITING" as ProgressStepStatus
    },
      data:{
        status:reqbody.status,
        comment:reqbody.comment,
        
      }
      
    })
  console.log(progstatus,"progstatus");
  return true
  
}