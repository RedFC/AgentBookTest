import expess from "express";
import { UserRouter } from "../app/http/controller/api/user";
import { PorjectRouter } from "../app/http/controller/api/project";
import { CardRouter } from "../app/http/controller/api/card";
const app = expess();

app.use("/user", UserRouter);
app.use("/project", PorjectRouter);
app.use("/card", CardRouter);


module.exports = app;