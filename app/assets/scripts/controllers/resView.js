zwei.controller('ResViewController', ['$scope', 'DatLoader', function($scope, DatLoader) {
    // レス一覧
    $scope.resList = [];
    DatLoader.open('assets/data/test.dat', function(err, resList) {
        $scope.resList = resList;
        $scope.$apply();
    });
}]);

zwei.directive('resView', [function() {
    return {
        restrict: 'E',
        templateUrl: 'assets/views/res-view.html'
    }
}]);

zwei.filter('unsafe', ['$sce', function($sce) {
    return $sce.trustAsHtml;
}]);