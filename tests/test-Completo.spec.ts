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

  const hotelToFind = cheapestHotel; // El hotel que deseas buscar

  const foundHotel = FilterHotelList.find(hotel => hotel.hotelName === hotelToFind.hotelName);
  
  if (foundHotel) {
    console.log('El hotel ha sido encontrado:', foundHotel);
  } else {
    console.log('El hotel no fue encontrado en FilterHotelList.');
  }

  const pageBook = foundHotel.currentPage
  const dataview = await page.locator('#MainContentPlaceHolder_HotelsDataView_PGB').isVisible();
  if (dataview === true) {
  const LocatorcurrentPage = '.dxp-num.dxp-current';//este localizador esta repetido en HotelList.ts
  const actual = await page.locator(LocatorcurrentPage).innerText()
  if (pageBook.toString() === actual){
    console.log('EN LA MISMA PAGINA')
    await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_ICell > table > tbody')
    //await page.getByRole('link', { name: foundHotel.hotelName }).click();
    //await page.getByRole('gridcell', { name: new RegExp(foundHotel.hotelName) }).getByText('Book It').click();
   // await page.locator(`[name*="${foundHotel.hotelName}"]`).sibling('span').withText('Book It').click();
   const locatorBookItHotel = "//a[contains(@class, 'dxeHyperlink_Metropolis hotel-title') and contains(text(), '"+foundHotel.hotelName+"')]/ancestor::div/following-sibling::div//span[contains(text(), 'Book It')]"
   await page.locator(locatorBookItHotel).click()

   await page.getByRole('cell', { name:new RegExp(foundHotel.hotelName)}).getByRole('button', { name: 'Book It' })
    //await page.getByRole('row', { name: 'First Prev 1 2 3 Next Last', exact: true }).getByText(pageBook.toString()).click()
    //hacer el click en Book It de es hotel en especifico foundHotel.hotelName
  }else{
    console.log('EN EL CAMBIO DE PAGINA')
    await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB')
    await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_ICell > table > tbody')
    const pageBookStr = foundHotel.currentPage.toString()
    await page.locator("//a[contains(@class, 'dxp-num') and contains(text(), '"+foundHotel.currentPage.toString()+"')]").click()
    //await page.getByText(pageBook.toString()).click()
    //await page.getByRole('link', { name: pageBook.toString() }).getByText(pageBook.toString()).click()
    //await page.getByRole('row', { name: new RegExp('First Prev')}).getByText(pageBook.toString()).click()
   // await page.getByRole('link', { name: pageBookStr, exact: true }).getByText(pageBookStr).click()
   await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_ICell > table > tbody')
   const locatorBookItHotel = "//a[contains(@class, 'dxeHyperlink_Metropolis hotel-title') and contains(text(), '"+foundHotel.hotelName+"')]/ancestor::div/following-sibling::div//span[contains(text(), 'Book It')]"
   await page.locator(locatorBookItHotel).click()
   

   
   
   await page.getByRole('cell', { name:new RegExp(foundHotel.hotelName)}).getByRole('button', { name: 'Book It' })

/* 

   1) [chromium] › test-Completo.spec.ts:9:5 › test ─────────────────────────────────────────────────

   Error: locator.click: Error: strict mode violation: getByText('Book It') resolved to 4 elements:
       1) <input type="submit" class="dxb-hb" value="Book It" id=…/> aka getByRole('cell', { name: 'The Grand Resort 5772 1st Street San Francisco, CA 94104, USA TYPE: Platinum LOCATION: AAA RATING: 5 $499.99 per night Book It Book It When opulance is your desire and when you only want the best in dining, shopping and guest room options, then choose the Grant Resort in downtown San Francisco. We cater to both the business and leisure traveller so please join us on your next visit.', exact: true }).getByRole('button', { name: 'Book It' })
       2) <span class="dx-vam">Book It</span> aka locator('#MainContentPlaceHolder_HotelsDataView_IT0_BookItButton_0_CD span')
       3) <input type="submit" class="dxb-hb" value="Book It" id=…/> aka getByRole('cell', { name: 'Golden Gate Hotel 6222 Bridge Rd San Francisco, CA 94102, USA TYPE: Diamond LOCATION: AA RATING: 4.5 $199.99 per night Book It Book It At the Golden Gate, we welcome you to the Golden State with open arms and strive to make your stay in San Francisco a memorable one. We wil do everything we can to make sure you have fun in the city and to earn your business year after year. Stay with us.', exact: true }).getByRole('button', { name: 'Book It' })
       4) <span class="dx-vam">Book It</span> aka locator('#MainContentPlaceHolder_HotelsDataView_IT1_BookItButton_1_CD span')

   =========================== logs ===========================
   waiting for getByText('Book It')
   ============================================================







   await page.getByText('Book It').click()
   

 */


   //await page.getByRole('gridcell', { name: new RegExp(foundHotel.hotelName) }).getByText('Book It', {exact: true}).click();

    //await page.getByRole('gridcell', { name:foundHotel.hotelName, exact:false}).getByText('Book It').click()
    //await page.getByRole('link', { name: foundHotel.hotelName }).click();
    //hacer click en pageBook
    //hacer el click en Book It de es hotel en especifico foundHotel.hotelName
  }
}







});