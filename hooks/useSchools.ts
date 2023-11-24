import { useEffect, useState } from "react";

export function useSchools() {
  const [schools, setSchools] = useState<string[]>([]);

  // const schoolResourceURL =
  //   "https://gist.githubusercontent.com/gxt-admin/758c1973293f54322c054bbd8119e80c/raw/7e819e47a60217130347743fd43ae91c3e3e1ede/schools.txt";

  useEffect(() => {
    setSchools([
      "Colegio Andino",
      "Colegio Los Nogales",
      "Colegio Helvetia",
      "Colegio Marymount",
      "Gimnasio Vermont",
      "Gimnasio Moderno",
      "Gimnasio Campestre",
      "Ginmasio La Montaña",
      "Gimnasio Nueva Modelia",
      "Colegio The English School",
      "Gimnasio El Hontanar",
      "Colegio Anglo Colombiano",
      "Home School",
      "Otro",
    ]);
    //   (async function () {
    //     try {
    //       const response = await fetch(schoolResourceURL);
    //       const data = await response.text();
    //       setSchools(data.split("\n"));
    //     } catch (e) {
    //       //
    //     }
    //   })();
  }, []);

  return { schools };
}
