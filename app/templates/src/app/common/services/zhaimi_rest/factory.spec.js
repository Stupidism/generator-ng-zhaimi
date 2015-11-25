(function() {
  'use strict';

  describe('Service: zhaimiRest', zhaimiRestTest);

  function zhaimiRestTest() {

    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var zhaimiRest;
    beforeEach(inject(function(_zhaimiRest_) {
      zhaimiRest = _zhaimiRest_;
    }));

    it('should do something', function() {
      expect(!!zhaimiRest).toBe(true);
    });
  }
})();
