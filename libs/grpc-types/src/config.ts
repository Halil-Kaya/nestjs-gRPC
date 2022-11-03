export const AuthConfig = {
  hostname: "auth-service",
  localHostname: "0.0.0.0",
  port: 5055,
  path: "./../../auth.proto",
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true
  }
};

export const UserConfig = {
  hostname: "user-service",
  localHostname: "0.0.0.0",
  port: 5056,
  path: "./../../user.proto",
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true
  }
};

export const TodoConfig = {
  hostname: "todo-service",
  localHostname: "0.0.0.0",
  port: 5058,
  path: "./../../todo.proto",
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true
  }
};
