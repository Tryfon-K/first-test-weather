import { test, expect } from '@playwright/test';

test('Check highest and lowest temperatures in Brno', async ({ page }) => {

    let highTemp;
    let lowTemp;

    await page.goto('https://www.metoffice.gov.uk/');
    //wait for cookies panel to animate
    await page.waitForTimeout(1000);
    //click reject cookies if cookie dialog is visible
    if (await page.locator('id=ccc-reject-settings').isVisible())
        await page.locator('id=ccc-reject-settings').click();

    await expect(page).toHaveTitle(/Weather/);
    await page.locator('id=location-search-input').fill('Brno');
    //force true due to conflict
    await page.locator('text=Brno (Czech Republic)').click({ force: true });
    await expect(page).toHaveTitle(/Brno/);
    highTemp = await page.locator('xpath=/html/body/main/div[3]/div/section[2]/div/ul/li[1]/div/div[2]/div[1]/div/div[2]/span[1]').textContent();
    lowTemp = await page.locator('xpath=/html/body/main/div[3]/div/section[2]/div/ul/li[1]/div/div[2]/div[1]/div/div[2]/span[2]').textContent();
    console.log('Lowest temperature today: ' + lowTemp + ' and highest: ' + highTemp);

})