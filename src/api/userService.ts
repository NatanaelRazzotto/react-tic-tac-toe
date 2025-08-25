// src/api/userService.ts

import { CreateGameMatchDto } from "../dto/createGameMatchDto";
import { CreateMoveDTO } from "../dto/createMoveDTO";
import { UpdateGameMatchDto } from "../dto/updateGameMatchDto";
import { User } from "../models/user";
import apiClient from "./apiClient";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users");
  console.log(response)
  return response.data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}

export async function createUser(user: Omit<User, "id">): Promise<string> {
  const response = await apiClient.post<string>("/users", user);
  return response.data;
}

export async function updateUser(userId : string , user: Omit<User, "id">): Promise<string> {
  const response = await apiClient.put<string>("/users/" +userId, user);
  return response.data;
}

