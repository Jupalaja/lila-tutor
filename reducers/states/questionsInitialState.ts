export const questionsInitialState = {
  name: "",
  school: "",
  role: "",
  basics: [],
  intermediates: [],
  advanceds: [],
  zones: [],
  days: [],
  times: [],
  phone: "",
  email: "",
  isComplete: false,
};

export type QuestionsStateType = {
  name: string;
  school: string;
  role: string; 
  basics: string[];    
  intermediates : string[];
  advanceds: string[];
  zones: string[];
  days: string[];
  times: string[];
  phone: string;
  email: string;
  isComplete: boolean;
};
