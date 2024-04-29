const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/historial-form.feature');

let page;
let browser;

defineFeature(feature, test => {

  let username = "";
  let password = "";
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000/", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not logged in the site', ({given,when,then}) => {

    given('A not logged user', async () => {
        username = "pablo";
        password = "12345";
    });

    when('Press history', async () => {
      await page.goto("http://localhost:3000/getgamehistory", {
        waitUntil: "networkidle0",
      }).catch(() => {});
    });

    then('Redirected to login', async () => {
      await expect(page).toMatchElement('button[title="entrar"]');
    });
  },300000);


  test('The user is not registered in the site', ({given,when,then}) => {
    

    given('A unregistered user, fill the register', async () => {
      await page.goto("http://localhost:3000/sign-up", {
          waitUntil: "networkidle0",
      }).catch(() => {});
      //Registrar al user
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button[name="registrarsePage"]');
      await page.waitForNavigation({
          waitUntil: 'networkidle0'
      });
  });

    when('I fill the data in the form and press submit', async () => {
      await page.waitForSelector('[data-testid="historial-user"]', {
        visible: true,
      });
      await page.click('[data-testid="historial-user"]');
    });

    then('I see my history', async () => {
      await expect(page).toMatchElement('th', { text: 'Fecha'});
      await expect(page).toMatchElement('th', { text: 'Tiempo de partida'});
      await expect(page).toMatchElement('th', { text: 'Porcentaje de aciertos'});
      await expect(page).toMatchElement('th', { text: 'Número de preguntas'});
      await expect(page).toMatchElement('th', { text: 'Número de aciertos'});
      await expect(page).toMatchElement('th', { text: 'Número de fallos'});
    });
  },300000);

  afterAll(async ()=>{
    browser.close()
  })

});