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
import { MATERIAS } from '@/constants';
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

  const chooseNum = 2 - basics.length;

  return (
    <>
      <QuestionNumHeading questionNum={7}>
        ¿Que materias puedes enseñar en nivel Básico
        [Primero a cuarto (1° - 4°)]? 
      </QuestionNumHeading>
      <QuestionBoxPara>
         Selecciona todas las materias que puedas enseñar
      </QuestionBoxPara>

      <DropdownSelect 
        className={classNames(
          styles["role-dropdown"],
          styles["basic-dropdown"],
          {
            [styles["remove-margin__top"]]: chooseNum !== 0,
          }
        )}
      >
        <div>
          {Object.keys(MATERIAS).map((basicKey) => {
            const _basic = MATERIAS[basicKey];
            const isSelected = basics.includes(_basic);

            return (
              <DropdownSelectOption
                key={basicKey}
                className={classNames(
                  styles["role-option"],
                  styles["basic-option"],
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
                <span className={styles["basic"]}>{_basic}</span>
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
