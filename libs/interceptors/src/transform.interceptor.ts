import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface MetaInterface {
  headers: any;
  params: any;
  status: boolean;
  errorCode?: string;
  timestamp: Date;
}

export interface Response {
  meta: MetaInterface;
  result: any;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor {


  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        return {
          meta: {
            headers: req.headers,
            params: req.params,
            status: req.status,
            timestamp: new Date()
          },
          result: data
        };
      })
    );
  }
}