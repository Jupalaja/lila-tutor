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
import { ZONES } from '@/constants';
import { REMOVE_ZONE, SET_ZONES } from "@/reducers";

export function ZoneInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.zones ?? "";
  const { zones } = state;

  function handleDropdownOptionClick(_zone: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.zones;
        return prevValue;
      });

    if (zones.includes(_zone)) {
      dispatch({ type: REMOVE_ZONE, payload: _zone });
    } else {
      dispatch({ type: SET_ZONES, payload: _zone });

    }
  }

  return (
    <>
      <QuestionNumHeading questionNum={10}>
        ¿En qué zonas puedes dar clases presenciales?
      </QuestionNumHeading>
      <QuestionBoxPara>
        Deja este campo vacio si sólo puedes dar clases virtuales
      </QuestionBoxPara>

      <DropdownSelect 
        className={classNames(
          styles["first-dropdown"],
          styles["second-dropdown"]
        )}
      >
        <div>
          {Object.keys(ZONES).map((zoneKey) => {
            const _zone = ZONES[zoneKey];
            const isSelected = zones.includes(_zone);

            return (
              <DropdownSelectOption
                key={zoneKey}
                className={classNames(
                  styles["first-option"],
                  styles["second-option"],
                )}
                onClick={() => handleDropdownOptionClick(_zone)}
                isSelected={isSelected}
              >
                <span
                  className={classNames({
                    [styles["selected"]]: isSelected,
                  })}
                >
                  {zoneKey}
                </span>
                <span className={styles["first"]}>{_zone}</span>
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
