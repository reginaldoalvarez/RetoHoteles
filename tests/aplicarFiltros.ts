//aplicarFiltros.ts


//const RB = {};
const OurRatingDeseado = Object.entries({ one: false, two: false, tree: true, four: true, five: true });


export async function FilterHotels(page: any) {
  // ... código de la función navigateAndFilterHotels ...


  //RANGO DE PRECIO -inicio
  const dragLocator = '#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD';//localizador del drag que se mueve de izquierda a derecha
  await page.locator(dragLocator).click();// clien en el Localizador
  const rangominimolocator = '#NightyRateTrackBarLabel_L'// Localizador de cantidad minima del Rango que se muestra
  const Rangoinicial = await page.locator(rangominimolocator).innerText(); //se guarda rangominimolocator
  console.log('Rango Inicial antes del Filtro: ', Rangoinicial)
  let rangeX = parseInt(Rangoinicial.slice(1)); //obtenemos valor numerico de rangominimolocator
  const valoresperadoInt = 200// rango minimo al que queremos llegar
  const ValorMoverMouse = valoresperadoInt - rangeX// cuanto se debe mover de izquierda a derecha

  
  await page.locator(dragLocator).click()
  while (rangeX < valoresperadoInt) {      
      await page.mouse.wheel(0, 1)   
      rangeX =await parseInt((await page.locator(rangominimolocator).innerText()).slice(1));
  }
  //RANGO DE PRECIO -fin


  //Our Rating:

  //await page.locator("//td[@class='dxichCellSys']//input[contains(@id,'Star1')]/parent::span/parent::span").click()//simulando unchecked

  //ESTRELLAS -inicio
  //Marcar con true las estrellas que desea y con false las que no desea para filtrar:  Object.entries({one: false, two: false, tree: true, four: true, five: true})
  const OurRatingDeseado = Object.entries({ one: false, two: false, tree: true, four: true, five: true })
  //para acceder por ejemplo, OurRatingDeseado[0][0] te dará la primera clave 'one' y OurRatingDeseado[0][1] te dará el primer valor false

  const Star = await OurRating(page)
  //console.log('estamos dentro del filtro: ',Star)
  const dtCheckBoxChecked = true
  const dtCheckBoxUnchecked = false

  //CAMBIO DEL CHECK SEGUN LO DESEADO
  for (let i = 0; i < OurRatingDeseado.length; i++) {
    const clickBoxLocator = "//td[@class='dxichCellSys']//input[contains(@id,'RB" + i + "')]/parent::span/parent::span";
    if (OurRatingDeseado[i][1] === dtCheckBoxUnchecked) {
      if (Star['Star' + i] === 'dtCheckBoxUnchecked') {
        await page.locator(clickBoxLocator).click();
        //console.log('Marcar check')
      } else {
        if (Star['Star' + i] === 'dtCheckBoxChecked') {
          await page.locator(clickBoxLocator).click();
          //console.log('Desmarcar check')
        }
      }

    }
    
  };



  //ESTRELLAS -fin

  
}export { OurRatingDeseado };

//Otener todo wl localizador del check

export async function OurRating(page: any) {
  const Star = {};
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

    Star['Star' + i] = subcadena;



  }
  return Star;
  //console.log('dentro de la funcion OurRating: ', Star)
}


