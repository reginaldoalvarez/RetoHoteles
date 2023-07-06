import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://demos.devexpress.com/rwa/dxhotels/');
  await expect(page.locator('span').filter({ hasText: 'SEARCH' })).toBeVisible();

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
  await page.locator('span').filter({ hasText: 'SEARCH' }).click();
  await page.waitForLoadState('load');

  //RANGO DE PRECIO
  const dragLocator = '#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD';//localizador del drag que se mueve de izquierda a derecha
  await page.locator(dragLocator).click();// clien en el Localizador
  const rangominimolocator = '#NightyRateTrackBarLabel_L'// Localizador de cantidad minima del Rango que se muestra
  const Rangoinicial = await page.locator(rangominimolocator).innerText(); //se guarda rangominimolocator
  console.log(Rangoinicial)
  const rangeX = parseInt(Rangoinicial.slice(1)); //obtenemos valor numerico de rangominimolocator
  const valoresperadoInt = 200// rango minimo al que queremos llegar
  const ValorMoverMouse = valoresperadoInt - rangeX// cuanto se debe mover de izquierda a derecha

  if (rangeX < valoresperadoInt) {
    await page.locator(dragLocator).click();
    for (let i = 0; i < ValorMoverMouse; i++) {
      await page.mouse.wheel(0, 1)  //mover el localizador la distancia (puntos) calculados, punto a punto
    }
  }



  //Our Rating:

  //await page.locator("//td[@class='dxichCellSys']//input[contains(@id,'RB1')]/parent::span/parent::span").click()//simulando unchecked


  //Marcar con true las estrellas que desea y con false las que no desea para filtrar:  Object.entries({one: false, two: false, tree: true, four: true, five: true})
  const OurRatingDeseado = Object.entries({ one: false, two: false, tree: true, four: true, five: true })
  //para acceder por ejemplo, OurRatingDeseado[0][0] te dará la primera clave 'one' y OurRatingDeseado[0][1] te dará el primer valor false
  const RB = {};
  const dtCheckBoxChecked = true
  const dtCheckBoxUnchecked = false
  for (let i = 0; i < 5; i++) {
    const elemento = await page.locator("//td[@class='dxichCellSys']//input[contains(@id,'RB" + i + "')]/parent::span/parent::span");
    const localizadorCompleto = await elemento.evaluate((el) => {
      return el.outerHTML;
    });
    //console.log(localizadorCompleto)

    const inicio = localizadorCompleto.indexOf('dxWeb_') + 7; // Obtener el índice inicial
    const fin = localizadorCompleto.indexOf('_Metropolis', inicio); // Obtener el índice final
    const subcadena = localizadorCompleto.substring(inicio, fin); // Obtener la subcadena

    //console.log(subcadena); // Imprimir la subcadena

    RB['RB' + i] = subcadena;

  }
  console.log(RB)
  for (let i = 0; i < OurRatingDeseado.length; i++) {
    const clickBoxLocator = "//td[@class='dxichCellSys']//input[contains(@id,'RB" + i + "')]/parent::span/parent::span";
    if (OurRatingDeseado[i][1] === dtCheckBoxUnchecked) {
      if (RB['RB' + i] === 'dtCheckBoxUnchecked') {
        await page.locator(clickBoxLocator).click();
      } else {
        if (RB['RB' + i] === 'dtCheckBoxChecked') {
          await page.locator(clickBoxLocator).click();
        }
      }

    }
  };
  
  await page.locator('span').filter({ hasText: 'APPLY' }).click();
  await page. aqui fue








});