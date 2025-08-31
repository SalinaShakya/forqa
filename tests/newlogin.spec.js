import {test} from '@playwright/test';
import { LoginPage } from '../page_objects/login.po';
const testData=require('../fixtures/loginFixture.json') //testdata constant keeps data
test.beforeEach(async({page})=>{//multiple cases no change base url call
    await page.goto('/');
})

test.describe('Valid login tests',()=>{
    test('Login using valid username and password',async ({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.validUser.userName,testData.validUser.password);
        // await login.login("qwerty","qwerty");
        await login.verifyValidLogin();

    });
 test('Login using Invalid username and password',async ({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.username,testData.invalidUser.password);
        // await login.login("qwerty","qwerty");
        await login.verifyInValidLogin();

    });
  
})

  test('Login using valid username and invalid password',async ({page})=>{
        const login=new LoginPage(page);
        await login.login("qwerty","qwerty");
        // await login.login(testData.invalidUser.username,testData)
        await login.verifyInValidLogin();

    });