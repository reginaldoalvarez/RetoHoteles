// helpers.ts
export async function navigateAndCaptureHotels(page: any) {
  const LocatorEndPage = '.dxp-button:last-of-type';
  const LocatorDisableEndPage = '#MainContentPlaceHolder_HotelsDataView_PGB_PBN.dxp-disabledButton';
  const LocatorNextPage = 'img[alt="Next"]';

  //await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB');
  await page.waitForLoadState('load')
  const dataview = await page.locator('#MainContentPlaceHolder_HotelsDataView_PGB').isVisible();
  console.log('maximo 3 hoteles en el resultados', dataview);
  let elementsCount;
  let temp;
  let Inicio = true

  if (dataview === true) {
    elementsCount = await page.locator(LocatorDisableEndPage).count();
    ////console.log(elementsCount);
    temp = elementsCount > 0;
    await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB');
  }
  else {
    if (Inicio === true) {
      temp = false
    }


  };
  //console.log('Inicia temp:', temp);
  //console.log(temp);


  let hotelList: { hotelName: string; city: string; rating: string; price: string; }[] = [];

  while (temp === false) {
    //console.log('Ciclo While');
    await page.waitForLoadState('load')
    const LocatorTableHotels = '#MainContentPlaceHolder_HotelsDataView_CCell tbody .dxdvItem_Metropolis';
   await page.waitForSelector(LocatorTableHotels)
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

     if (Inicio === true) {
       Inicio = false
       temp = true}

    // } else {
      //console.log('Hoteles encontrados en esta página:', hotels.length);
      //console.log('Hoteles encontrados en esta página:', hotels);
      if (dataview === true) {
        elementsCount = await page.locator(LocatorDisableEndPage).count();
        //console.log('Número de elementos encontrados:', elementsCount);
        temp = elementsCount > 0;

        //console.log('¿Encontró el elemento disable?:', temp);

        await page.waitForSelector(LocatorNextPage);
        await page.locator(LocatorNextPage).click();
        await page.waitForTimeout(1000);
     // }

    }


  }

  //console.log('Hoteles encontrados en todas las páginas:', hotelList.length);
  //console.log('Lista completa de hoteles:', hotelList);

  return hotelList;
}
