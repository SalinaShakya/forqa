const {expect}=require("@playwright/test")//expect for assertions
exports.LoginPage=class LoginPage{//login page class export so that can extract to other classes
    constructor(page){//constructor can be used in functions
        this.page=page;
        this.usernameInput='#email';//xapth locator to interact with elements #=css selector
        this.passwordInput='//input[@placeholder="Password"]'
        this.loginButton='//button[@id="submit"]'
        this.logOut='//button[@id="logout"]';
        this.loginValidation='//p[contains(text(),"Click on any contact to view the Contact Details")]'
        this.alertMessage='//span[@id="error"]';
    }
    async login(username,password){ //login function parameterized function
        // await this.page.locator(this.Eligibility).click();
        await this.page.waitForTimeout(2000);

        await this.page.locator(this.usernameInput).fill('salina@gmail.com');
        await this.page.locator(this.passwordInput).fill('salina123');
        await this.page.locator(this.loginButton).click();
    }
    async verifyValidLogin(){//test step cover check if its valid logon
        const LoginValidation=await this.page.locator(this.loginValidation);//
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LoginValidation).toHaveText('Click on any contact to view the Contact Details');
    }
      async verifyInValidLogin(){//test step cover check if its valid logon
        const LoginValidation=await this.page.locator(this.loginValidation);//
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LoginValidation).toHaveText('Click on any contact to view the Contact Details');
    }
    async verifyInvalidLogin(){
        const InvalidLogin=await this.page.locator(this.alertMessage);
        await expect(InvalidLogin).toHaveText('Incorrect username or password')
    }
}
