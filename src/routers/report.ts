import { NextFunction, Request, Response, Router } from "express";
import { report, Report } from "../schema/report";
import { validateSchema } from "../schema";
import { createReport, deleteReport, updateReport, getReport, getReports, gethodId, updateProgressStep} from "../services/reports";
import { log } from "console";
import {
  ReportContent,
  reportContent,
  ReportUpdate,
  reportUpdate,
} from "../schema/report";
const reportRouter = Router();

reportRouter.post("/", async (req: Request, res: Response) => {
  try {
    // console.log(req,"requsts\n\n\n\n\\n\n\n");

    const reportReq = await createReport(req.body, req.user);
    console.log(reportReq);
    return res.status(200).json({ msg: "Report Created" });
  } catch (err) {
    return res.status(404).json({ err: "Report Can't be Created" });
  }
});

reportRouter.put(
  "/:id",
  //validateSchema(reportUpdate),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const updateReq = await updateReport(
        req.body,
        req.user,
        parseInt(req.params.id)
      );
      // console.log(reportReq);
      return res.status(200).json({ msg: "Report updated." });
    } catch (err) {
      return res.status(404).json({ err: "Can't Update Report" });
    }
  }
);

reportRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.params, "params\n\n\n\n\n\n\n");

    const reportReq = await deleteReport(parseInt(req.params.id), req.user);
    // console.log(reportReq);
    return res.status(200).json({ msg: "Report Deleted" });
  } catch (err) {
    return res.status(404).json({ err: "Report can't be Deleted" });
  }
});

reportRouter.get("/:id", async (req: Request, res:Response, next: NextFunction) =>{
  try{
    const report = await getReport(parseInt(req.params.id));
    return res.status(200).json(report);
  } catch(err) {
    next(new Error("Report can't be found"));
  }
})

reportRouter.get("/", async (req: Request, res:Response, next: NextFunction) =>{
  try{
    if(req.user){
      const report = await getReports(req.user.employeeId);
      return res.status(200).json(report);
    } else {
      return res.status(200).json([]);
    }
  } catch(err) {
    console.log(err);
    next(new Error("Report can't be found"));
  }
})
reportRouter.post("/submit/:id",async (req: Request, res:Response, next: NextFunction) =>{
  try{
    if(req.user){
      const hodid = await gethodId(req.user.employeeId,parseInt(req.params.id));
      //const assingedreport = await insertUserReport(hodid,parseInt(req.params.id));
      if (hodid)
      {return res.status(200).json("submitted");}
      
    } 
  } catch(err) {
    console.log(err);
    next(new Error("Report not submitted"));
  }
}
)

reportRouter.post("/review/:id",async (req: Request, res:Response, next: NextFunction) =>{
  try{
    if(req.user){
      const hodid = await updateProgressStep(parseInt(req.params.id),req.body);
      //const assingedreport = await insertUserReport(hodid,parseInt(req.params.id));
      if (hodid)
      {return res.status(200).json("reviewed");}
      
    } 
  } catch(err) {
    console.log(err);
    next(new Error("Report not submitted"));
  }
}
)



export default reportRouter;
