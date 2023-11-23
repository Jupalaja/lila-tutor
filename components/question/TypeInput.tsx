import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionBoxPara,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { useQuestions, useSharedStates } from "@/contexts";
import { TYPES } from "@/constants";
import { SET_TYPE } from "@/reducers";

export function TypeInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.type ?? "";
  const { firstName, type } = state;

  function handleDropdownOptionClick(_type: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.type;
        return prevValue;
      });

    if (_type === type) {
      dispatch({ type: SET_TYPE, payload: "" });
    } else {
      dispatch({ type: SET_TYPE, payload: _type });
      setTimeout(() => handleOkClick(), 600);
    }
  }

  return (
    <>
      <QuestionNumHeading questionNum={10}>
        ¿En qué zonas puedes enseñar, {firstName.split(" ")[0]}? *
      </QuestionNumHeading>

      <QuestionBoxPara>Selecciona todas zonas donde puedas dar clases presenciales</QuestionBoxPara>

      <DropdownSelect className={styles["role-dropdown"]}>
        <div>
          {Object.keys(TYPES).map((typeKey) => {
            const _type = TYPES[typeKey];

            return (
              <DropdownSelectOption
                key={typeKey}
                className={styles["role-option"]}
                onClick={() => handleDropdownOptionClick(_type)}
                isSelected={_type === type}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: _type === type,
                  })}
                >
                  {typeKey}
                </span>
                {_type}
              </DropdownSelectOption>
            );
          })}
        </div>
      </DropdownSelect>

      {errorMsg && <Error message={errorMsg} />}

      {type && errorMsg === "" && (
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
