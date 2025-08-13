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

export const deleteQuestion = async (id: string): Promise<void> => {
  await api.delete("/questions/" + id);
};

export const addAnswer = async (content: string, questionId: string): Promise<Answer> => {
  const response = await api.post<{ data: Answer }>("/answers", { content: content, questionId: questionId});
  return response.data.data;
}

export const answerSetState = async (answerId: string, state: "correct" | "incorrect"): Promise<Answer> => {
  const response = await api.put<{ data: Answer }>("/answers/" + answerId + "/state/" + state);
  return response.data.data;
};