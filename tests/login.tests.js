import { By, until  } from 'selenium-webdriver';
import fs from 'fs';
import DriverSingleton from '../src/utils/driverSingleton.js';
import LoginPage from '../src/pages/loginPage.js';
import { expect } from 'chai';

export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

describe('Login Tests', function () {
    this.timeout(30000);
    let driver, loginPage;

    this.beforeEach(async function () {
        driver = await DriverSingleton.getDriver('chrome'); // Передаємо 'chrome' для запуску у Firefox
        
        await driver.get('https://www.saucedemo.com/');
    });

    // Основний тест
    it('should have the correct page title', async function () {
        const title = await driver.getTitle();  // Отримуємо заголовок сторінки
        expect(title).to.equal('Swag Labs');  // Перевіряємо заголовок
    });

    it('should display the correct heading', async function () {
        console.log("111111")
        loginPage = new LoginPage(driver);
        const rawData = fs.readFileSync('./data/usersData.json');
        const userData = JSON.parse(rawData);
        const validUser = userData.validUser[0];
        await loginPage.enterUsername(validUser.userName);
        await loginPage.enterPassword(validUser.password);
        await loginPage.clickLogin();
          // Отримуємо заголовок сторінки
        const expectedText = "Products"; // Замініть на ваше повідомлення
        const elementWithText = await driver.wait(
            until.elementLocated(By.xpath(`//span[contains(text(),'${expectedText}')]`)), 
            10000
        );
        await driver.wait(
            until.elementIsVisible(elementWithText), 
            10000
        );

        await sleep(3000);
        expect(await elementWithText.getText()).to.equal('Products');  // Перевіряємо заголовок
    });

    this.afterEach(async function () {
        await DriverSingleton.quitDriver();
    });
});