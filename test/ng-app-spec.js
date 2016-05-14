/*
 ***************** Controller ngCtrl MOCKS *******************
 */

describe("Angular application Controller checks", function() {
    var $controller, $rootScope, $q, $httpBackend, scope;
    //controller module
    beforeEach(function() {
        module("myApp");

        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            $controller = $injector.get("$controller");
            scope = $rootScope.$new();
            $controller("ngCtrl", { $scope: scope });
            scope1 = jasmine.createSpyObj(scope, ["customerSubmit", "customerSubmit2", "customerSubmit3", "customerSubmit4"])
            scope1.customerSubmit("Lucky");
            scope1.customerSubmit2("Lucky1");

        });

    });
    describe("ngCtrl - Controller specs", function() {

        it("Checking Customer Name", function() {
            expect(scope.customerName).toBe("Mahipal");
        });

        it("Checking Customer Age", function() {
            expect(scope.customerAge).toBe("29");
        });

        it("Checking Customer Submit", function() {
            expect(scope1.customerSubmit).toHaveBeenCalled();
            expect(scope1.customerSubmit).toHaveBeenCalledWith("Lucky");
            expect(scope1.customerSubmit2).toHaveBeenCalledWith("Lucky1");
        });
    });

});

/*
 ***************** factoryService MOCKS *******************
 */

describe("Angular factoryService mocks", function() {
    var $rootScope, scope, factoryService, getName, getNameVal;
    beforeEach(function() {
        module("myApp");
        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            factoryService = $injector.get("factoryService");

            setSpyObj = jasmine.createSpyObj(factoryService, ["setName_Factory", "getName_Factory"]);
            setSpyObj.setName_Factory("Mahipal");

            spyOn(factoryService, 'setName_Factory').and.callThrough();
            factoryService.setName_Factory(123);
            getNameThrough = factoryService.getName_Factory();

            /*spyOn(factoryService, 'getName_Factory').and.returnValue(55555);
            factoryService.setName_Factory("11111");			
            getNameReturnValue = factoryService.getName_Factory();
            */
            spyOn(factoryService, 'getName_Factory').and.callFake(function() {
                return 1000001;
            });
            factoryService.setName_Factory("get15424521");
            getNameCallFake = factoryService.getName_Factory();

        });

    });
    it("factory service setName", function() {
        expect(factoryService.setName_Factory).toHaveBeenCalled();
        expect(setSpyObj.setName_Factory).toHaveBeenCalled();

        //getName callThrough--- 
        expect(getNameThrough).toEqual(123);
        //getName callReturn--- 
        //expect(getNameReturnValue).toEqual(55555);	
        //getName callFake---
        expect(getNameCallFake).toBe(1000001);

        expect(setSpyObj.setName_Factory).toHaveBeenCalledWith("Mahipal");
    });


});


/*
 ***************** Service myAPP MOCKS *******************
 */

describe("service mocks for myAPP", function() {
    var $controller, service, $rootScope, scope, getServiceName;
    var getCallThrough, getCallFake, getCallReturn;
    beforeEach(function() {
        module("myApp");
        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            scope = $rootScope.$new();
            service = $injector.get("ng-services");

            spyOn(service, "setName_service").and.callThrough();
            service.setName_service({ name: "mahi", age: "33" });
            getCallThrough = service.getName_service();

            spyOn(service, "getName_service").and.callFake(function() {
                return [{ name: "mahi", age: "33" }];
            })
            service.setName_service({ name: "mahi22222", age: "332222" });
            getCallFake = service.getName_service();

        });
    });

    it("should check services method callThrough", function() {
        expect(service.setName_service).toHaveBeenCalled();
        expect(service.setName_service).toHaveBeenCalledWith(jasmine.any(Object));
        expect(getCallThrough).toEqual(jasmine.any(Object));
        expect(getCallThrough).toEqual({ name: "mahi", age: "33" });
    });

    it("should check services call Fake", function() {
        expect(service.getName_service).toHaveBeenCalled();
        expect(service.setName_service).toHaveBeenCalledWith(jasmine.any(Object));
        expect(getCallFake).toEqual(jasmine.any(Object));
        expect(getCallFake).toEqual([{ name: "mahi", age: "33" }]);
    });

});


/*
 ***************** DIRERCTIVE myAPP MOCKS *******************
*/
describe("Directive Mocks", function() {
    var $rootScope, scope, element, $compile;
    beforeEach(function() {
        module("myApp");
        inject(function($injector) {
            $rootScope = $injector.get("$rootScope");
            $compile = $injector.get("$compile");
            element = angular.element('<my-directive-div data="user"></my-directive-div>');

            scope = $rootScope.$new();
            scope.$apply(function(){
            	scope.user = {name : "Mahipal"}
            	$compile(element)(scope);

            });

        });
    });

    it("should verify username and age", function() { 
        expect(element[0].innerText).toEqual("Mahipal");
    })

});
 
describe('Testing my-directive', function() {
  var $rootScope, $compile, element, scope;

  beforeEach(function(){
    module('myApp');
    inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      element = angular.element('<my-profile data="user"></my-profile>');
      scope = $rootScope.$new();
      // wrap scope changes using $apply
      scope.$apply(function(){
        scope.user = { name: "John" };
        $compile(element)(scope);
      });
    });
  });

  it('Name should be rendered', function() {
    expect(element[0].innerText).toEqual('John');
  });
});


/*
 ***************** FILTER myAPP MOCKS *******************
*/

describe("Filter Mocks", function(){
	var $rootScope, scope, myFilter, $filter;

	beforeEach(function(){
		module("myApp");
		inject(function($injector){
			$rootScope = $injector.get("$rootScope");
			scope = $rootScope.$new();
			$filter = $injector.get("$filter");
		}) 
	});

	it("value should be Upper case", function(){
		expect($filter("myFilter")("Home")).toBe("HOME");

	});

});

 
/*
 ***************** Promise Object myAPP MOCKS *******************
*/
describe("promise object response", function(){
    var $rootScope, scope, $httpBackend, prmosieObj, filterService;
    var jsonObj = [{"name":"en"}, {"name":"es"}, {"name":"fr"}];

    beforeEach(function(){
        module("myApp");
        inject(function($injector){
            filterService = $injector.get("factory_promise");
            $rootScope = $injector.get("$rootScope");
            scope = $rootScope.$new();
            $httpBackend = $injector.get("$httpBackend");
            $httpBackend.whenGET("language.json").respond(jsonObj)
        });
    });

    it("Should check promise values", function(){
         var promiseFilterMethod = filterService.getLanguage();

         promiseFilterMethod.then(function(language){
            expect(language).toContain("en"); 
            expect(language).toContain("es"); 
            expect(language).toContain("fr"); 
 
         }).catch(function(e){
            console.log("err", e);
         })

         $httpBackend.flush();

    });   
});


/*
 ***************** BROADCAST IN CONTROLLER MOCKS *******************
*/

describe("BROADCAST AND LISTNER in CONTROLLER", function(){
    var $rootScope, $scope, brodcastService, $controller;
    var user = { name: "John", id: 1 };
    beforeEach(function(){
        module("myApp");
        inject(function($injector){
            $rootScope = $injector.get("$rootScope");
            brodcastService = $injector.get("brodcastService");
            $controller = $injector.get("$controller");
            $scope = $rootScope.$new();
        });
        spyOn($rootScope, "$broadcast").and.callThrough();
        spyOn($rootScope, "$on").and.callThrough();
    })
    it("should check the Listener", function(){
        $rootScope.$broadcast.and.stub();
        brodcastService.setBroadCast("Mahipal");
        expect($rootScope.$broadcast).toHaveBeenCalled();
        expect($rootScope.$broadcast).toHaveBeenCalledWith("global.broadcast", "Mahipal");

    });
    it("should trigger 'global.$on' listener", function() { 
            // trigger event
            $controller("ngCtrl", {$scope:$scope});
        brodcastService.setBroadCast(user);
        expect($rootScope.$on).toHaveBeenCalled();
        expect($rootScope.$on).toHaveBeenCalledWith('global.broadcast', jasmine.any(Function));
        //expect($scope.user).toEqual(user);
    }); 
});









