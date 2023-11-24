export const SET_FIRST_NAME = "SET_FIRST_NAME";
export const SET_INDUSTRY = "SET_INDUSTRY";
export const SET_GOALS = "SET_GOALS";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const SET_PHONE = "SET_PHONE";
export const SET_EMAIL = "SET_EMAIL";
export const SET_INTERMEDIATES = "SET_INTERMEDIATES";
export const REMOVE_INTERMEDIATE = "REMOVE_INTERMEDIATE";
export const SET_ADVANCEDS = "SET_ADVANCEDS";
export const REMOVE_ADVANCED = "REMOVE_ADVANCED";
export const SET_ZONES = "SET_ZONES";
export const REMOVE_ZONE = "REMOVE_ZONE";
export const SET_TYPE = "SET_TYPE";

export type QuestionsActionsType =
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_INDUSTRY"; payload: string; }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_GOALS"; payload: string }
  | { type: "REMOVE_GOAL"; payload: string }  
  | { type: "SET_INTERMEDIATES"; payload: string }
  | { type: "REMOVE_INTERMEDIATE"; payload: string }
  | { type: "SET_ADVANCEDS"; payload: string }
  | { type: "REMOVE_ADVANCED"; payload: string }
  | { type: "SET_ZONES"; payload: string }
  | { type: "REMOVE_ZONE"; payload: string }
  | { type: "SET_TYPE"; payload: string };
