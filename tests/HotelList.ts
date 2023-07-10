// HotelList.ts
export async function navigateAndCaptureHotels(page: any) {
  const LocatorEndPage = '.dxp-button:last-of-type';
  const LocatorDisableEndPage = '#MainContentPlaceHolder_HotelsDataView_PGB_PBN.dxp-disabledButton';
  const LocatorNextPage = 'img[alt="Next"]';
  const LocatorcurrentPage = '.dxp-num.dxp-current';

  await page.waitForLoadState('load');
  const dataview = await page.locator('#MainContentPlaceHolder_HotelsDataView_PGB').isVisible();
  console.log('maximo 3 hoteles en el resultados', dataview);
  let elementsCount;
  let temp;

  let Inicio = true;

  let currentPage = 1; // Variable para almacenar el número de página actual

  if (dataview === true) {
    await page.waitForLoadState('load');
    elementsCount = await page.locator(LocatorDisableEndPage).count();
    temp = elementsCount > 0;
    await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB');
  } else {
    if (Inicio === true) {
      temp = false;
    }
  }

  let hotelList: { hotelName: string; city: string; rating: string; price: string; currentPage: number; }[] = [];

  while (temp === false) {
    if (dataview === true) {
      await page.waitForSelector('#MainContentPlaceHolder_HotelsDataView_PGB');
      await page.waitForLoadState('load');
      currentPage = await page.locator(LocatorcurrentPage).textContent();
      console.log('Esta es la pagina donde esta: ', currentPage);
    }

    await page.waitForLoadState('load');
    const LocatorTableHotels = '#MainContentPlaceHolder_HotelsDataView_CCell tbody .dxdvItem_Metropolis';
    await page.waitForSelector(LocatorTableHotels);
    const hotels = await page.$$eval(LocatorTableHotels, (elements, page) => {
      const hotels: { hotelName: string; city: string; rating: string; price: string; currentPage: number; }[] = [];

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
          hotels.push({ hotelName, city, rating, price, currentPage: page });
        }
      }

      return hotels;
    }, currentPage);

    hotelList.push(...hotels);

    if (Inicio === true) {
      Inicio = false;
      temp = true;
    }

    if (dataview === true) {
      elementsCount = await page.locator(LocatorDisableEndPage).count();
      temp = elementsCount > 0;

      await page.waitForSelector(LocatorNextPage);
      await page.locator(LocatorNextPage).click();
      await page.waitForLoadState('load');
      await page.waitForTimeout(1000);
    }
  }

  return hotelList;
}
