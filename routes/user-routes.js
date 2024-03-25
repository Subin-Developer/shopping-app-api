import  express  from "express";
import { getAllusers, login, signup } from "../Controllers/user-controller.js";
import { createproduct, getAllproduct } from "../Controllers/productcontroller.js";
import { verifyToken } from "../Middleware/auth.js";

const routes= express.Router();

routes.get("/",verifyToken, getAllusers);
routes.post("/signup", signup);
routes.post("/login",login );
routes.post("/createproduct",verifyToken, createproduct);
routes.get("/getproducts",verifyToken, getAllproduct);

export default routes;