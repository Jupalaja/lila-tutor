import { useQuestions, useSharedStates } from "@/contexts";
import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionNumHeading,
} from "../index";
import classNames from "classnames";
import styles from "./Question.module.css";
import Image from "next/image";
import { DAYS } from "@/constants";
import { REMOVE_DAY, SET_DAYS } from "@/reducers";

export function DayInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.days ?? "";
  const { firstName, days } = state;

  function handleDropdownOptionClick(_day: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.days;
        return prevValue;
      });

    if (days.includes(_day)) {
      dispatch({ type: REMOVE_DAY, payload: _day });
    } else {
      dispatch({ type: SET_DAYS, payload: _day });

    }
  }

  const chooseNum = 2 - days.length;

  return (
    <>
      <QuestionNumHeading questionNum={5}>
        ¿Que Días puede {firstName} tomar la clase?
      </QuestionNumHeading>

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
          {Object.keys(DAYS).map((dayKey) => {
            const _day = DAYS[dayKey];
            const isSelected = days.includes(_day);

            return (
              <DropdownSelectOption
                key={dayKey}
                className={classNames(
                  styles["role-option"],
                  styles["goal-option"],
                )}
                onClick={() => handleDropdownOptionClick(_day)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {dayKey}
                </span>
                <span className={styles["goal"]}>{_day}</span>
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
