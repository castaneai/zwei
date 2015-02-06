zwei.service('DatLoader', function() {

    function _parseDat(datText) {
        var result = [];
        datText.split('\n').forEach(function(resText, i) {
            if (resText == '') return;
            result.push(_parseRes(i + 1, resText));
        });
        return result;
    }

    function _parseRes(resNumber, resText) {
        var info = resText.split('<>');
        var info2 = info[2].split(' ');

        return {
            number: resNumber,
            datetime: info2[0] + info2[1],
            poster: {
                name: info[0],
                mail: info[1],
                id: info2[2],
            },
            // 書き込み内容は<br>改行のためHTMLタグを許可する
            body: info[3],
            title: info[4],
            anchors: _parseAnchors(info[3])
        }
    }

    function _parseAnchors(bodyText) {
        var result = [];
        var re = /&gt;&gt;(\d+)(-(\d+))?/g;
        var found;
        while (found = re.exec(bodyText)) {
            // >>1 の場合，found == [">>1", "1", undefined, undefined, ...] となる
            // >>1-2 の場合，found == [">>1-2", "1", "-2", "2", ...] となる
             result.push({
                 start: parseInt(found[1]),
                 end: typeof(found[3]) !== 'undefined' ? parseInt(found[3]) : null
             });
        }
        return result;
    }

    this.open = function(url, callback) {
        // 2chのdatはSJISなので overrideMimeType が必須
        // angular.jsの $http にはその機能がないため，直接XHRを使っている
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("text/plain; charset=shift_jis");
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                callback(true, null);
            }
            callback(null, _parseDat(xhr.responseText));
        };
        xhr.send();
    }
});
