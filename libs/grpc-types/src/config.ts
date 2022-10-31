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
  hostname: 'user-service',
  port: 5056,
  path: './../../user.proto',
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
