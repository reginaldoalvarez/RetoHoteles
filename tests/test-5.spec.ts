import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const localizadorCompleto = '<input id="MainContentPlaceHolder_FilterFormLayout_OurRatingCheckBoxList_RB1_I" class="dxKBSI" name="ctl00$MainContentPlaceHolder$FilterFormLayout$OurRatingCheckBoxList$RB1" value="C" type="text" readonly="readonly" style="border-width:0;width:0;height:0;padding:0;margin:0;background-color:transparent;display:block;opacity:0;">'

  const RB1 = localizadorCompleto.split('_')
  console.log(RB1[2])



});