import { AppPage } from "./app.po";
import { browser } from "protractor";
import { AppRoute } from "../../src/app/app.route";

describe('Login page test', () => {
  let page: AppPage;
  const emailTest = 'test@mail.com';
  const passTest = 'testtest';

  beforeEach(() => {
    page = new AppPage();
  });

  it('sing in process', () => {
    page.navigateTo(`${AppRoute.LOGIN}`);
    page.getElement('input[type="email"]').sendKeys(emailTest);
    page.getElement('input[type="password"]').sendKeys(passTest);
    page.getElement('button[type="submit"]').click();
    expect(browser.getCurrentUrl()).toContain(`/${AppRoute.HOME}`);

    const checkToken = browser.executeScript('return window.localStorage.getItem("token");');
    expect(checkToken instanceof Object).toBeTruthy();
  });
});
