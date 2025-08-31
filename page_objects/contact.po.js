const {expect}=require("@playwright/test")
exports.ContactPage=class ContactPage{//use on tests
    constructor(page){//locator
        this.page=page;
        this.addContact='//button[@id="add-contact"]';//fill
        this.firstName='#firstName';
        this.lastName='#lastName';
        this.dob='//input[@placeholder="yyyy-MM-dd"]';
        this.email='//input[@id="email"]';
        this.phone='//input[@id="phone"]';
        this.address='//input[@placeholder="Address 1"]'
        this.city='//input[@placeholder="City"]'
        this.state='//input[@placeholder="State or Province"]'
        this.postal='//input[@placeholder="Postal Code"]'
        this.country='input[@placeholder="Country"]'
        this.Save='button[@id="submit"]';
        this.savedFirstName='//span[@id="firstName"]';
        this.savedLastName='//span[@id="lastName"]';
        this.deleteContact='//button[@id="delete"]';
        this.editContact='//button[@id="edit-contact"]';
    }


async contactAdd(firstName,lastName,dateOfBirth,email,phone,adress,city,state,postalCode){
    await this.page.fill(this.firstName,firstName);
    await this.page.fill(this.lastName,lastName);
    await this.page.locator(this.dob).fill(dateOfBirth);
    await this.paged.locator(this.email).fill(email);
    await this.paged.locator(this.phone).fill(phone);
    await this.paged.locator(this.address).fill(address);
    await this.paged.locator(this.city).fill(city);
    await this.paged.locator(this.state).fill(state);
    await this.paged.locator(this.postal).fill(postal);
    await this.paged.locator(this.country).fill(country);
    await this.page.click(this.Save);

};
async validateContactCreated(fName,lName,dob,email,phone,address,city,state,postal,country){
    //await this.paged.locator(this.viewCreatedContact).clikc();
    const fNameValidation=await this.page.locator(this.savedFirstName);
    const lNameValidation=await this.page.locator(this.savedLastName);
    const dobValidation=await this.page.locator(this.savedDOB);
    const emailValidation=await this.page.locator(this.savedEmail);
    const phoneValidation=await this.page.locator(this.savedPhone);
    const addressValidation=await this.page.locator(this.savedAddress);
    const CityValidation=await this.page.locator(this.savedCity);
    const stateValidation=await this.page.locator(this.savedState);
    const postalValidation=await this.page.locator(this.savedPostal);
    const countryValidation=await this.page.locator(this.savedCountry);
    await expect(fNameValidation).toHaveText(fName);
    await expect(lNameValidation).toHaveText(lName);
    await expect(dobValidation).toHaveText(dob);
    await expect(emailValidation).toHaveText(email);
    await expect(phoneValidation).toHaveText(phone);
    await expect(addressValidation).toHaveText(address);
    await expect(CityValidation).toHaveText(city);
    await expect(stateValidation).toHaveText(state);
    await expect([postalValidation]).toHaveText(postal);
    await expect(countryValidation).toHaveText(country);



}
async viewContact(){
    await this.page.locator(this.viewCreatedContact).click();
}
async contactEdit(firstName){
    await this.page.locator(this.editContact).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.firstName).clear();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.Save).click();
    
}
async contactDelete(){
    await this.page.waitForTimeout(2000);
    this.page.once('dialog',async dialog =>{
        console.log('dialog message:$(dialog.message()}');
        await dialog.accept();//dismiss() if you wnat to cancel instead
    });
    await this.page.locator(this.deleteContact).click();
}
}