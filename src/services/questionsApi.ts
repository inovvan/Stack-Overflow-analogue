import api from "@/services/api";
import Question from "@/types/Question";
import Answer from "@/types/Answer";

type QuestionRequestData = {
  title: string;
  description: string;
  attachedCode: string;
};

export const getQuestionsByPage = async (page: number): Promise<Question[]> => {
  const response = await api.get<{
    data: {
      data: Question[];
    };
  }>("/questions?page=" + page + "&limit=7");
  return response.data.data.data;
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await api.get<{
    data: Question;
  }>("/questions/" + id);
  return response.data.data;
};

export const createQuestion = async (question: QuestionRequestData): Promise<Question> => {
  const response = await api.post<{ data: Question }>("/questions", question);
  return response.data.data;
};

export const changeQuestion = async (id: string, question: QuestionRequestData): Promise<Question> => {
  const response = await api.patch<{ data: Question }>("/questions/" + id, question);
  return response.data.data;
};