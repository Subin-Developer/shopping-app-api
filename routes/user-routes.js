import  express  from "express";
import { getAllusers, login, signup } from "../Controllers/user-controller.js";

const routes= express.Router();

routes.get("/", getAllusers);
routes.post("/signup", signup);
routes.post("/login",login );

export default routes;