const { By } = require('selenium-webdriver');

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.welcomeMessage = By.id('welcomeMessage');
    }

    async getWelcomeMessage() {
        return await this.driver.findElement(this.welcomeMessage).getText();
    }
}

module.exports = HomePage;