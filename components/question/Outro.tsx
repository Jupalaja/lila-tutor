// ./components/question/Outro.tsx
import { useState } from 'react';
import { QuestionBoxHeading, QuestionBoxPara, BtnContainer } from '../index';
import { useQuestions } from "@/contexts";
//TODO:FIX import styles from './Outro.module.css'; // make sure to import the styles

export function Outro() {
  const { state } = useQuestions();
  const [submitted, setSubmitted] = useState(false);
  const [buttonClass, setButtonClass] = useState('');
  const [paraClass, setParaClass] = useState('');

  const postData = async (data: any) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response.ok;
    } catch (err) {
      console.error('Failed to send email', err);
      return false;
    }
  };

  const handleOnClick = async () => {
    const { name, school, email, phone, basics, intermediates, advanceds } = state;
    const dataToSend = { name, school, email, phone, basics, intermediates, advanceds} ;

    console.log('Sending Data:', dataToSend);
    const success = await postData(dataToSend);

    if (success) {
      setSubmitted(true);
      // setButtonClass(styles.successfulSubmission);
      // setParaClass(styles.showPara);
    }
  };

  return (
    <>
      <QuestionBoxHeading>Gracias!</QuestionBoxHeading>
      <QuestionBoxPara>
        Te contactaremos para continuar el proceso!
      </QuestionBoxPara>
      <BtnContainer
        showPressEnter={false}
        onClick={handleOnClick}
        className={buttonClass}
      >
        Enviar
      </BtnContainer>
    </>
  );
}

