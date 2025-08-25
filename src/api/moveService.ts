import { CreateMoveDTO } from "../dto/createMoveDTO";
import apiClient from "./apiClient";

export async function createMove(gameMatch: Omit<CreateMoveDTO, "id">): Promise<any> {
  const response = await apiClient.post<string>("/move", gameMatch);
  return response.data;
}