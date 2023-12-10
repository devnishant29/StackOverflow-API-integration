const { Builder, By } = require('selenium-webdriver');

describe('test', function() {
  this.timeout(30000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('test', async function() {
    await driver.get("http://localhost:5173/");
    await driver.manage().window().setRect({ width: 1256, height: 773 });
    await driver.findElement(By.name("email")).sendKeys("nivish@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("123");
    await driver.findElement(By.linkText("Login")).click();
    await driver.findElement(By.name("email")).sendKeys("nivish@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("123");
    await driver.findElement(By.css(".btn-primary")).click();
    await driver.findElement(By.id("input")).click();
    await driver.findElement(By.id("input")).sendKeys("dart");
    await driver.findElement(By.css(".btn-secondary")).click();
    
    await driver.sleep(10000);

    // Find the link by its href attribute
    const stackOverflowLink = await driver.findElement(By.partialLinkText('1'));

    // // Scroll into view if necessary
    // await driver.executeScript("arguments[0].scrollIntoView();", stackOverflowLink);

    // Click the Stack Overflow link
    await stackOverflowLink.click();

    await driver.close();
  });
});
