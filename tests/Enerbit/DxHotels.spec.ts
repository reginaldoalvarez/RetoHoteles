import { test, expect } from '@playwright/test';
const path = require('path');
const fs = require('fs');
//const { createWorker } = require('tesseract.js');//reconocimiento OCR para el texto del imagen
const Tesseract = require('tesseract.js');
const sharp = require('sharp');//manipulacion de imagenes









test('has title', async ({ page }) => {

 
  await page.goto('https://demos.devexpress.com/rwa/dxhotels/');

  await expect(page.locator('span').filter({ hasText: 'SEARCH' })).toBeVisible();
  await page.locator('#HeaderControl_Login_CD span').click();
  await expect(page.getByRole('img', { name: 'Captcha image' })).toBeVisible();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I').click();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I').fill('reginaldo@gmail.com');
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND').click();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I').fill('Password');

  const urlcaptcha = await page.getByRole('img', { name: 'Captcha image' }).getAttribute('src')
  console.log('Utlr del captcha: https://demos.devexpress.com'+urlcaptcha);
// Crear una nueva página
const page1 = await page.context().newPage();
  await page1.goto('https://demos.devexpress.com'+urlcaptcha);
 // Esperar a que se cargue la nueva página
 await page1.waitForLoadState('networkidle');

 // Obtener el elemento <img> en la nueva página
 const imgElement = await page1.waitForSelector('img[src="https://demos.devexpress.com'+urlcaptcha+'"]');

 // Modificar el estilo del elemento <img>
 await page1.evaluate((element) => {
   element.style['background-color'] = 'hsl(0, 0%, 0%)';
 }, imgElement);

 // Esperar a que se cargue la nueva página
 await page1.waitForLoadState('networkidle');

  // Obtener la ruta absoluta de la carpeta de prueba
  const testFolderPath = path.join(__dirname);
  console.log(testFolderPath);
/*
  // Crear la carpeta de prueba si no existe
  if (!fs.existsSync(testFolderPath)) {
    fs.mkdirSync(testFolderPath);
  }
  */
// Esperar 2 segundos
await new Promise((resolve) => setTimeout(resolve, 2000));

  // Capturar una captura de pantalla de la página
  const screenshotPath = path.join(testFolderPath, 'captura.png');
  console.log(screenshotPath)

  // Ruta de la captura de pantalla en formato JPG con fondo negro
  const screenshotPathJPG = path.join(testFolderPath, 'captura.jpg');
  
  await page1.screenshot({ path: screenshotPath });
 // Convertir la imagen PNG a JPG con fondo negro
 await sharp(screenshotPath).flatten({ background: '#000000' }).jpeg().toFile(screenshotPathJPG);

// Recortar la imagen hasta el siguiente cambio de color

const ImageRecortadaPath = testFolderPath+'/imagen_recortada.jpg';
console.log('Ruta de la imgaen recortada')
console.log(ImageRecortadaPath)
sharp(screenshotPathJPG)
  .trim()
  .toFile(ImageRecortadaPath, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Imagen recortada guardada con éxito');
    }
  });
  // Ruta de la captura de pantalla en formato JPG con fondo negro
  const ImageRecortadaPath3 = path.join(testFolderPath, 'negro.jpg');

  await sharp(ImageRecortadaPath).flatten({ background: '#000000' }).jpeg().toFile(ImageRecortadaPath3);

   // Realizar el reconocimiento OCR en la imagen local
   const { data: { text } } = await Tesseract.recognize(ImageRecortadaPath, 'eng');

   // Imprimir el texto extraído
   console.log('reconocimiento del texto es: ')
   console.log(text);







  /*
  (async () => {
    // Crear un worker de Tesseract.js
    const worker = createWorker();

    // Cargar el modelo de OCR
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  
    // Ruta de la imagen PNG
    const imagePath = '/ruta/de/la/imagen.png';
  
    // Reconocer el texto en la imagen
    const { data } = await worker.recognize(imagePath);
    const extractedText = data.text;
  
    // Imprimir el texto extraído
    console.log(extractedText);
  
    // Cerrar el worker de Tesseract.js
    await worker.terminate();
  })();
  */







 
/*
    // Utilizar la extensión para guardar la imagen
    await page1.evaluate(() => {
      // Aquí puedes llamar a las funciones proporcionadas por la extensión para guardar la imagen
      // Por ejemplo, puedes encontrar el elemento de imagen y hacer clic derecho para guardarla
      // O utilizar alguna función específica de la extensión para guardar la imagen
     
      // Ejemplo: Hacer clic derecho en la imagen y guardarla utilizando la extensión "Save Image As"
      const imageElement = document.querySelector(imageSelector);
      if (imageElement) {
        imageElement.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        // Asegúrate de utilizar la función proporcionada por la extensión para guardar la imagen
        // Puede variar según la extensión específica que estés utilizando
        //saveImageAs(imageElement);
      }
    });
    */
    


});
