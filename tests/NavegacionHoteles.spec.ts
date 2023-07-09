import { test, expect } from '@playwright/test';

test('Navegacion por paginas', async ({ page }) => {
  const web = 'https://demos.devexpress.com/rwa/dxhotels/Results.aspx?location=4&checkin=7-8-2023&checkout=7-15-2023&rooms=3&adults=2&children=3&minprice=200&custrating=1&locrating=BBB&ourrating=3%2c4%2c5'
  await page.goto(web);
  await page.waitForTimeout(1000)

  /*//COMPROBAR SI EL NUMERO DE LA PAGINA SE ENCUENTRA RESALTADO
  const Locatorpageweb = '#MainContentPlaceHolder_HotelsDataView_PGB > b.dxp-num.dxp-current'
  //const pageweb = await page.locator(Locatorpageweb);
  const element = await page.$(Locatorpageweb);
  // Verificar el estilo del elemento
  const isHighlighted = await page.evaluate((el) => {
    if (!el) return false; // Verificar si el elemento es nulo y retornar falso
    const styles = getComputedStyle(el);
    // Verificar si el elemento tiene un borde o un color de fondo diferente para indicar resaltado
    return styles.border !== '' || styles.backgroundColor !== '';
  }, element);
  // Hacer una aserción para comprobar si el elemento está resaltado
  expect(isHighlighted).toBe(true);*/





  /* //OBETENER EL ELEMENTO DE NUMERO DE LAS PAGINAS
  const LocatorNumPage = '.dxp-num';
  const elements = await page.$$(LocatorNumPage);
  
  for (let element of elements) {
    const selector = await element.evaluate((el) => el.outerHTML);
    console.log(selector);
      
  } */

  const LocatorEndPage = '.dxp-button:last-of-type';
  const LocatorDisableEndPage = '#MainContentPlaceHolder_HotelsDataView_PGB_PBN.dxp-disabledButton';
  //const LocatorDisableEndPage = "b[class~='dxp-disabledButton']"; // p[class~="special"] busca dentro del atributo class el texto exacto de varios  ref:https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors
  const LocatorNextPage = 'img[alt="Next"]';

  await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB')

  let elementsCount = await page.locator(LocatorDisableEndPage).count();
  //console.log(elementsCount);
  let temp = elementsCount > 0;
  await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB');
  //console.log('Inicia temp:', temp);
  //console.log(temp);


  let hotelList: { hotelName: string; city: string; rating: string; price: string; }[] = [];
  

  while (temp === false) {
    //console.log('ciclo While')

    const LocatorTableHotels = '#MainContentPlaceHolder_HotelsDataView_CCell tbody .dxdvItem_Metropolis';
    const hotels = await page.$$eval(LocatorTableHotels, (elements) => {
      const hotels: { hotelName: string; city: string; rating: string; price: string; }[] = [];
  
      for (let element of elements) {
        const LocatorHotelName = ".hotel-title";
        const hotelNameElement = element.querySelector(LocatorHotelName);
        const LocatorHotelAddress = ".hotel-address";
        const cityElement = element.querySelector(LocatorHotelAddress);
        const LocatorHotelRating = '.hotel-stats div.stat:nth-child(3) span';
        const ratingElement = element.querySelector(LocatorHotelRating);
        const LocatorHotelPrice = ".price";
        const priceElement = element.querySelector(LocatorHotelPrice);

        if (hotelNameElement && cityElement && ratingElement) {
          const hotelName = hotelNameElement.textContent?.trim() || '';
          const city = cityElement.textContent?.trim() || '';
          const rating = ratingElement.textContent?.trim() || '';
          const price = priceElement?.textContent?.trim() || '';
          hotels.push({ hotelName, city, rating, price });
        }
      }

      return hotels;


    });
    hotelList.push(...hotels);

    //console.log('Hoteles encontrados en esta página:', hotels.length);
    //console.log('Hoteles encontrados en esta página:', hotels);



    elementsCount = await page.locator(LocatorDisableEndPage).count();
    //console.log('numero de elementos encontrados: ', elementsCount)
    temp = elementsCount > 0;

    //console.log('Encontro el elemento disable?: ', temp);

    await page.waitForSelector(LocatorNextPage);
    await page.locator(LocatorNextPage).click();
    await page.waitForTimeout(1000);
  }






  // console.log(hotelList);


  //Corregir la direccion
  const updatedHotelList = hotelList.map(hotel => ({
     ...hotel,
     city: hotel.city.split('\n')[1].trim()
   }));
   
   
   console.log('Hoteles encontrados en todas las  página:', updatedHotelList.length);
   console.log('Lsta completa: ',updatedHotelList)

  //console.log('Lsta completa: ', hotelList);


  // await page.close();

});
