import { useState } from 'react';
import { QuestionBoxHeading, QuestionBoxPara, BtnContainer } from '../index';
import { useQuestions } from "@/contexts";

export function Outro() {
  const { state } = useQuestions();
  const [submitted, setSubmitted] = useState(false);
  const [buttonClass, setButtonClass] = useState('');
  const { name } = state;

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
    const { name, school, email, phone, basics, intermediates, advanceds, zones} = state;
    const dataToSend = { name, school, email, phone, basics, intermediates, advanceds, zones} ;

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
      <QuestionBoxHeading>Gracias {name.split(" ")[0]}!</QuestionBoxHeading>
      <QuestionBoxPara>
        ¡Estás listo para recibir tutorías!
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

