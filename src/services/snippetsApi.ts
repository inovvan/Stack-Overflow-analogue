import api from "./api";
import Snippet from "@/types/Snippet";

export const getSnippetsByPage = async (page: number): Promise<Snippet[]> => {
  const response = await api.get<{
    data: {
      data: Snippet[];
    };
  }>("/snippets?page=" + page + "&limit=5");
  return response.data.data.data;
};
