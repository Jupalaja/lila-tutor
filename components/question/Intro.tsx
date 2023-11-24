import { useSharedStates } from "@/contexts";
import { BtnContainer, QuestionBoxHeading, QuestionBoxPara } from "../index";

export function Intro() {
  const { handleOkClick } = useSharedStates();

  return (
    <>
      <QuestionBoxHeading>Bienvenido a Sherpal</QuestionBoxHeading>
      <QuestionBoxPara>
        ¡Queremos conocerte mejor!
        <br />
        Este cuestionario no te tomará mas de 2 minutos
        <br />
      </QuestionBoxPara>
      <BtnContainer showPressEnter={true} onClick={handleOkClick}>
        Continuar
      </BtnContainer>
    </>
  );
}
