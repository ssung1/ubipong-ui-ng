import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
  logging,
} from 'protractor';

export default class PageHelper {

  static defaultWait = 3000;

  static async click(selector: string, errorMessage: string) {
    const el = element(by.css(selector));

    try {
      await browser.await(ExpectedConditions.elementToBeClickable(el), 
        PageHelper.defaultWait);
      el.click();
    } catch (e) {
      if (errorMessage) {
        fail(errorMessage);
      } else {
        fail('cannot click ' + selector);
      }
    }
  }

  static async input(selector: string, text: string, errorMessage: string) {
    const el = element(by.css(selector));

    try {
      await browser.await(ExpectedConditions.elementToBeClickable(el), 
        PageHelper.defaultWait);
      el.sendKeys(text);
    } catch (e) {
      if (errorMessage) {
        fail(errorMessage);
      } else {
        fail('cannot type in ' + selector);
      }
    }
  }

  static async lookFor(selector: string, text: string, errorMessage: string) {
    const el = element(by.css(selector));

    try {
      await browser.await(ExpectedConditions.presenceOf(el), 
        PageHelper.defaultWait);
    } catch (e) {
      if (errorMessage) {
        fail(errorMessage);
      } else {
        fail('cannot find ' + selector);
      }
    }
  }

  static async verifyText(selector: string, text: string, errorMessage: string) {
    const el = element(by.css(selector));

    try {
      await browser.await(ExpectedConditions.textToBePresentInElement(el, text), 
        PageHelper.defaultWait);
      el.sendKeys(text);
    } catch (e) {
      if (errorMessage) {
        fail(errorMessage);
      } else {
        fail(`cannot find text in ${selector}: ${text}`);
      }
    }
  }
}
