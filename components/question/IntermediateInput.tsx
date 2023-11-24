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
import { REMOVE_INTERMEDIATE, SET_INTERMEDIATES } from "@/reducers";

export function IntermediateInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.intermediate ?? "";
  const { intermediates } = state;

  function handleDropdownOptionClick(_intermediate: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.intermediates;
        return prevValue;
      });

    if (intermediates.includes(_intermediate)) {
      dispatch({ type: REMOVE_INTERMEDIATE, payload: _intermediate });
    } else {
      dispatch({ type: SET_INTERMEDIATES, payload: _intermediate });

    }
  }

  const chooseNum = 2 - intermediates.length;

  return (
    <>
      <QuestionNumHeading questionNum={8}>
        ¿Que materias puedes enseñar en nivel Intermedio
        [Quinto a octavo (5° - 8°)]? 
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
          {Object.keys(MATERIAS).map((intermediateKey) => {
            const _intermediate = MATERIAS[intermediateKey];
            const isSelected = intermediates.includes(_intermediate);

            return (
              <DropdownSelectOption
                key={intermediateKey}
                className={classNames(
                  styles["role-option"],
                  styles["basic-option"],
                )}
                onClick={() => handleDropdownOptionClick(_intermediate)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {intermediateKey}
                </span>
                <span className={styles["basic"]}>{_intermediate}</span>
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
