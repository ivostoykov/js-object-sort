const sortObject = (obj) => {
    if(!obj) {  return obj;  } // handle null and undefined (they have no constructors)

    var result;
    switch (obj.constructor) {
        case Array:
            obj = obj.sort();
            // get primitive values sorted
            result = obj.filter(el => ![Array, Object].includes(el.constructor)).sort();
            // get all Object or Array elements
            let arrEls = obj.filter(el => [Array, Object].includes(el.constructor));
            // sort each of the elements
            for (const k in arrEls) {
                result.push(sortObject(arrEls[k]));
            }

            break;
        case Object:
            obj = Object.fromEntries(Object.entries(obj).sort((a, b) => /^\d{1,}$/.test(a[0]) && /^\d{1,}$/.test(b[0]) ? parseInt(a[0], 10) - parseInt(b[0], 10) : a[0].localeCompare(b[0])));
            let objects = primitives = {};
            // split primitives from objects
            for (const [key, value] of Object.entries(obj)) {
                if(value && value.constructor && [Array, Object].includes(value.constructor)){
                    objects[key] = value;
                } else {
                    primitives[key] = value;
                }
            }

            // get primitive entries sorted
            result = Object.fromEntries(Object.entries(primitives).sort((a, b) => a[0].localeCompare(b[0])));
            // get all Object or Array elements sorted
            objects = Object.fromEntries(Object.entries(objects).sort((a, b) => /^\d{1,}$/.test(a[0]) && /^\d{1,}$/.test(b[0]) ? parseInt(a[0], 10) - parseInt(b[0], 10) : a[0].localeCompare(b[0])));
            for (const [key, value] of Object.entries(objects)) {
                result[key] = sortObject(value);
            }

            break;
        default:
            result = obj;
            break;
    }

    return result;
}

module.exports.sortObject = sortObject;
