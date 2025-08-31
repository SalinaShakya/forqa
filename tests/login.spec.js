import { test, expect } from '@playwright/test';

test('valid_login',async({page})=>{
    await page.goto('https://www.facebook.com/');
    // await page.fill('input[name="username"]',"test_user")
    await page.getByPlaceholder('Email or phone number').fill('asdfghjk');
    await page.getByPlaceholder('Password').fill(afsha);
    // await page.getByName('login').click();
    await page.locator(['name=login']).click();
    await page.waitForTimeout(5000);
    await page.locator('Xpath=//input[@name="email"]')
});