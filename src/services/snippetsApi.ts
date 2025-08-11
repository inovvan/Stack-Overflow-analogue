import api from "./api";
import Snippet from "@/types/Snippet";
import Comment from "@/types/Comment";

type markType = 'like' | 'dislike' | 'none';

type SnippetMarkResponseData = {
  data: {
    mark: markType;
  },
  message: string;
};

type PostSnippet = {
  code: string,
  language: string
}

export const getSnippetsByPage = async (page: number): Promise<Snippet[]> => {
  const response = await api.get<{
    data: {
      data: Snippet[];
    };
  }>("/snippets?page=" + page + "&limit=5");
  return response.data.data.data;
};

export const getSnippetsByUserId = async (userId: string): Promise<Snippet[]> => {
    const response = await api.get<{
    data: {
      data: Snippet[];
    };
  }>("snippets?userId=" + userId);
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

export const createSnippet = async (snippet: PostSnippet): Promise<Snippet> => {
  const response = await api.post<{ data: Snippet }>("/snippets", snippet);
  return response.data.data;
};

export const changeSnippet = async (id: string, snippet: PostSnippet): Promise<Snippet> => {
  const response = await api.patch<{ data: Snippet }>("/snippets/" + id, snippet);
  return response.data.data;
};

export const addComment = async (content: string, snippetId: string): Promise<Comment> => {
  const response = await api.post<{ data: Comment }>("/comments", { content: content, snippetId: snippetId});
  return response.data.data;
}