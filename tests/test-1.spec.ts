import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const hotelList: { hotelName: string; city: string; rating: string; price: string; }[] = [];

  // Ejemplo de valores
  const hotelName = 'Nombre del hotel';
  const city = 'Ciudad';
  const rating = 'Rating';
  const price = 'Precio';
  
  // Crear un objeto con la estructura requerida
  const hotel = {
    hotelName,
    city,
    rating,
    price
  };
  
  // Agregar el objeto al arreglo
  hotelList.push(hotel);

  console.log(hotelList)
  page.close
  
});