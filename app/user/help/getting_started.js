'use strict';

app.controller('GettingStartedCtrl', function($scope, $mdDialog, dataService) {
	$scope.portsList = {};
	$scope.selected = [];

	$scope.promise = dataService.getData("/pool/ports", function(data){
		$scope.portsList = data;
	});

	$scope.viewPorts = function(ev){
		$mdDialog.show({
			controller: "PortsModalCtrl",
			templateUrl: 'user/help/portsmodal.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.menuOpen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			$scope.status = 'Dijiste que la informacion era "' + answer + '".';
		}, function() {
			$scope.status = 'Cancelaste el cuadro de dialogo.';
		});
	}

	$scope.samples=[
	{
		type: 'Username',
		sample: '43To46Y9AxNFkY5rsMQaLwbRNaxLZVvc4LJZt7Cx9Dt23frL6aut2uC3PsMiwGY5C5fKLSn6sWyoxRQTK1dhdBpKAX8bsUW',
		desc: 'Dirección para retirar fondos a un monedero (CLI/GUI/MyMonero)',
		valid: true
	},
	{
		type: 'Username',
		sample: '43To46Y9AxNFkY5rsMQaLwbRNaxLZVvc4LJZt7Cx9Dt23frL6aut2uC3PsMiwGY5C5fKLSn6sWyoxRQTK1dhdBpKAX8bsUW+3500',
		desc: 'Dirección con dificultad fija de 3500 para el minero',
		valid: true
	},
	{
		type: 'Username',
		sample: ' 4DAU4uMdnDtFkY5rsMQaLwbRNaxLZVvc4LJZt7Cx9Dt23frL6aut2uC3PsMiwGY5C5fKLSn6sWyoxRQTK1dhdBpKF82nvn2H6jg9SUywAX',
		desc: 'Direccíon integrada, ideal para retirar fondos a un exchange como (Poloniex, Kraken, ...)',
		valid: true
	},
	{
		type: 'Username',
		sample: '43To46Y9AxNFkY5rsMQaLwbRNaxLZVvc4LJZt7Cx9Dt23frL6aut2uC3PsMiwGY5C5fKLSn6sWyoxRQTK1dhdBpKAX8bsUW.6FEBAC2C05EDABB16E451D824894CC48AE8B645A48BD4C4F21A1CC8624EB0E6F',
		desc: 'Direccíon con identificador de pago, ideal para retirar fondos a un exchange que no tenga un monedero integrado',
		valid: true
	},
	{
		type: 'Password',
		sample: 'Juan',
		desc: 'Identificador de minero Juan',
		valid: true
	},
	{
		type: 'Password',
		sample: 'Juan:test@e-mail.com',
		desc: 'Identificador de minero Juan, y registra una cuenta con email para notificaciones',
		valid: true
	},
	]

});