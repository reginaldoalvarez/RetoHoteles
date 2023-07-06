import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_B-1Img').click();
  await page.getByRole('cell', { name: 'Las Vegas', exact: true }).click();
  await page.locator('span').filter({ hasText: 'SEARCH' }).click();
  await page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD').click();
  await page.getByText('APPLY APPLY').click();
});