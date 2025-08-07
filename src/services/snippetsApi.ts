import api from "./api";
import Snippet from "@/types/Snippet";

type markType = 'like' | 'dislike' | 'none';

type SnippetMarkResponseData = {
  data: {
    mark: markType;
  },
  message: string;
};

export const getSnippetsByPage = async (page: number): Promise<Snippet[]> => {
  const response = await api.get<{
    data: {
      data: Snippet[];
    };
  }>("/snippets?page=" + page + "&limit=5");
  return response.data.data.data;
};

export const getSnippetById = async (id: string): Promise<Snippet> => {
  const response = await api.get<{ data: Snippet }>("/snippets/" + id);
  return response.data.data;
};

export const setSnippetMark = async (id: string, mark: markType): Promise<markType> => {
  const response = await api.post<SnippetMarkResponseData>("/snippets/" + id + "/mark", { mark });
  return response.data.data.mark;
}