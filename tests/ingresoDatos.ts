//ingresoDatos.ts
export async function dataIN(page: any) {
    // ... código de la función navigateAndFilterHotels ...
    const allcities: string[] = [];// todas las location existentes en Dropdown
  let city: string;  //Location
  //Agregar nueva city
  let addcity = true;
  while (addcity === true) {
    await page.click('label:has-text("Location")');
    await page.press('body', 'ArrowDown');
    city = ((await page.getByLabel('location').inputValue()));

    if (!allcities.includes(city)) {
      allcities.push(city);
      addcity = true;
    } else {
      addcity = false;
    }


  }

  console.log('El total de Locaciones seleccionables son: ' + allcities.length);
  console.log(allcities);


  const indiceAleatorio = Math.floor(Math.random() * allcities.length);
  //const campoAleatorio = allcities[indiceAleatorio];
  console.log('La locacion seleccionada es: ' + allcities[indiceAleatorio]);

  //await page.click('label:has-text("Location")');
  await page.locator('label:has-text("Location")').clear()
  await page.locator('label:has-text("Location")').fill(allcities[indiceAleatorio])
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