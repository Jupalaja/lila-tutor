import { useQuestions, useSharedStates } from "@/contexts";
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
import { COURSES } from '@/constants';
import { REMOVE_ADVANCED, SET_ADVANCEDS } from "@/reducers";

export function AdvancedInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.advanced ?? "";
  const { advanceds } = state;

  function handleDropdownOptionClick(_advanced: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.advanceds;
        return prevValue;
      });

    if (advanceds.includes(_advanced)) {
      dispatch({ type: REMOVE_ADVANCED, payload: _advanced });
    } else {
      dispatch({ type: SET_ADVANCEDS, payload: _advanced });

    }
  }
  
  return (
    <>
      <QuestionNumHeading questionNum={9}>
        ¿Qué materias puedes enseñar en nivel avanzado
        [Noveno a Doce (9° - 12°)]? 
      </QuestionNumHeading>
      <QuestionBoxPara>
         Selecciona todas las materias que puedas enseñar
      </QuestionBoxPara>

      <DropdownSelect 
        className={classNames(
          styles["first-dropdown"],
          styles["second-dropdown"]
        )}
      >
        <div>
          {Object.keys(COURSES).map((advancedKey) => {
            const _advanced = COURSES[advancedKey];
            const isSelected = advanceds.includes(_advanced);

            return (
              <DropdownSelectOption
                key={advancedKey}
                className={classNames(
                  styles["first-option"],
                  styles["second-option"],
                )}
                onClick={() => handleDropdownOptionClick(_advanced)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {advancedKey}
                </span>
                <span className={styles["first"]}>{_advanced}</span>
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
