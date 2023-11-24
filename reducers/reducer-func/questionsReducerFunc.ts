import {
  QuestionsActionsType,
  QuestionsStateType,
  SET_FIRST_NAME,
  SET_INDUSTRY,
  SET_GOALS,
  REMOVE_GOAL,
  SET_INTERMEDIATES,
  REMOVE_INTERMEDIATE,
  SET_ADVANCEDS,
  REMOVE_ADVANCED,
  SET_ZONES,
  REMOVE_ZONE,
  SET_PHONE,
  SET_EMAIL,
} from "../index";

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType
) {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };

    case SET_INDUSTRY:
      return { ...state, industry: action.payload };

    case SET_GOALS:
      return { ...state, goals: [...state.goals, action.payload] };

    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal !== action.payload),
      };

    case SET_PHONE:
      return { ...state, phone: action.payload };
        
    case SET_EMAIL:
      return { ...state, email: action.payload };

    
    case SET_INTERMEDIATES:
      return { ...state, intermediates: [...state.intermediates, action.payload] };

    case REMOVE_INTERMEDIATE:
      return {
        ...state,
        intermediates: state.intermediates.filter((intermediate) => intermediate !== action.payload),
      };

    case SET_ADVANCEDS:
      return { ...state, advanceds: [...state.advanceds, action.payload] };

    case REMOVE_ADVANCED:
      return {
        ...state,
        advanceds: state.advanceds.filter((advanced) => advanced !== action.payload),
      };

    case SET_ZONES:
      return { ...state, zones: [...state.zones, action.payload] };

    case REMOVE_ZONE:
      return {
        ...state,
        zones: state.zones.filter((zone) => zone !== action.payload),
      };

    default:
      return state;
  }
}
