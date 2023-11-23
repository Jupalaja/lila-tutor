export const questionsInitialState = {
  firstName: "",
  industry: "",
  role: "",
  goals: [],
  days: [],
  times: [],
  phone: "",
  email: "",
  type: "",
};

export type QuestionsStateType = {
  firstName: string;
  industry: string;
  role: string;
  goals: string[];
  days: string[];
  times: string[];
  phone: string;
  email: string;
  type: string;
};
