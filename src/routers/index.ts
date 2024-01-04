import { Router } from "express";
import { verifyAccessToken } from "../util/jwtUtils"
import loginRoute from "./login";

import reportRoute from "./report";

const mainRouter=Router();



mainRouter.use("/login", loginRoute)
mainRouter.use("/report",verifyAccessToken,reportRoute)




export default mainRouter;
