function sortObject(object){
    var sortedObj = {},
    keys = Object.keys(object) || [];

    keys.sort(function(key1, key2){
        key1 = key1.toLowerCase(), key2 = key2.toLowerCase();
        if(key1 < key2) return -1;
        if(key1 > key2) return 1;
        return 0;
    });

    for(var index in keys){
        var key = keys[index];
        console.log(key + '; ' + JSON.stringify(object[key]));
        if(Array.isArray(object[key])){
            object[key] = object[key].sort();
            var tmp = [];
            for(var x in object[key]){
                if(typeof object[key][x] == 'object' || Array.isArray(object[key][x])){
                    tmp.push(sortObject(object[key][x]));
                } else  {
                    tmp.push(object[key][x])
                }
            }
            sortedObj[key] = tmp;
        } else if(typeof object[key] == 'object' && !(object[key] instanceof Array)){
            sortedObj[key] = sortObject(object[key]);
        } else {
            sortedObj[key] = object[key];
        }
    }

    return sortedObj;
  }