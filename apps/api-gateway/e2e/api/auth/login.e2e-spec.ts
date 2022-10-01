import { AuthProto, UserProto } from "grpc-types/grpc-types";
import { createUser } from "../../common/user.helpers";
import { login } from "../../common/auth.helpers";

it("Should user get token", async () => {

  const reqDto: UserProto.UserCreateDto = {
    fullName: "test name",
    nickname: Math.random().toString(36).slice(2, 16),
    role: UserProto.UserRole.NORMAL,
    password: "123456"
  };

  const res1 = await createUser(reqDto);

  expect(res1.status).toBe(201);

  const reqDto2: AuthProto.LoginDto = {
    nickname: reqDto.nickname,
    password: reqDto.password
  };
  const { status, data } = await login(reqDto2);
  const result = <AuthProto.LoginAck>data.result;
  console.log(result);
});