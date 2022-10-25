import { createUser } from "../../common/user.helpers";
import { UserProto } from "grpc-types/grpc-types";
import { login } from "../../common/auth.helpers";
import { createTodo } from "../../common/todo.heplers";
import { TodoCreateDto } from "../../../src/modules/todo/dto";
import { MetaInterface } from "interceptors/interceptors";
import { ErrorCodes } from "exceptions/exceptions";

it("should create Todo", async () => {
  const reqDto: UserProto.CreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    password: Math.random().toString(36).slice(2, 16)
  };

  const { data: createUserResponse } = await createUser(reqDto);
  const createdUser = createUserResponse.result;
  const { data: loginResponse } = await login({
    nickname: reqDto.nickname,
    password: reqDto.password
  });

  const reqDto2: TodoCreateDto = {
    content: Math.random().toString(36).slice(2, 16),
    title: Math.random().toString(36).slice(2, 16)
  };

  const { data: createTodoResponse } = await createTodo(reqDto2, loginResponse.result.token);
  const createdTodo = createTodoResponse.result.todo;
  expect(createdTodo.content).toBe(reqDto2.content);
  expect(createdTodo.title).toBe(reqDto2.title);
  expect(createdTodo.userId).toBe(createdUser._id);
  expect(createdTodo.createdAt).toBeDefined();
});

it("should not create todo if token invalid", async () => {
  const reqDto: TodoCreateDto = {
    content: Math.random().toString(36).slice(2, 16),
    title: Math.random().toString(36).slice(2, 16)
  };

  try {
    await createTodo(reqDto, "invalid-token");
    expect(undefined).toBeDefined();
  } catch (err) {
    const result = <MetaInterface>err.response.data.meta;
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CREDENTIALS);
  }
}); 