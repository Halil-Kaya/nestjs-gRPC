import { AuthProto, UserProto } from "grpc-types/grpc-types";
import { createUser } from "../../common/user.helpers";
import { login } from "../../common/auth.helpers";
import { MetaInterface } from "interceptors/interceptors";
import { ErrorCodes } from "exceptions/exceptions";

it("Should user get token", async () => {

  const reqDto: UserProto.CreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    password: Math.random().toString(36).slice(2, 16)
  };

  const { data: data1, status: status1 } = await createUser(reqDto);
  expect(status1).toBe(201);
  const res1 = data1.result;
  expect(res1).toBeDefined();

  const reqDto2: AuthProto.LoginDto = {
    nickname: reqDto.nickname,
    password: reqDto.password
  };
  const { data: data2 } = await login(reqDto2);
  const result = data2.result;
  expect(result).toBeDefined();
  expect(result.token).toBeDefined();
  const payload = JSON.parse(Buffer.from(result.token.split(".")[1], "base64").toString());
  expect(res1._id).toBe(payload._id);
});

it("should get invalid credentials error if password not match ", async () => {
  const reqDto: UserProto.CreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    password: "123456"
  };

  await createUser(reqDto);

  const loginDto: AuthProto.LoginDto = {
    nickname: reqDto.nickname,
    password: "wrong-password"
  };

  try {
    await login(loginDto);
    expect(undefined).toBeDefined();
  } catch (err) {
    const result = <MetaInterface>err.response.data.meta;
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CREDENTIALS);
  }
});

it("should get invalid credentials error if user not exist", async () => {
  const reqDto: AuthProto.LoginDto = {
    nickname: "testest",
    password: "testesttest"
  };

  try {
    await login(reqDto);
    expect(undefined).toBeDefined();
  } catch (err) {
    const result = <MetaInterface>err.response.data.meta;
    expect(result.errorCode).toBe(ErrorCodes.INVALID_CREDENTIALS);
  }
});