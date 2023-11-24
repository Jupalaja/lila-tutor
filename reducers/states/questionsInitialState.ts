export const questionsInitialState = {
  firstName: "",
  industry: "",
  role: "",
  goals: [],
  intermediates: [],
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
  intermediates : string[];
  advanceds: string[];
  zones: string[];
  days: string[];
  times: string[];
  phone: string;
  email: string;
  type: string;
};
