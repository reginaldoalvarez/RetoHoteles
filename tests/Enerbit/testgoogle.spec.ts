const { chromium } = require('playwright');

test('Iniciar sesión en Google', async () => {
  // Iniciar el navegador
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navegar a la página de inicio de sesión de Google
  await page.goto('https://accounts.google.com');

  // Ingresar el correo electrónico en el campo correspondiente
  await page.fill('input[type="email"]', 'tpruebas315@gmail.com');

  // Hacer clic en el botón "Siguiente" para continuar
  await page.click('button[type="submit"]');

  // Esperar a que aparezca el campo de contraseña
  await page.waitForSelector('input[type="password"]');

  // Ingresar la contraseña en el campo correspondiente
  await page.fill('input[type="password"]', 'regissj41');

  // Hacer clic en el botón "Siguiente" para iniciar sesión
  await page.click('button[type="submit"]');

  // Realizar otras acciones después de iniciar sesión

 
});