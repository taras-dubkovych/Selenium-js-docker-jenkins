import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

class DriverSingleton {
    constructor() {
        if (!DriverSingleton.instance) {
            this.driver = null;  // Можна змінювати значення driver
            DriverSingleton.instance = this;
        }
        return DriverSingleton.instance;
    }

    getDriver(browser = 'chrome') {
        if (!this.driver) {
            const options = new chrome.Options();
            this.driver = new Builder().forBrowser(browser).setChromeOptions(options).build();
        }
        return this.driver;
    }

    async quitDriver() {
        if (this.driver) {
            await this.driver.quit();
            this.driver = null;
            DriverSingleton.instance = null;
        }
    }
}

const instance = new DriverSingleton();
// Object.freeze(instance);  // Вилучено заморожування

export default instance;