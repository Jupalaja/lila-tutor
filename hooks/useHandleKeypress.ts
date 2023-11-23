import { useQuestions, useSharedStates } from "@/contexts";
import { useEffect } from "react";
import { isNotValidEmail } from "@/utils";


export function useHandleKeypress() {
  const { questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();

  const { now } = questionNum;
  const { state } = useQuestions();
  const { firstName, industry, role, goals, days, times, phone, email, type } = state;

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (now + 1 === 2 && firstName === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            firstName: "Por favor llena este campo",
          }));
          return;

        } else if (now + 1 === 3 && industry === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            industry: "Por favor selecciona una opción",
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


        // } else if (now + 1 === 4 && role === "") {
        //   setErrorMsg((prevValue) => ({
        //     ...prevValue,
        //     role: "Por favor selecciona una opción",
        //   }));
        //   return;

        } else if (now + 1 === 6 && goals.length === 0) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            goals: "Por favor selecciona una opción",
          }));
          return;

        } else if (now + 1 === 7 && type === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            type: "Por favor selecciona una opción",
          }));
          return;

        } else if (now + 1 === 8 && email === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Por favor llena este campo",
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
  }, [firstName, industry, days, times, phone, now, role, goals, email, type]);
}
