import { CreateGameMatchDto } from "../dto/createGameMatchDto";
import { UpdateGameMatchDto } from "../dto/updateGameMatchDto";
import apiClient from "./apiClient";

export async function createGameMatch(gameMatch: Omit<CreateGameMatchDto, "id">): Promise<any> {
  const response = await apiClient.post<string>("/gamematch", gameMatch);
  return response.data;
}

export async function endGameMatch(gameMatchId : string,updateGameMatchDto: Omit<UpdateGameMatchDto, "id">): Promise<any> {
  const response = await apiClient.put<string>("/gamematch/"+gameMatchId, updateGameMatchDto);
  return response.data;
}