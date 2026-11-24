import { Shop } from '../models/shop';

export const MOCK_SHOPS: Shop[] = [
  {
    id: 1, name: 'Cartas del Sur', email: 'tienda@cartasdelsur.es', phone: '951 123 456',
    address: 'Calle Carretería 24', city: 'Málaga', openingHours: 'L-S 10:00-14:00 y 17:00-21:00',
  },
  {
    id: 2, name: 'Duelo Málaga', email: 'hola@duelomalaga.es', phone: '952 654 321',
    address: 'Avenida de Andalucía 12', city: 'Málaga', openingHours: 'L-V 17:00-21:30 · S 10:00-14:00',
  },
  {
    id: 3, name: 'La Guarida TCG', email: 'contacto@laguaridatcg.es', phone: '951 987 654',
    address: 'Calle Mármoles 8', city: 'Málaga', openingHours: 'L-S 11:00-21:00',
  },
];
