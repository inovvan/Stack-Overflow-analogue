import HomeIcon from "@/assets/icons/home.svg";
import UserIcon from "@/assets/icons/user.svg";
import AddSnippetIcon from "@/assets/icons/add-snippet.svg";
import SnippetsIcon from "@/assets/icons/snippets.svg";
import QuestionsIcon from "@/assets/icons/questions.svg";
import AskQuestionIcon from "@/assets/icons/ask-question.svg";
import MyQuestionsIcon from "@/assets/icons/my-questions.svg";
import UsersIcon from "@/assets/icons/users.svg";
import React from "react";

type SidebarLinkProps = {
  to: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const links: SidebarLinkProps[] = [
  { to: "/home", label: "Home", Icon: HomeIcon },
  { to: "/my-profile", label: "My profile", Icon: UserIcon },
  { to: "/post-snippet", label: "Post snippet", Icon: AddSnippetIcon },
  { to: "/my-snippets", label: "My snippets", Icon: SnippetsIcon },
  { to: "/questions", label: "Questions", Icon: QuestionsIcon },
  { to: "/ask-question", label: "Ask question", Icon: AskQuestionIcon },
  { to: "/users", label: "Users", Icon: UsersIcon },
];

export default links;