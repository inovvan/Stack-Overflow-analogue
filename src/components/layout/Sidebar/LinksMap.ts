import {
  HomeIcon,
  UserIcon,
  AddSnippetIcon,
  SnippetsIcon,
  QuestionsIcon,
  AskQuestionIcon,
  UsersIcon,
} from "@/assets/index";

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
