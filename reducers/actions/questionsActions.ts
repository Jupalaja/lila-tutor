export const SET_FIRST_NAME = "SET_FIRST_NAME";
export const SET_INDUSTRY = "SET_INDUSTRY";
export const SET_ROLE = "SET_ROLE";
export const SET_GOALS = "SET_GOALS";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const SET_DAYS = "SET_DAYS";
export const REMOVE_DAY = "REMOVE_DAY";
export const SET_TIMES = "SET_TIMES";
export const REMOVE_TIME = "REMOVE_TIME";
export const SET_PHONE = "SET_PHONE";
export const SET_EMAIL = "SET_EMAIL";
export const SET_TYPE = "SET_TYPE";

export type QuestionsActionsType =
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_INDUSTRY"; payload: string; }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_GOALS"; payload: string }
  | { type: "REMOVE_GOAL"; payload: string }
  | { type: "SET_DAYS"; payload: string }
  | { type: "REMOVE_DAY"; payload: string }
  | { type: "SET_TIMES"; payload: string }
  | { type: "REMOVE_TIME"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_TYPE"; payload: string };
