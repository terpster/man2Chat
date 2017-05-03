import { Man2ChatPage } from './app.po';

describe('man2-chat App', () => {
  let page: Man2ChatPage;

  beforeEach(() => {
    page = new Man2ChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
