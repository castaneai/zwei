function MainCtrl($scope, $sce) {

    $scope.resList = [];

    function openDat(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("text/plain; charset=shift_jis");
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            callback(xhr.responseText);
        }
        xhr.send();
    }

    openDat('test.dat', function(data) {
        var dat = new DatAnalyzer(data);
        for (var i = 0; i < dat.getResCount(); i++) {
            var res = dat.getRes(i + 1);
            $scope.resList[i] = {
                body: $sce.trustAsHtml(res.body)
            };
        }
        $scope.$apply();
    });
}