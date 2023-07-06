import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demos.devexpress.com/rwa/dxhotels/');
  await page.locator('div').filter({ hasText: 'Getting Started Today The DevExpress ASP.NET Subscription includes 110+ WebForm ' }).nth(1).click();
  await page.locator('#HeaderControl_Login_CD span').click();
  await expect(page.getByRole('img', { name: 'Captcha image' })).toBeVisible()
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I').click();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtEmail_I').fill('reginaldo@gmail.com');
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND').click();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_txtPassword_I').fill('Password');
  await page.getByRole('img', { name: 'Captcha image' }).click({
    button: 'right'
  });
  await page.getByRole('img', { name: 'Captcha image' }).click({
    button: 'right'
  });
  await page1.getByRole('img').click({
    button: 'right'
  });
  await page1.getByRole('img').click({
    button: 'right'
  });
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I').click();
  await page.locator('#HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I').fill('captcha');
  await page.locator('#HeaderControl_LogonControl_btnLoginNow_CD').click();
  await page.locator('#HeaderControl_LogonControl_btnLoginNow_CD span').click();
});