export const questionsInitialState = {
  firstName: "",
  industry: "",
  role: "",
  goals: [],
  indermediates: [],
  advanceds: [],
  zones: [],
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
  indermediates: string[];
  advanceds: string[];
  zones: string[];
  days: string[];
  times: string[];
  phone: string;
  email: string;
  type: string;
};
