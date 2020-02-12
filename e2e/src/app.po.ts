import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(url: string) {
    return browser.get(url);
  }

  getElement(css: string) {
    return element(by.css(css));
  }

  getRouterUrl(url: string) {
    return
  }
}
