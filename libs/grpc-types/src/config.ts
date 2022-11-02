export const AuthConfig = {
  hostname: 'auth-service',
  port: 5055,
  path: './../../auth.proto',
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true,
  },
};

export const UserConfig = {
  hostname: process.env.SERVICE_HOST,
  port: process.env.SERVICE_PORT,
  path: './../../../user.proto',
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true,
  },
};

export const TodoConfig = {
  hostname: 'todo-service',
  port: 5058,
  path: './../../todo.proto',
  loader: {
    keepCase: true,
    longs: Number,
    enums: String,
    arrays: true,
  },
};
