import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any> {
    const startAt = process.hrtime();
    const { method, originalUrl, ip } = request;
    if (originalUrl !== '/healthz') {
      const user = request.body;
      response.on('finish', () => {
        const { statusCode } = response;
        const diff = process.hrtime(startAt);
        const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
        this.logger.log(
          `${method} ${statusCode} ${originalUrl} ${responseTime}ms ${ip} by user: ${user.email}`,
        );
      });
    }

    next();
  }
}
