window.onbeforeunload = showloader;
function showloader(){
    $.isLoading({ text: "Cargando..." });    
}

var $apiDashboardUrl = "http://localhost:64412/apiV1/";

angular.module("app", ["chart.js"])
.config(['ChartJsProvider', function (ChartJsProvider) {
  ChartJsProvider.setOptions({
    colours: ['#FF5252', '#FF8A80'],
    responsive: true
  });              
}])
.service('getMovementsByYear',function getMovementsByYear($http,$q,$rootScope){
    var getMovementsByYear = this;

    getMovementsByYear.datasetData = {};

    getMovementsByYear.getData = function(query){
        var defer = $q.defer();
        $http({
            method : 'GET',
            url : $apiDashboardUrl + 'query?query=' + query,
            headers: { 'Accept':'application/json'}
        })
        .success(function(data, status) {
            if (data.REST_Service.Status_code == 1){
                var $_data = [];
                for (var item in data.Response[1].Result) {
                    var $mes = data.Response[1].Result[item].MES;
                    var $cantidad = data.Response[1].Result[item].CANTIDAD;
                    $_data.push ($cantidad);
                }
                getMovementsByYear.datasetData = $_data;
                defer.resolve($_data);
            }
        })
        .error(function(data, status) {
            defer.reject(data);
        });
        return defer.promise;
    }
    return getMovementsByYear;
})