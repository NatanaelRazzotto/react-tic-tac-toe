// src/api/userService.ts
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

export async function createUser(user: Omit<User, "id">): Promise<number> {
  const response = await apiClient.post<number>("/users", user);
  return response.data;
}
