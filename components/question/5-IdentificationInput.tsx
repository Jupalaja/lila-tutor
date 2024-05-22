import { SET_IDENTIFICATION } from '@/reducers';
import { ChangeEventHandler } from 'react';
import {
  BtnContainer,
  Error,
  QuestionNumHeading,
  QuestionInputNumber,
  QuestionBoxPara,
} from '../index';
import classNames from 'classnames';
import styles from './Question.module.css';
import Image from 'next/image';
import { useQuestions, useSharedStates } from '@/contexts';

export function IdentificationInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.identification ?? '';
  const { name, identification } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.identification;
        return prevValue;
      });

    dispatch({ type: SET_IDENTIFICATION, payload: event.target.value });
  };

  return (
    <>
      <QuestionNumHeading questionNum={4}>
        ¿Cuál es tu número de identificación, {name.split(' ')[0]}?
      </QuestionNumHeading>
      <QuestionBoxPara>
        Ingresa sólo números, sin comas ni puntos
      </QuestionBoxPara>
      <QuestionInputNumber
        placeholder="(Sin comas ni puntos)"
        value={identification}
        onChange={handleInputChange}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === '' && (
        <BtnContainer
          className={classNames(styles['btn-container'], styles['ok'])}
          showPressEnter={false}
          onClick={handleOkClick}
        >
          OK{' '}
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
