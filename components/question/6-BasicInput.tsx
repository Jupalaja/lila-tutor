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
import { COURSES } from "@/constants";
import { REMOVE_BASIC, SET_BASICS } from "@/reducers";

export function BasicInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.basics ?? "";
  const { basics } = state;

  function handleDropdownOptionClick(_basic: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.basics;
        return prevValue;
      });

    if (basics.includes(_basic)) {
      dispatch({ type: REMOVE_BASIC, payload: _basic });
    } else {
      dispatch({ type: SET_BASICS, payload: _basic });
    }
  }

  return (
    <>
      <QuestionNumHeading questionNum={5}>
        ¿Qué materias puedes enseñar en nivel básico [Primero a cuarto (1° -
        4°)]?
      </QuestionNumHeading>
      <QuestionBoxPara>
        Deja este campo vacio si NO enseñarás materias de nivel básico
      </QuestionBoxPara>

      <DropdownSelect
        className={classNames(
          styles["first-dropdown"],
          styles["second-dropdown"]
        )}
      >
        <div>
          {Object.keys(COURSES).map((basicKey) => {
            const _basic = COURSES[basicKey];
            const isSelected = basics.includes(_basic);

            return (
              <DropdownSelectOption
                key={basicKey}
                className={classNames(
                  styles["first-option"],
                  styles["second-option"]
                )}
                onClick={() => handleDropdownOptionClick(_basic)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {basicKey}
                </span>
                <span className={styles["first"]}>{_basic}</span>
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
