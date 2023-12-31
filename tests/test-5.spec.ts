import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const web = 'https://demos.devexpress.com/rwa/dxhotels/Results.aspx?location=4&checkin=7-8-2023&checkout=7-15-2023&rooms=3&adults=2&children=3&minprice=200&custrating=1&locrating=BBB&ourrating=3%2c4%2c5'
  await page.goto(web);
  await page.waitForTimeout(1000)




  //RANGO DE PRECIO
  const dragLocator = '#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD';//localizador del drag que se mueve de izquierda a derecha
  await page.locator(dragLocator).click();// clien en el Localizador
  const rangominimolocator = '#NightyRateTrackBarLabel_L'// Localizador de cantidad minima del Rango que se muestra
  const Rangoinicial = await page.locator(rangominimolocator).innerText(); //se guarda rangominimolocator
  console.log('Rango Inicial antes del Filtro: ', Rangoinicial)
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
  console.log('Estado de seleccion de las Estrellas de Rating: ', RB)
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

  await page.evaluate(() => {
    const items = document.querySelectorAll('td.MainContentPlaceHolder_HotelsDataView_CCell  div.hotel-common')
  })


  // Llamar a la función y obtener el resultado en FilterhotelList
  const FilterhotelList = await navigateAndFilterHotels(page);
  console.log('FilterhotelList:', FilterhotelList);

});