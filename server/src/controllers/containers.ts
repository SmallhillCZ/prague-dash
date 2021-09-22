import { Router } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { GOLEMIO_TOKEN } from "../constants";

export const ContainersController = Router();

ContainersController.get("/", async (req, res, next) => {

  const requestOptions: AxiosRequestConfig = {
    headers: { "x-access-token": GOLEMIO_TOKEN }
  };

  const containers = await axios.get("https://api.golemio.cz/v2/sortedwastestations/?onlyMonitored=true&limit=10", requestOptions)
    .then(res => res.data);

  res.header({ "content-type": "application/json");
  res.send(containers);


});