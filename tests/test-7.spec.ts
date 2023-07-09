import { test, expect } from '@playwright/test';

test('test7', async ({ page }) => {


  const hotelList: { hotelName: string; city: string; rating: string; price: string; }[] = await page.$$eval('#MainContentPlaceHolder_HotelsDataView_CCell tbody .dxdvItem_Metropolis', (elements) => {
    const hotels: { hotelName: string; city: string; rating: string; price: string; }[] = [];

    for (let element of elements) {
      const hotelNameElement = document.querySelectorAll('.hotel-common');
      const cityElement = element.querySelector('.hotel-address');

      //probar esto para seleccionar la primera linea de texto locator::first-line
      const ratingElement = element.querySelector('.hotel-rating');
      const priceElement = element.querySelector('.hotel-price');
/*
      const stats = document.querySelectorAll('.hotel-stats div.stat');
      for (let stat of stats) {
        if (stats.textContent.includes('RATING')) {
          const ratingElement = element.querySelector('span.dxeBase_Metropolis');
          if (ratingElement) {
            console.log(ratingElement.textContent.trim());
          } else {
            console.log('Elemento de calificación no encontrado');
          }
          break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
      }*/


      if (hotelNameElement && cityElement && ratingElement && priceElement) {
        const hotelName = hotelNameElement.textContent?.trim() || '';
        const city = cityElement.textContent?.trim() || '';
        const rating = ratingElement.textContent?.trim() || '';
        const price = priceElement.textContent?.trim() || '';

        hotels.push(
          {
            hotelName,
            city,
            rating,
            price
          }
        );
      }
    }

    return hotels;
  });

  console.log(hotelList);

  page.close();

});
