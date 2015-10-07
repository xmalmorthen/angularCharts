angular.module("app")
.controller("mainController", ['$scope', '$timeout', 'getMovementsByYear', function ($scope, $timeout, getMovementsByYear) {
    $scope.initGraphs = function(){
        $scope.withGraph = false;
        $scope.error = false;
        $scope.labels = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        $scope.series = [];
        $scope.data = [];
    }
        
    $scope.graph = function() {
        if (!isNaN($scope.year))
        {
            
            $.isLoading({ text: "Graficando" });
            $( "#load-overlay .demo p" ).removeClass("alert-success");           
            
            getMovementsByYear.getData("EXEC getPaymentsByMonthofYear " + $scope.year).then(
                function(res){
                    $scope.series.push("Año [ "+ $scope.year + " ]");
                    $scope.data.push(getMovementsByYear.datasetData);
                    $scope.withGraph = true;
                    
                    $.isLoading( "hide" );
                    $( "#load-overlay .demo p" ).html( "Content Loaded" ).addClass("alert-success"); 
                },
                function(err){
                    alert("Ocurrió un error al obenter la información, favor de intentarlo de nuevo");
                    $scope.error = true;
                    
                    $.isLoading( "hide" );
                    $( "#load-overlay .demo p" ).html( "Content Loaded" ).addClass("alert-success"); 
                }
            ) 
        } else {
            alert("Debe especificar el año a graficar");
        }
    };
    
    $scope.$on('create', function (event, chart) {
      //console.log(chart);
    });

    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };
    
    $scope.initGraphs();
    
}]);

