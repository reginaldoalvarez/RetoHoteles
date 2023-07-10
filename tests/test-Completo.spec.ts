//test-Completo.epec.ts

import { test, expect } from '@playwright/test';
import { navigateAndCaptureHotels } from './HotelList.ts';
import { dataIN } from './ingresoDatos.ts';
import { FilterHotels, OurRating  } from './aplicarFiltros.ts';
import { OurRatingDeseado } from './aplicarFiltros.ts';

test('test', async ({ page }) => {

  await page.goto('https://demos.devexpress.com/rwa/dxhotels/');
  await expect(page.locator('span').filter({ hasText: 'SEARCH' })).toBeVisible();

  //////ENTRADA DE DATOS////////
  await dataIN(page);


  await page.locator('span').filter({ hasText: 'SEARCH' }).click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000)

  
  
///////CAPTURA DE HOTELES////
  const FilterhotelList = await navigateAndCaptureHotels(page);
  //console.log('numero Total de Hoteles : ',FilterhotelList.length)
  //console.log('FilterhotelList:', FilterhotelList);

  //Corregir la direccion ene el total de hoteles
  const HotelList = FilterhotelList.map(hotel => ({
     ...hotel,
     city: hotel.city.split('\n')[1].trim()
   }));
   
   
   console.log('Total Hoteles encontrados en todas las  página:', HotelList.length);
   console.log('Lsta completa: ',HotelList) 


   const Star = await OurRating(page)
   console.log('Impresion de los checks antes del filtro: ',Star)


   //ESCOGER EL HOTEL MAS ECONOMICO (superior a 200) CON ESTRELLAS SELECCIONADAS
   //hoteles con estrellas seleccionadas
   
   const filteredHotels = HotelList.filter(hotel => {
    const filteredByRating = OurRatingDeseado.some(([rating, isSelected]) => {
      if (isSelected) {
        const numericRating = parseFloat(hotel.rating);
        return numericRating.toString() === rating;
      }
      return true;
    });
  
    const price = parseFloat(hotel.price.replace('$', ''));
    return filteredByRating && price > 200;
  });
  
    
  
  console.log('------------filtered Hoteles: -------------------------------------')
  console.log('------------Calculo de Cantidad de Hoteles filtered Hoteles: ',filteredHotels.length)
  console.log('------------filtered Hoteles: ',filteredHotels)
  //Ordenar los hoteles por precio
  filteredHotels.sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    return priceA - priceB;
  });
  //seleccionar el primero que seria el mas economico
  const cheapestHotel = filteredHotels[0];
  console.log('Este es el hotel mas economico: ',cheapestHotel)

  
  

//APLICAR FILTROS

await FilterHotels(page);

const OurRatingCheck = await OurRating(page)
console.log('Impresion de los checks antes del filtro: ',OurRatingCheck)

  await page.locator('span').filter({ hasText: 'APPLY' }).click();

  await page.evaluate(()=>{
    const items = document.querySelectorAll('td.MainContentPlaceHolder_HotelsDataView_CCell  div.hotel-common')
  })

  ///////CAPTURA DE HOTELES FILTRADOS////
  const FilterEDhotelList = await navigateAndCaptureHotels(page);
  //console.log('numero de Hoteles fILtrados : ',FilterEDhotelList.length)
  //console.log('Estos son Los hoteles  filtrados: ', FilterEDhotelList);
   //Corregir la direccion
   const FilterHotelList = FilterEDhotelList.map(hotel => ({
    ...hotel,
    city: hotel.city.split('\n')[1].trim()
  }));
  console.log('numero de Hoteles despues de fILtrar : ',FilterHotelList.length)
  console.log('Estos son Los hoteles  filtrados: ', FilterHotelList);


  //RESERVAR EL HOTEL MAS ECONOMINCO >200 Y CON ESTRELLAS SELECCIONADAS







});