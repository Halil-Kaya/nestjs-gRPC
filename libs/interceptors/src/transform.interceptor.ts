import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface MetaInterface {
  headers: any;
  params: any;
  status: boolean;
  errorCode?: string;
  timestamp: Date;
}

export interface Response<T> {
  meta: MetaInterface;
  result: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    const { method, url, body, headers, params, status } = context
      .switchToHttp()
      .getRequest();
    this.logger.log(`REQ [${method} ${url}]:-> ${JSON.stringify(body)}`);
    return next.handle().pipe(
      map((data) => {
        const res = {
          meta: {
            headers: headers,
            params: params,
            status: status,
            timestamp: new Date(),
          },
          result: data,
        };
        this.logger.log(`RES [${method} ${url}] :-> ${JSON.stringify(res)}`);
        return res;
      }),
    );
  }
}
