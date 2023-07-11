//ingresoDatos.ts
export async function dataIN(page: any) {
  // ... código de la función navigateAndFilterHotels ...
  let city: string; // Location
  let addcity = true;
  let allcities: { city: string; country: string; numHoteles: string }[] = [];
  let temp = 0
  //await page.click('label:has-text("Location")');
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_B-1').click();
  //await page.press('body', 'ArrowDown');
  const LocatorAllCities = '#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_DDD_L_LBT.dxeListBoxItemRow_Metropolis';
  await page.locator('LocatorAllCities')
  //await page.waitForSelector(LocatorAllCities);
  await page.waitForLoadState('load');

  while (addcity) {
    const tableElement = await page.$('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_DDD_L_LBT');
    const rows = await tableElement?.$$('tr.dxeListBoxItemRow_Metropolis');
    if (rows) {
      let newCitiesAdded = false; // Variable para verificar si se han agregado nuevas ciudades en el ciclo

      for (const row of rows) {
        const cityElement = await row.$('td.dxeFTM');
        const countryElement = await row.$('td.dxeTM');
        const numHotelesElement = await row.$('td.dxeLTM');

        const city = await cityElement?.innerText();
        const country = await countryElement?.innerText();
        const numHoteles = await numHotelesElement?.innerText();

        if (city && country && numHoteles) {
          if (!allcities.some(item => item.city === city)) {
            allcities.push({ city, country, numHoteles });
            newCitiesAdded = true; // Se ha agregado una nueva ciudad
          }
        }
      }

      if (!newCitiesAdded) {
        // No se encontraron nuevas ciudades, se sale del bucle

        if (temp > 1) {
          addcity = false;
        }
        temp++
      }
    }

    await page.press('body', 'PageDown');
    await page.locator('LocatorAllCities')
   // await page.waitForTimeout(1000); // Puedes ajustar el tiempo de espera según sea necesario
  }







  // Realizar scroll para cargar más contenido

  //const firstElement = await page.$('td.dxeFTM');

  // await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_DDD_L_D').hover();



  // Esperar un tiempo para que se carguen más países
  //await page.waitForTimeout(2000); // Puedes ajustar el tiempo de espera según sea necesario


  /* while (addcity) {
    await page.click('label:has-text("Location")');
    await page.press('body', 'ArrowDown');
    city = await page.getByLabel('location').inputValue();
    
    const numHoteles = await page.locator('your-locator-for-counting-hotels').count().then(count => count.toString());
  
    if (!allcities.some(item => item.city === city)) {
      allcities.push({ city, numHoteles });
      addcity = true;
    } else {
      addcity = false;
    }
  } */

  console.log('El total de Locaciones seleccionables son: ', allcities.length);
  console.log(allcities);


  const indiceAleatorio = Math.floor(Math.random() * allcities.length);
  //const campoAleatorio = allcities[indiceAleatorio];
  const randomCity = allcities[indiceAleatorio]

  const locacion = randomCity.city + ', ' + randomCity.country
  console.log('La locacion seleccionada es: ', locacion);
  //await page.click('label:has-text("Location")');
  await page.locator('label:has-text("Location")').clear()
  await page.locator('label:has-text("Location")').fill(locacion)
  await page.keyboard.press('Enter')


  //FECHAS
  const nombresMeses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fechacheckOut = new Date();

  const daysToAddCheckOut = 7; // Cantidad de días a sumar
  fechacheckOut.setDate(fechacheckOut.getDate() + daysToAddCheckOut);

  console.log('fecha del checkOut:');
  const checkOut = (fechacheckOut.getDate() + ' ' + nombresMeses[fechacheckOut.getMonth()] + ' ' + fechacheckOut.getFullYear());
  console.log(checkOut)

  const fechaCheckIn = new Date();

  const daysToAddCheckIn = 2; // Cantidad de días a sumar
  fechaCheckIn.setDate(fechaCheckIn.getDate() + daysToAddCheckIn);

  console.log('fecha del checkIn:');
  const checkIn = (fechaCheckIn.getDate() + ' ' + nombresMeses[fechaCheckIn.getMonth()] + ' ' + fechaCheckIn.getFullYear());
  console.log(checkIn)

  //"Check in"
  await page.click('label:has-text("Check in")');
  //await page.waitForTimeout(1000);
  //await page.locator('label:has-text("Check in")').clear()
  await page.locator('label:has-text("Check in")').fill(checkIn)
  await page.locator('label:has-text("Check out")').fill(checkOut)

  //"Rooms"-"Adults"-"Children"
  const Rooms = '3'
  const Adults = '2'
  const Children = '2'
  await page.locator('label:has-text("Rooms")').fill(Rooms)
  await page.locator('label:has-text("Adults")').fill(Adults)
  await page.locator('label:has-text("Children")').fill(Children)
}