import { GeolocationPage } from './app.po';

describe('geolocation App', () => {
  let page: GeolocationPage;

  beforeEach(() => {
    page = new GeolocationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
