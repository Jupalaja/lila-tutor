import {
  QuestionsActionsType,
  QuestionsStateType,
  SET_FIRST_NAME,
  SET_INDUSTRY,
  SET_ROLE,
  SET_GOALS,
  REMOVE_GOAL,
  SET_DAYS,
  REMOVE_DAY,
  SET_TIMES,
  REMOVE_TIME,
  SET_PHONE,
  SET_EMAIL,
  SET_TYPE,
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

    case SET_ROLE:
      return { ...state, role: action.payload };

    case SET_GOALS:
      return { ...state, goals: [...state.goals, action.payload] };

    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal !== action.payload),
      };

    case SET_DAYS:
      return { ...state, days: [...state.days, action.payload] };

    case REMOVE_DAY:
      return {
        ...state,
        days: state.days.filter((day) => day !== action.payload),
      };

    case SET_TIMES:
      return { ...state, times: [...state.times, action.payload] };
    
    case REMOVE_TIME:
      return {
        ...state,
        times: state.times.filter((time) => time !== action.payload),
      };

    case SET_PHONE:
      return { ...state, phone: action.payload };
      
    case SET_EMAIL:
      return { ...state, email: action.payload };

    case SET_TYPE:
      return { ...state, type: action.payload };

    default:
      return state;
  }
}
