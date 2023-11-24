import { SET_PHONE } from "@/reducers";
import { ChangeEventHandler } from "react";
import {
  BtnContainer,
  Error,
  QuestionNumHeading,
  QuestionInputNumber
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { useQuestions, useSharedStates } from "@/contexts";

export function PhoneInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.phone ?? "";
  const { name, phone } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.phone;
        return prevValue;
      });

    dispatch({ type: SET_PHONE, payload: event.target.value });
  };

  return (
    <>
      <QuestionNumHeading questionNum={4}>
        ¿Cuál es tu número de teléfono, {name.split(" ")[0]}?  
      </QuestionNumHeading>

      <QuestionInputNumber
        placeholder="Teléfono..."
        value={phone}
        onChange={handleInputChange}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={true}
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
