import { By } from 'selenium-webdriver';

export default class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.name('username');
        this.passwordField = By.name('password');
        this.loginButton = By.id('loginButton');
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordField).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }
}