var DatAnalyzer = (function () {
    function datAnalyzer(dat){
        this.raw_res = dat.split('\n');
        this.res = resAnalysis(this.raw_res);
        this.title = this.res[0].title;
    }
    
    datAnalyzer.prototype.getRes = getRes;
    datAnalyzer.prototype.getResComment = getResComment;
    datAnalyzer.prototype.getResCount = getResCount;
    
    function resAnalysis(raw_res){
        var res = [];
        for(var i = 0;i < raw_res.length;i++){
            var obj = {};
            var info = raw_res[i].split('<>');
            var info2 = info[2].split(' ');
            var anchor = {to:[], from:[]};
            obj.number = i+1;
            obj.name = info[0];
            obj.mail = info[1];
            obj.date = info2[0];
            obj.time = info2[1];
            obj.id = info2[2];
            obj.body = info[3];
            obj.title = info[4];
            obj.anchor = anchor;
            
            var tmp = obj.body.match(/&gt;&gt;([0-9]+)(-[0-9])?/g);
            if(tmp){
                for(var j = 0;j < tmp.length;j++){
                    var to = Number(tmp[j].match(/[0-9]+/)[0]);
                    anchor.to.push(res[to-1]);
                    if(res[to-1]){
                        res[to-1].anchor.from.push(obj);
                    }
                }
            }
            
            
            res.push(obj);
        }
        return res;
    }
    
    function getRes(index){
        return this.res[index-1];
    }
    
    function getResComment(index){
        if(!(this.res[index-1])) return null;
        var tmp = [];
        var anchor = this.getRes(index).anchor;
        for(var i = 0;i < anchor.from.length;i++){
            tmp.push(anchor.from[i]);
        }
        tmp.sort(function(a,b){
            if(a.number < b.number){
                return -1;
            }else if(a.number > b.number){
                return 1;
            }
            return 0;
        });
        return tmp;
    }

    function getResCount() {
        return this.res.length;
    }

    function eachAllRes(callback) {
        for (var i = 0; i < this.getResCount() ; i++) {
            callback(i, this.res[i]);
        }
    }

    return datAnalyzer;
})();