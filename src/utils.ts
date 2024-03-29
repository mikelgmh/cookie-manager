
export class Utils {
    public static encode(str) {
        return window.btoa(str);
    }
    public static decode(a) {
        return window.atob(a);
    }
    private static isHTML(str: string) {
        var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

        // test isHTML regex
        return str.match(isHTML);

    }
    public static wrapString(str: string, tag: string) {
        if (this.isHTML(str)) {
            return str;
        }
        return `<${tag}>${str}</${tag}>`;
    }

    public static deepEqual(x, y) {
        const ok = Object.keys, tx = typeof x, ty = typeof y;
        return x && y && tx === 'object' && tx === ty ? (
            ok(x).length === ok(y).length &&
            ok(x).every(key => this.deepEqual(x[key], y[key]))
        ) : (x === y);
    }

    public static compareObjects(a, b) {
        let s = (o) => Object.entries(o).sort().map(i => {
            if (i[1] instanceof Object) i[1] = s(i[1]);
            return i
        })
        return JSON.stringify(s(a)) === JSON.stringify(s(b))
    }

    public static objectEquals(obj1, obj2) {
        const JSONstringifyOrder = obj => {
            const keys = {};
            JSON.stringify(obj, (key, value) => {
                keys[key] = null;
                return value;
            });
            return JSON.stringify(obj, Object.keys(keys).sort());
        };
        return JSONstringifyOrder(obj1) === JSONstringifyOrder(obj2);
    }

    // @audit this is removing te callback functions. Watch out!
    public static prepareObjectsForComparison(obj1, obj2) {
        var A = JSON.parse(JSON.stringify(obj1));
        var B = JSON.parse(JSON.stringify(obj2));


        A.forEach(element => {
            element.checked = true;
        });
        B.forEach(element => {
            element.checked = true;
        });
        return { A, B }
    }

    public static mergeRecursively(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = this.mergeRecursively(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }
}