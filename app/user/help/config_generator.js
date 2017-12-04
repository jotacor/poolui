'use strict';

app.controller('ConfigGeneratorCtrl', function($scope, $http) {


//angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

//.controller('ConfigGeneratorCtrl', function($scope) {


  $scope.xmr_config_micolabs = {
    "algo": "cryptonight",  // cryptonight (default) or cryptonight-lite
    "av": 0,                // algorithm variation, 0 auto select
    "background": false,    // true to run the miner in the background
    "colors": true,         // false to disable colored output    
    "cpu-affinity": null,   // set process affinity to CPU core(s), mask "0x3" for cores 0 and 1
    "cpu-priority": 0,   // set process priority (0 idle, 2 normal to 5 highest)
    "donate-level": 1,      // donate level, mininum 1%
    "log-file": null,       // log all output to a file, example: "c:/some/path/xmrig.log"
    "max-cpu-usage": 75,    // maximum CPU usage for automatic mode, usually limiting factor is CPU cache not this option.  
    "print-time": 60,       // print hashrate report every N seconds
    "retries": 5,           // number of times to retry before switch to backup server
    "retry-pause": 5,       // time to pause between retries
    "safe": false,          // true to safe adjust threads and av settings for current CPU
    "syslog": false,        // use system log for output messages
    "threads": null,        // number of miner threads
    "pools": [
        {
            "url": "",
            "user": "",
            "pass": "",
            "keepalive": true,
            "nicehash": false,              // send keepalived for prevent timeout (need pool support)
            "nicehash": false                  // enable nicehash/xmrig-proxy support
        }
    ]
  };


  $scope.example_attr = {
    'with_mail': false,
    'with_worker_id': false,
    'with_pool_address' : 'xmrpool.micolabs.com',
    'with_custom_wallet': '',
    'with_custom_worker': 'MiWorker',
    'with_custom_email': 'yo@micorreo.com',
    'with_custom_port': '5555',    
  }

  $scope.linkClicked = false;

  $scope.updateExample = function() {
    var attr = $scope.example_attr;
    var conf = $scope.xmr_config_micolabs['pools'][0];
    
    conf['user'] = attr['with_custom_wallet'];
    conf['url'] = attr['with_pool_address'] + ':' + attr['with_custom_port']; 

        
    if (attr['with_worker_id'])
      conf['pass'] = attr['with_custom_worker'];
    else
      conf['pass'] = 'x:';
    
    if (attr['with_mail'] && attr['with_worker_id'])
      conf['pass'] += ':';

    if (attr['with_mail'])
      conf['pass'] += attr['with_custom_email'];

    if (!attr['with_mail'] && !attr['with_worker_id']) { 
      conf['pass'] = 'x';
    }
    
    var href = 'data:text/plain;base64,' + window.btoa(angular.toJson($scope.xmr_config_micolabs));
    $('#config-file-down').attr('href',href).attr('download', 'config.json');
                
  }
		
  $scope.updateExample();

  $scope.generateWallet = function() {
   if (!$scope.linkClicked) {
     $scope.linkClicked = true;
     var url_api = "http://xmrpool.micolabs.com:8080/localapi/create_wallet" ;
     $http.get(url_api).then(function(response) {
       var data = response.data;
       $scope.example_attr['with_custom_wallet'] = data['address'];
       $scope.updateExample();
       var href = 'data:application/octet-stream;base64,' + data['pdf'];
       $('#monero-address-file').attr('href', href).attr('download', 'monero_address.pdf');
       $('#monero-address-file')[0].click();
     });
   }
  }

});
