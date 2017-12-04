'use strict';

app.controller('DashboardCtrl', function($scope , $route, $mdDialog, $pageVisibility, dataService, timerService, addressService, minerService) {
	$scope.minerStats = {};
	
	$scope.updateCharts = function (){
		minerService.updateStats($scope.addrStats, function(minerStats){
			$scope.minerStats = minerStats;
		});
	}

	// Update miners everyime addrStats
	$scope.$parent.$watch('addrStats', function(newValue, oldValue) {
		$scope.updateCharts();
	});
	
	$scope.addAddress = function (){
		if ($scope.paymentAddress){
			addressService.trackAddress($scope.paymentAddress);
			$scope.paymentAddress = "";
		}
	};

	$scope.deleteAddress = function (key, ev){
		var confirm = $mdDialog.confirm()
		.title('Esconder las estadísticas en vivo?')
		.textContent('Tu puedes volver añadiendo tu dirección de monero otra vez')
		.ariaLabel('Para el seguimiento de pago de direcciones')
		.targetEvent(ev)
		.ok("Ok")
		.cancel("Cancelar");
		
		$mdDialog.show(confirm).then(function() {
			addressService.deleteAddress(key);
		}, function() {
			// cancel do nothing
		});
	}

	$scope.setAlarm = function(addr, bool){
		addressService.setAlarm(addr, bool);
	};

	$scope.viewPayments = function(ev, miner, addr){
		$mdDialog.show({
			locals: {
				miner: miner,
				addr: addr
			},
			controller: "MinerPaymentsCtrl",
			templateUrl: 'user/dashboard/minerpayments.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: !$scope.menuOpen
		})
		.then(function(answer) {
			$scope.status = 'Dijiste que la información era "' + answer + '".';
		}, function() {
			$scope.status = 'Cancelaste el cuadro de diálogo';
		});
	}

	// Recurring API calls and timer
	var loadData = function () {
		_.each($scope.poolList, function(pool_type) {
			dataService.getData("/pool/stats/"+pool_type, function(data){
				$scope.poolStats[pool_type] = data;
			});

			dataService.getData("/pool/blocks/"+pool_type, function(data){
				if (data.length > 0){
					$scope.lastBlock[pool_type] = data[0];
				} else {
					$scope.lastBlock[pool_type] = {
						ts: 0,
						hash: "",
						diff: 0,
						shares: 0,
						height: 0,
						valid: false,
						unlocked: false,
						pool_type: pool_type,
						value: 0
					}
				}
			});
		});

		// Call minerservice update
		$scope.updateCharts();
	};

	// No spawn xhr reqs in bg
	$pageVisibility.$on('pageFocused', function(){
		minerService.runService(true);
	});

	$pageVisibility.$on('pageBlurred', function(){
		minerService.runService(false);
	});

	// Register call with timer 
	timerService.register(loadData, $route.current.controller);
	loadData();
	
	$scope.$on("$routeChangeStart", function () {
		timerService.remove($route.current.controller);
	});
});