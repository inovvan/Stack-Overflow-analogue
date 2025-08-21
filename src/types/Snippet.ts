import User from "./User";
import Mark from "./Mark";
import Comment from "./Comment";

export type SnippetResponseType = {
  id: string;
  code: string;
  language: string;
  marks?: Mark[];
  user?: User;
  comments?: Comment[];
}

export type SnippetType = {
  id: string;
  code: string;
  language: string;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  user?: User;
  comments?: Comment[];
}

export function mapSnippet(
  snippet: SnippetResponseType,
  authUser: User | null
): SnippetType {
  const marks = snippet.marks || [];

  const likes = marks.filter((mark) => mark.type === "like").length;
  const dislikes = marks.filter((mark) => mark.type === "dislike").length;

  const liked = !!authUser && marks.some(
    (mark) => mark.type === "like" && mark.user.id === authUser.id
  );

  const disliked = !!authUser && marks.some(
    (mark) => mark.type === "dislike" && mark.user.id === authUser.id
  );

  return {
    id: snippet.id,
    code: snippet.code,
    language: snippet.language,
    likes,
    dislikes,
    liked,
    disliked,
    user: snippet.user,
    comments: snippet.comments,
  };
}