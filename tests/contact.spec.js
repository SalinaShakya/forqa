import { test } from '@playwright/test';
import { LoginPage } from '../page_objects/login.po.js'
import { ContactPage } from '../page_objects/contact.po.js';
const testData = require('../fixtures/loginFixture.json') //testdata constant keeps data
const contactTestData = require('../fixtures/contactFixture.json') //testdata constant keeps data
const { authenticateUser, createEntity } = require('../utils/helper.spec.js')

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto("/");
    await login.login(testData.validUser.userName, testData.validUser.password)
    await login.verifyValidLogin();

})
test.describe('Contact testcases', () => {
    test('Contact add test', async ({ page, request }) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName)
        await contact.viewContact();
        await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName)
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request })
        const id = await getEntity(accessToken, '/contacts', '200', { request })
        await deleteEntity(accessToken, '/contacts/${id}', { request });
        await validateEntity(accessToken, '/contacts/${id}', '404', { request });

    })
    test.only('Contact Edit test', async ({ page, request }) => {
        const Data = {
            "firstName": "John ",
            "lastName": "Doe",
            "dateOfBirth": "1993-132-02",
            "email": "john.doe@example.com",
            "phone": "123-456-7890",
            "address": "Nayabazar",
            "city": "Kathmandu",
            "state": "Bagmati",
            "postal": "12345",
            "country": "Nepal"

        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contact, lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.phone, contactTestData.contact.postal, contactTestData.contact.country);
    }
    );
    test('Contact Delete test', async ({ page, request }) => {
        const Data = {
            "firstName": "John ",
            "lastName": "Doe",
            "dateOfBirth": "1993-132-02",
            "email": "john.doe@example.com",
            "phone": "123-456-7890",
            "address": "Nayabazar",
            "city": "Kathmandu",
            "state": "Bagmati",
            "postal": "12345",
            "country": "Nepal"
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });
        pagereload();
        await contact.viewContact();
        await contact.contactDelete();
        await validateEntity(accessToken, '/contacts/${id}', '404', { request });
    });
})
test.afterEach(async ({ page }) => {
    await page.close();
})