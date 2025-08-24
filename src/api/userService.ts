// src/api/userService.ts
import { CreateGameMatchDto } from "../models/CreateGameMatchDto";
import { CreateMoveDTO } from "../models/createMoveDTO";
import { UpdateGameMatchDto } from "../models/updateGameMatchDto";
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

export async function createGameMatch(gameMatch: Omit<CreateGameMatchDto, "id">): Promise<any> {
  const response = await apiClient.post<string>("/gamematch", gameMatch);
  return response.data;
}

export async function endGameMatch(gameMatchId : string,updateGameMatchDto: Omit<UpdateGameMatchDto, "id">): Promise<any> {
  const response = await apiClient.put<string>("/gamematch/"+gameMatchId, updateGameMatchDto);
  return response.data;
}

export async function createMove(gameMatch: Omit<CreateMoveDTO, "id">): Promise<any> {
  const response = await apiClient.post<string>("/moves", gameMatch);
  return response.data;
}
