import { useEffect, useState } from 'react';

export function useSchools() {
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    setSchools([
      'Colegio Andino',
      'Colegio La Colina',
      'Colegio Los Nogales',
      'Gimnasio Vermont',
      'Marymount School',
      'Colegio Anglo Colombiano',
      'Colegio Tandem',
      'Colegio Helvetia',
      'Institut le Rosey',
      'Home School',
      'Gimnasio Nueva Modelia',
      'Gimnasio El Hontanar',
      'Gimnasio Moderno',
      'Gimnasio La Montaña',
      'The English School',
      'Gimnasio Campestre',
      'Massey Vanier',
      'Colegio Nueva Granada',
      'Colegio Militar Antonio Nariño',
      'Buckingham School',
      'Colegio Tilatá',
      'Gimnasio Femenino',
      'Hacienda Los Alcaparros',
      'Colegio Santa Francisca Romana',
      'Colegio Clermont',
      'Colegio Cristobal Colón',
      'Colegio Americano de Bogotá',
      'Instituto Tecnológico de Occidente',
      'Colegio San Pedro Claver',
      'Colegio Reuven Feuerstein',
      'Colegio Panamericano',
      'Himalaya School',
      'Knightsbridge School',
      'Colegio Alemán Cali',
      'Colegio Alemán Barranquilla',
      'Colegio Alemán Medellín',
      'Liceo de Cervantes Norte',
      'Aspaen Iragua',
      'Colegio Catolico San José',
      'Colegio Italiano Leonardo Da Vinci',
      'Colegio Tierra Nueva',
      'Colegio Nuestra Señora de la Presentación',
      'Gimnasio de Los Cerros',
      'Colegio Las Margaritas',
      'Colegio Abraham Lincoln',
      'Otro',
    ]);
  }, []);

  return { schools };
}
