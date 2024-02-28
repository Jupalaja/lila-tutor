import { useEffect, useState } from "react";

export function useSchools() {
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    setSchools([
      'Colegio Andino',
      'Liceo Campo David',
      'Colegio San Carlos',
      'Colegio Nueva Inglaterra',
      'Colegio Reuven Feuerstein',
      'Colegio San Jorge de Inglaterra',
      'Colegio Calatrava',
      'Colegio Colombo Británico',
      'Liceo Navarra',
      'Liceo de Colombia',
      'Colegio Cristiano Monte Hebron',
      'Colegio Los Nogales',
      'Colegio Helvetia',
      'Colegio Marymount',
      'Gimnasio Vermont',
      'Gimnasio Moderno',
      'Gimnasio Campestre',
      'Ginmasio La Montaña',
      'Gimnasio Nueva Modelia',
      'Colegio The English School',
      'Gimnasio El Hontanar',
      'Colegio Anglo Colombiano',
      'Home School',
      'Otro',
    ]);

  }, []);

  return { schools };
}
