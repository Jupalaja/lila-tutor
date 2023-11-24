import { useQuestions, useSharedStates } from "@/contexts";
import { useEffect } from "react";
import { isNotValidEmail } from "@/utils";


export function useHandleKeypress() {
  const { questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();

  const { now } = questionNum;
  const { state } = useQuestions();
  const { name, school, email, phone, basics, intermediates, advanceds, zones} = state;

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (now + 1 === 2 && name === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            name: "Por favor llena este campo",
          }));
          return;

        } else if (now + 1 === 3 && school === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            school: "Por favor selecciona una opción",
          }));
          return;
        
        } else if (now + 1 === 4 && email === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Por favor ingresa tu email",
          }));
          return;

        } else if (now + 1 === 4 && email && isNotValidEmail(email)) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Hmm... el Email no parece válido",
          }));
          return;

        } else if (now + 1 === 5 && phone === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            phone: "Por favor llena este campo",
          }));
          return;

        } else if (now + 1 === 6 && basics.length === 0) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            basics: "Por favor selecciona una opción",
          }));
          return;
        
        } else if (now + 1 === 7 && intermediates.length === 0) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            basics: "Por favor selecciona una opción",
          }));
          return;
        
        } else if (now + 1 === 8 && advanceds.length === 0) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            basics: "Por favor selecciona una opción",
          }));
          return;       
        }
        
        handleQuestionNumUpdate();
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, school, email, now, phone, basics, intermediates, advanceds ]);
}
