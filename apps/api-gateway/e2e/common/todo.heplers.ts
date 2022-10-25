import { base_uri } from "./index";
import { TodoProto } from "grpc-types/grpc-types";
import axios, { AxiosResponse } from "axios";
import { Response } from "interceptors/interceptors";
import { TodoCreateDto } from "../../src/modules/todo/dto";

const uri = base_uri + "todo/";

export const createTodo = (todoCreateDto: TodoCreateDto, token: string): Promise<AxiosResponse<Response<TodoProto.CreateAck>>> => {
  return axios.post(uri, todoCreateDto, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchTodos = (token: string): Promise<AxiosResponse<Response<TodoProto.FetchAck>>> => {
  return axios.get(uri, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};