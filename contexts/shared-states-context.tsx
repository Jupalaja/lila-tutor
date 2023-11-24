/* eslint-disable @typescript-eslint/no-empty-function */
import { TOTAL_QUESTIONS } from "@/constants";
import { ObjectType, QuestionNumType, SharedStatesContextType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const SharedStatesContext = createContext<SharedStatesContextType>({
  questionNum: { prev: null, now: 0 },
  setQuestionNum: () => {},
  errorMsg: {},
  setErrorMsg: () => {},
  showSchoolsList: false,
  setShowSchoolsList: () => {},
  handleQuestionNumUpdate: () => {},
  handleOkClick: () => {},
});

type SharedStatesProviderType = {
  readonly children: ReactNode;
};

export function SharedStatesProvider({ children }: SharedStatesProviderType) {
  const [questionNum, setQuestionNum] = useState<QuestionNumType>({
    prev: null,
    now: 0,
  });

  const [errorMsg, setErrorMsg] = useState<ObjectType>({});
  const [showSchoolsList, setShowSchoolsList] = useState(false);

  function handleQuestionNumUpdate() {
    setQuestionNum((prevValue) =>
      prevValue.now + 1 >= TOTAL_QUESTIONS + 1
        ? { ...prevValue }
        : { prev: prevValue.now, now: prevValue.now + 1 }
    );
  }

  function handleOkClick() {
    document.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: "Enter",
      })
    );
  }

  const value = {
    questionNum,
    setQuestionNum,
    errorMsg,
    setErrorMsg,
    showSchoolsList,
    setShowSchoolsList,
    handleQuestionNumUpdate,
    handleOkClick,
  };

  return (
    <SharedStatesContext.Provider value={value}>
      {children}
    </SharedStatesContext.Provider>
  );
}

export function useSharedStates(): SharedStatesContextType {
  const context = useContext(SharedStatesContext);

  if (context) {
    return context;
  }

  throw new Error("useSharedStates must be use inside SharedStatesProvider");
}
