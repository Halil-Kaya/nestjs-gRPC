import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-agent") || "";
    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get("content-length");
      if (
        /\b(?:4[0-9]{2}|5[0-9][0-9]|599)\b/.test(statusCode.toString())
      ) {
        this.logger.error(
          `🚨️[${method}|${statusCode}] | ${originalUrl} | ${contentLength}bytes | ${userAgent} | ip: ${ip}`
        );
      } else {
        this.logger.log(
          `[${method}|${statusCode}] | ${originalUrl} | ${contentLength}bytes | ${userAgent}`
        );
      }
    });
    next();
  }
}
