import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  
  await page.goto('https://demos.devexpress.com/rwa/dxhotels/');
  await expect(page.locator('span').filter({ hasText: 'SEARCH' })).toBeVisible();
  //await page.locator(getByLabel('Location')).click();
  //await page.getByLabel('Location').click();
  await page.click('label:has-text("Location")'); // Hacer clic en el elemento del formulario que muestra el menú desplegable
  const tall = await page.getByLabel('From label (for= attribute): label.dxflCaption_Metropolis.item-caption "Location"').allInnerTexts();
  console.log(tall)


 


/*

let city =[]
  let allcities=false;
  while(allcities===false){

    await page.press('body', 'ArrowDown'); // Presionar la tecla "abajo" para navegar por las opciones del menú


  }*/

  
// Opcional: Puedes repetir el paso anterior según el número de opciones hasta llegar a la opción deseada
// Puedes agregar varios `await page.press('body', 'ArrowDown');` según la cantidad de opciones


/*
await page.press('body', 'Enter'); // Presionar la tecla "Enter" para seleccionar la opción actualmente resaltada
  await page.getByLabel('Location').press('keyboard.down(key)');
  await page.click('label:has-text("Location")'); 
 // await page.getByLabel('From label (for= attribute): label.dxflCaption_Metropolis.item-caption "Location"').allInnerTexts);
  
  
  await page.getByLabel('Location').press('keyboard.down(key)');
  await page.getByLabel('Location').press('keyboard.down(key)');





  await page.waitForTimeout(1000);
*/





  const seleccionablelocator = '//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[1]'
  const Cities = await page.locator(seleccionablelocator).allInnerTexts();
      
  await console.log('estos son las ciudades seleccionables')
  await console.log(Cities)

  // Selector para la tabla dentro del dropdown
  const tableSelector = '#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_DDD_L_D';

  // Ubicar el mouse en el centro de la tabla
  await page.hover(tableSelector);

  // Realizar un scroll hacia abajo utilizando page.evaluate
  await page.evaluate((tableSelector) => {
    const table = document.querySelector(tableSelector);
    if (table) {     
      table.scrollTop = table.scrollHeight;      
    }
  }, tableSelector);
  await page.waitForTimeout(1000);

//------------------------------------------------------
await page.getByLabel('Location').click();
//await expect(page.getByLabel('Location')).not.toBeEmpty();
await page.waitForTimeout(1000);

const GranCities = await page.locator(seleccionablelocator).allInnerTexts();

// Selector para la tabla dentro del dropdown
const tableSelector2 = '#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_DDD_L_D';


  

let previousCitiesCount = GranCities.length;
console.log('numero de ciudades inicial: '+previousCitiesCount);
let newCitiesFound = true; 

// Ubicar el mouse en el centro de la tabla
//await page.hover(tableSelector2);

while (newCitiesFound = true){
  // Realizar un scroll hacia abajo utilizando page.evaluate
  await page.evaluate((tableSelector2) => {
    const table = document.querySelector(tableSelector2);
    if (table) {
      table.scrollTop = table.scrollHeight;
    }
  }, tableSelector);

  //await page.waitForSelector();

  const GranCitiestemp = await page.locator(seleccionablelocator)
    .allInnerTexts();
    console.log(GranCitiestemp)

    let cambiosRealizados = false;

  for (const element of GranCitiestemp) {
    if (!GranCities.includes(element)) {
      GranCities.push(element);
      newCitiesFound = true;

    }else {
      newCitiesFound = false;
  }
}
}



console.log('Estas son las ciudades seleccionables:');
console.log(GranCities);
//-------------------------------------------------
  



   //HOTELES
  //const actualhoteles = await page.locator('//div[@class=\'dxlbd\']//div//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[@class=\'dxeListBoxItem_Metropolis dxeFTM\']').allInnerTexts()
  
  //const actualhoteles = await page.locator('//table[contains(@id,\'MainContentPlaceHolder\')]//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[1]').all();
  
 //console.log('total de hoeles seleccionables: ',actualhoteles.length)
  //console.log('estos son los hotesles seleccionables')
  //console.log(actualhoteles)
 


  /*
      1) <input type="text" autocomplete="off" class="dxeEditAre…/> aka getByLabel('Location')
    2) <input type="text" value="4 Jul 2023" autocomplete="off…/> aka getByLabel('Check in')
    3) <input type="text" value="6 Jul 2023" autocomplete="off…/> aka getByLabel('Check out')
    4) <input value="1" type="text" autocomplete="off" class="…/> aka getByLabel('Rooms')
    5) <input value="1" type="text" autocomplete="off" class="…/> aka getByLabel('Adults')
    6) <input value="0" type="text" autocomplete="off" class="…/> aka getByLabel('Children')
  /*
  // Esperar 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));
    
  // Selecciona el ListBoxItem o el contenedor que contiene los elementos ListBoxItem
    const listBoxItemContainerSelector = '//div[@class=\'dxlbd\']//div//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[@class=\'dxeListBoxItem_Metropolis dxeFTM\']';

// Realiza el desplazamiento para hacer visible el contenedor de ListBoxItem
await page.evaluate((listBoxItemContainerSelector) => {
  const container = document.querySelector(listBoxItemContainerSelector);
  if (container) {
    container.scrollIntoView();
  }
}, listBoxItemContainerSelector);

// Espera un breve período de tiempo para asegurarse de que los elementos se hayan cargado completamente
await page.waitForTimeout(1000);

// Obtén la lista de elementos ListBoxItem
const listBoxItems = await page.$$eval(listBoxItemContainerSelector, (elements) =>
  elements.map((element) => element.textContent?.trim() ?? '')
);
console.log('esta es la lista del tollbox')
console.log(listBoxItems); // Muestra la lista de elementos ListBoxItem en la consola


/*
   // Obtén la lista de elementos ListBoxItem
   const listBoxItems = await page.$$eval(listBoxItemSelector, (elements) =>
   elements.map((element) => element.textContent?.trim() ?? '')
 );
  
    console.log(listBoxItems); // Muestra la lista de elementos ListBoxItem en la consola
  */


/*
  //HOTELES
  //const actualhoteles = await page.locator('//div[@class=\'dxlbd\']//div//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[@class=\'dxeListBoxItem_Metropolis dxeFTM\']').allInnerTexts()
  //const actualhoteles = await page.locator('//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[1]').allInnerTexts();
  const actualhoteles = await page.locator('//table[contains(@id,\'MainContentPlaceHolder\')]//tr[@class=\'dxeListBoxItemRow_Metropolis\']/td[1]').all();
  
  console.log('total de hoeles seleccionables: ',actualhoteles.length)
  console.log('estos son los hotesles seleccionables')
  console.log(actualhoteles)
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_B-1Img').scrollIntoViewIfNeeded();
  await new Promise((resolve) => setTimeout(resolve, 2000));
*/


  /*
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_B-1Img').click();
  await page.getByRole('cell', { name: 'Hamburg', exact: true }).click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_CheckInDateEdit_B-1Img').click();
  await page.getByRole('row', { name: '27 2 3 4 5 6 7 8', exact: true }).getByRole('cell', { name: '5' }).click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_CheckOutDateEdit_B-1Img').click();
  await page.getByRole('row', { name: 'Rooms v Adults - + Children - +' }).getByRole('img', { name: 'v' }).click();
  await page.getByRole('cell', { name: '3', exact: true }).click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_AdultsSpinEdit_B-4Img').click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_AdultsSpinEdit_B-4Img').click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_ChildrenSpinEdit_B-4Img').click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_ChildrenSpinEdit_B-4Img').click();
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_ChildrenSpinEdit_B-4Img').click();
  await page.locator('span').filter({ hasText: 'SEARCH' }).click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_OurRatingCheckBoxList_RB0_I_D').click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_OurRatingCheckBoxList_RB1_I_D').click();
  await page.getByText('$199', { exact: true }).dblclick();
  await page.getByText('$199', { exact: true }).dblclick();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD').click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD').click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD').click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_S').click();
  await page.getByText('DragDrag').click();
  await page.locator('span').filter({ hasText: 'APPLY' }).click();
  await page.locator('div').filter({ hasText: 'Contact Us Contact Us Login Login LOGIN FORM Show another code The submitted cod' }).first().click();
  */


});