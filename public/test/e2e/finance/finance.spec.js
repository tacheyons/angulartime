describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('/');

    element(by.model('latitude')).sendKeys('0');
    element(by.model('longitude')).sendKeys('0');

    var greeting = element(by.id('place'));

    expect(greeting.getText()).toEqual('51.2190530 - 4.4044180');
  });

  

});
