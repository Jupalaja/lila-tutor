import { useState } from 'react';
import { QuestionBoxHeading, QuestionBoxPara, BtnContainer } from '../index';
import { useQuestions } from '@/contexts';
import styles from './Question.module.css';
import { postData } from '@/utils';
import { useSharedStates } from '@/contexts';
import classNames from 'classnames';

export function Outro() {
  const { state, dispatch } = useQuestions();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { name } = state;
  const { setScrollEnabled } = useSharedStates();

  const handleOnClick = async () => {
    if (submitted) return;
    setSubmitting(true);

    const {
      name,
      school,
      email,
      phone,
      identification,
      basics,
      intermediates,
      advanceds,
      zones,
    } = state;
    const dataToSend = {
      name,
      school,
      email,
      phone,
      identification,
      basics,
      intermediates,
      advanceds,
      zones,
    };

    console.log(dataToSend);
    const success = await postData('/api/send-email', dataToSend);

    if (success) {
      setSubmitted(true);
      setSuccess(true);
      dispatch({ type: 'SET_COMPLETE' });
      setScrollEnabled(false);
    }

    setSubmitting(false);
  };

  return (
    <>
      <QuestionBoxHeading>Gracias {name.split(' ')[0]}</QuestionBoxHeading>
      <QuestionBoxPara>Estás listo para recibir tutorías</QuestionBoxPara>
      {success && (
        <QuestionBoxPara className={submitted ? styles.rendered : ''}>
          Completa tus horarios en{' '}
          <a href="https://app.cal.com" target="_blank">
            Cal.com
          </a>
        </QuestionBoxPara>
      )}
      <BtnContainer
        showPressEnter={false}
        onClick={handleOnClick}
        className={
          classNames(styles['btn-container'], styles['ok']) &&
          `${submitting || submitted ? styles.successfulSubmission : ''} ${
            submitting ? styles.btnLoading : ''
          }`
        }
      >
        {submitting ? 'Cargando...' : submitted ? 'Enviado' : 'Enviar'}
      </BtnContainer>
    </>
  );
}
