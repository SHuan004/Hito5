import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  uid: string;
  email: string;
  iat: number;
  exp: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      // Invocamos res... y luego hacemos return; sin devolver el objeto
      res.status(403).json({ message: "No token provided!" });
      return;
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const secret = process.env.JWT_SECRET || "MiSecreto";
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // Almacena la info en req para uso posterior
    (req as any).userId = decoded.uid;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }
};
