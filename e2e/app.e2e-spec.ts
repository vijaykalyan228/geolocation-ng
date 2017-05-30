import { GeolocationPage } from './app.po';
import {browser, element, by, protractor} from 'protractor';
var helpers = require('./helper');


describe('geolocation App', () => {
  let page: GeolocationPage;

  beforeEach(() => {
    page = new GeolocationPage();
  });

  it('should equal one to 1', () => {
    var one:number = 1;
    expect(one).toEqual(1);
  });

  it('should display title beginning Tracked Address', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('app works!');
    var title = element(by.id('addressStr'));
    // console.log(addressStr.getText());
    expect(title.getText()).toContain("Tracked Address");
  });

  it('should obtain address from geolocation api'), (done) => {
    page.navigateTo();

    var d = protractor.promise.defer();
    setTimeout(function(){
      console.log("timeout");
      d.fulfill('ok');
      done();
    },5000);
    var addressStr = element(by.binding('addressStr'));
    expect(addressStr.getText()).toContain("Panvel");
    // expect(d).toBe('ok');
  }

  it('should show null for addressStr if user denies Location Tracking'), (done) => {
    page.navigateTo();
    browser.executeScript(helpers.mockGeoLocationError(1));
    var addressStr = element(by.binding('addressStr'));
    expect(addressStr.getText()).toEqual("null");
  }
});
