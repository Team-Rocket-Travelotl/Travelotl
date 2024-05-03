import { NextFunction, Request, Response } from "express";

export type ControllerMethod = (req: Request, res: Response, next: NextFunction) => void;
export type AsyncControllerMethod = (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined | void>;