import { test, expect } from '@playwright/test';
import { navigateAndCaptureHotels } from './HotelList.ts';
import { dataIN } from './ingresoDatos.ts';
import { FilterHotels } from './aplicarFiltros.ts';

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



  //Corregir la direccion
  const HotelList = FilterhotelList.map(hotel => ({
     ...hotel,
     city: hotel.city.split('\n')[1].trim()
   }));
   
   
   console.log('Total Hoteles encontrados en todas las  página:', HotelList.length);
   console.log('Lsta completa: ',HotelList) 



//APLICAR FILTROS

await FilterHotels(page);

  await page.locator('span').filter({ hasText: 'APPLY' }).click();

  await page.evaluate(()=>{
    const items = document.querySelectorAll('td.MainContentPlaceHolder_HotelsDataView_CCell  div.hotel-common')
  })

  ///////CAPTURA DE HOTELES////
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




});