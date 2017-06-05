import { GeolocationPage } from './app.po';
import {browser, element, by, protractor} from 'protractor';
var helpers = require('./helper');


describe('geolocation App', () => {
  let page: GeolocationPage;

  beforeEach(() => {
    page = new GeolocationPage();
    page.navigateTo();
  });

  it('should equal one to 1', () => {
    var one:number = 1;
    expect(one).toEqual(1);
  });

  it('should display title beginning Tracked Address', () => {
    // expect(page.getParagraphText()).toEqual('app works!');
    var title = element(by.id('addressStr'));
    // console.log(addressStr.getText());
    expect(title.getText()).toContain("Tracked Address");
  });

  it('should obtain address from geolocation api'), (done) => {
    // page.navigateTo();
    browser.executeScript(helpers.mockGeoLocationSuccess(9.978532,76.317620));
    var addressStr = element(by.binding('addressStr'));
    expect(addressStr.getText()).toContain("Panvel");
    // expect(d).toBe('ok');
  };

  it('should show null for addressStr if user denies Location Tracking'), (done) => {
    // page.navigateTo();
    browser.executeScript(helpers.mockGeoLocationError(1));
    var addressStr = element(by.binding('addressStr'));
    expect(addressStr.getText()).toEqual("null");
  };
});
