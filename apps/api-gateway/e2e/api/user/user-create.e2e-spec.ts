import { createUser } from "../../common/user.helpers";
import { UserProto } from "grpc-types/grpc-types";


it("should create user", async () => {
  const reqDto: UserProto.UserCreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    role: UserProto.UserRole.NORMAL,
    password: "123456"
  };

  const { status, data } = await createUser(reqDto);
  expect(status).toBe(201);

  const result = <UserProto.UserCreateAck>data.result;
  expect(result.fullName).toBe(reqDto.fullName);
  expect(result.nickname).toBe(reqDto.nickname);
  expect(result.id).toBeDefined();
  expect(result.createdAt).toBeDefined();
});

it("should throw error if nickname is taken", async () => {
  const reqDto: UserProto.UserCreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    role: UserProto.UserRole.NORMAL,
    password: "123456"
  };

  const { status, data } = await createUser(reqDto);
  expect(status).toBe(201);

  try {
    await createUser(reqDto);
    expect(undefined).toBeDefined();
  } catch (err) {
    console.log(err.response.data);
  }
});