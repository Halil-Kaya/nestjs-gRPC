# Nestjs + gRPC example

>Hello! ✋
> 
>I have been searching for an example project that utilizes gRPC with NestJS, but I have not been able to find a detailed one. Therefore, I have created this repository to provide an example for using gRPC.
>This project is a simple todo app, and I have implemented gRPC for my microservices. You can find more details about the architecture in the image

## Architecture
<p align="center">
  <img src="./img-architecture.jpeg" alt="Architecture"/>
</p>


## Postman document link

> You can find the Postman document link for this project here: https://documenter.getpostman.com/view/10504693/2s8YYFrPm1.

### To run
```bash
$ docker-compose up
```

### To run tests
```bash
$ npm run test
```

### To stop project
```bash
$ docker-compose down
```

###

#### Proto files
> You can find the proto files for this project in the libs/grpc-types/src/protos folder. There are three proto files: user, auth, and todo. Each of the microservices has its own proto file.
> 
#### Converting Proto files to Typescript files
> For your project you need to add typescript versions of your proto files, but it can be a bit difficult, especially if your protobuf files are massive as it can take a lot of time.
> for this reasean there are some pluggins to converting proto files to typescript files automatic.
> I used protoc plugin for this project.

```bash
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=nestJs=true --ts_proto_opt=snakeToCamel=false --ts_proto_out=. ./libs/grpc-types/src/protos/*.proto
```
> After running this script, your TypeScript files will be generated from your proto files. You can also add this script to the package.json file.


#### to run script
```bash
$ npm run proto-generate
```

#### gRPC Logger
> If you're looking for a logger example for your gRPC microservices, you can use this log interceptor.


#### 

```ts
//path: libs/interceptors/grpc-log-interceptor.ts
@Injectable()
export class GrpcLogInterceptor implements NestInterceptor {
  private logger = new Logger('GRPC');

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const reqBody = context.switchToRpc().getData();
    const method = context.getHandler().name;
    const contextType = context.getType();
    const controllerName = context.getClass().name;
    this.logger.log(
      `REQ [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(
        reqBody,
      )}`,
    );
    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `RES [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(
            data,
          )}`,
        );
      }),
    );
  }
}
```
> You can log the controller and method name with this log interceptor. However, note that you can't add global interceptors for gRPC controllers. Hence, you need to add them to each controller separately.
### for example to using gRPC interceptor
```ts
@UseInterceptors(GrpcLogInterceptor)
@Controller('user')
export class UserController{
   ... 
}
```

### gRPC error handling
> Error handling for gRPC is different from general error handling. For example, if you throw a NicknameAlreadyTakenException error in the user-service microservice, you may expect a NicknameAlreadyTakenException object error.
> but if your microservice is using gRPC, it throw diffrent error model.
> you can find more detail with this link https://grpc.io/docs/guides/error/
> but if you want to take your error model, you can do with this code 

```ts
//path: libs/filters/grpc-all.exceptions.filter.ts
@Catch()
export class GrpcAllExceptionsFilter extends BaseRpcExceptionFilter {
  private logger = new Logger(GrpcAllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (!exception.isCustomError) {
      exception = new GeneralServerErrorException();
    }
    this.logger.error(
      `[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`,
    );
    const errorMetadata = new Metadata();
    errorMetadata.add(GrpcMetadataErrorKey, JSON.stringify(exception));
    exception.metadata = errorMetadata;
    return throwError(() => exception);
  }
}
```
> if your gRPC microservices throw error this filter will handle it.
> This handler take your custom error and put to gRPC's meta key.
> in gateway section you can take from meta key

```ts
//path: libs/filters/all.exceptions.filter.ts
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    //Check if the error came from gRPC
    if (exception.metadata) {
      try {
        exception = JSON.parse(exception.metadata.get(GrpcMetadataErrorKey)[0]);
      } catch (e) {
        this.logger.error(
          `[GRPC UNHANDLED ERROR]: [${exception?.message}] :-> `,
          JSON.stringify(exception),
        );
        exception = new GeneralServerErrorException();
      }
    } else if (!exception.isCustomError) {
      this.logger.error(
        `[UNHANDLED ERROR]: [${exception?.message}] :-> `,
        JSON.stringify(exception),
      );
      exception = new GeneralServerErrorException();
    } else {
      this.logger.error(
        `[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`,
      );
    }
    response.status(500).json({
      meta: {
        headers: request.headers,
        params: request.params,
        status: request.status,
        errorCode: exception.errorCode,
        errorMessage: exception.message,
        timestamp: new Date(),
      },
      result: exception,
    });
  }
}
```
>  You need to know that you can't add global filter for gRPC controllers. Hence, you need to add to each controller separately.

### for example to using gRPC filter
```ts
@UseFilters(GrpcAllExceptionsFilter)
@Controller('user')
export class UserController{
   ... 
}
```