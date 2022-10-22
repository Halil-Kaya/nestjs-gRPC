export const AuthConfig = {
  hostname: "localhost", // it will be auth-service in docker
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
  hostname: "localhost",// it will be user-service in docker
  port: 5056,
  path: "./../../user.proto",
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true
  }
};