import { AuthProto, UserProto } from 'grpc-types/grpc-types';
import { createUser } from '../../common/user.helpers';
import { login } from '../../common/auth.helpers';
import { createTodo, fetchTodos } from '../../common/todo.heplers';

it('should fetch todos of user', async () => {
  const reqDto: UserProto.CreateDto = {
    fullName: 'test name',
    nickname: Math.random().toString(36).slice(2, 16),
    password: Math.random().toString(36).slice(2, 16),
  };
  await createUser(reqDto);

  const reqDto2: AuthProto.LoginDto = {
    nickname: reqDto.nickname,
    password: reqDto.password,
  };
  const { data: loginResponse } = await login(reqDto2);
  const { token } = loginResponse.result;

  const todos = [
    {
      content: 'content-1',
      title: 'title-1',
    },
    {
      content: 'content-2',
      title: 'title-2',
    },
    {
      content: 'content-3',
      title: 'title-3',
    },
  ];
  for (let i = 0; i < todos.length; i++) {
    await createTodo(todos[i], token);
  }

  const { data: fetchResponse } = await fetchTodos(token);
  const { todos: fetchedTodos } = fetchResponse.result;

  for (let i = 0; i < todos.length; i++) {
    expect(fetchedTodos[i]._id).toBeDefined();
    expect(fetchedTodos[i].title).toBe(todos[i].title);
    expect(fetchedTodos[i].content).toBe(todos[i].content);
    expect(fetchedTodos[i].userId).toBeDefined();
    expect(fetchedTodos[i].createdAt).toBeDefined();
  }
});

it('should create and fetch 100 todos', async () => {
  const reqDto: UserProto.CreateDto = {
    fullName: 'test name',
    nickname: Math.random().toString(36).slice(2, 16),
    password: Math.random().toString(36).slice(2, 16),
  };
  await createUser(reqDto);

  const reqDto2: AuthProto.LoginDto = {
    nickname: reqDto.nickname,
    password: reqDto.password,
  };
  const { data: loginResponse } = await login(reqDto2);
  const { token } = loginResponse.result;

  const createTodoPromises = [];
  for (let i = 0; i < 100; i++) {
    createTodoPromises.push(
      createTodo(
        {
          title: (Math.random() + 1).toString(36).substring(7),
          content: (Math.random() + 1).toString(36).substring(7),
        },
        token,
      ),
    );
  }

  await Promise.all(createTodoPromises);

  const { data: fetchResponse } = await fetchTodos(token);
  const { todos: fetchedTodos } = fetchResponse.result;

  fetchedTodos.every((todo) => {
    expect(todo._id).toBeDefined();
    expect(todo.title).toBeDefined();
    expect(todo.content).toBeDefined();
    expect(todo.userId).toBeDefined();
    expect(todo.createdAt).toBeDefined();
  });
});
