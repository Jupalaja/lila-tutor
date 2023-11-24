import { useQuestions, useSharedStates } from "@/contexts";
import { getGoals } from "@/utils";
import { useMemo } from "react";
import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionNumHeading,
  QuestionBoxPara,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { MATERIAS } from '@/constants';
import { REMOVE_GOAL, SET_GOALS } from "@/reducers";

export function GoalInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.goals ?? "";
  const { role, goals } = state;

  function handleDropdownOptionClick(_goal: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.goals;
        return prevValue;
      });

    if (goals.includes(_goal)) {
      dispatch({ type: REMOVE_GOAL, payload: _goal });
    } else {
      dispatch({ type: SET_GOALS, payload: _goal });

    }
  }

  const chooseNum = 2 - goals.length;

  return (
    <>
      <QuestionNumHeading questionNum={7}>
        ¿Que materias puedes enseñar en nivel Básico
        <br/>Primero a Quinto (1° - 5°)? 
      </QuestionNumHeading>
      <QuestionBoxPara>
         Selecciona todas las materias que puedas enseñar
      </QuestionBoxPara>

      <DropdownSelect 
        className={classNames(
          styles["role-dropdown"],
          styles["goal-dropdown"],
          {
            [styles["remove-margin__top"]]: chooseNum !== 0,
          }
        )}
      >
        <div>
          {Object.keys(MATERIAS).map((goalKey) => {
            const _goal = MATERIAS[goalKey];
            const isSelected = goals.includes(_goal);

            return (
              <DropdownSelectOption
                key={goalKey}
                className={classNames(
                  styles["role-option"],
                  styles["goal-option"],
                )}
                onClick={() => handleDropdownOptionClick(_goal)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {goalKey}
                </span>
                <span className={styles["goal"]}>{_goal}</span>
              </DropdownSelectOption>
            );
          })}
        </div>
      </DropdownSelect>

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={false}
          onClick={handleOkClick}
        >
          OK{" "}
          <Image
            src="/check-small.svg"
            alt="check small"
            width={34}
            height={34}
          />
        </BtnContainer>
      )}
    </>
  );
}
