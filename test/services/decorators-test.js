chai.should();

describe('schemaFormDecorators', function() {
  beforeEach(module('schemaForm'));

  describe('#createDecorator', function() {
    it('should enable you to create new decorator directives',function(){
      module(function(schemaFormDecoratorsProvider){
        schemaFormDecoratorsProvider.createDecorator('foobar',{ 'foo':'/bar.html' },[angular.noop]);
      });

      inject(function($rootScope,$compile,$templateCache){
        var templateWithWrap,
          template,
          kids,
          grandkids;

        $templateCache.put('/bar.html','<div class="yes">YES</div>');

        //Since our directive does a replace we need a wrapper to actually check the content.
        templateWithWrap = angular.element('<div id="wrap"><foobar form="{ type: \'foo\'}"></foobar></div>');
        template         = templateWithWrap.children().eq(0);

        $compile(template)($rootScope);
        $rootScope.$apply();

        kids = templateWithWrap.children();
        kids.length.should.equal(1);
        kids.is('foobar').should.be.true;
        
        grandkids = kids.eq(0).children();
        grandkids.length.should.equal(1);
        grandkids.is('div').should.be.true;
        grandkids.hasClass('yes').should.be.true;
      });
    });
  });
});
