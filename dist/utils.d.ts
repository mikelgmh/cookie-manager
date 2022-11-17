export declare class Utils {
    static encode(str: any): string;
    static decode(a: any): string;
    static isHTML(str: string): RegExpMatchArray;
    static wrapString(str: string, tag: string): string;
    static deepEqual(x: any, y: any): any;
    static compareObjects(a: any, b: any): boolean;
    static objectEquals(obj1: any, obj2: any): boolean;
    static prepareObjectsForComparison(obj1: any, obj2: any): {
        A: any;
        B: any;
    };
    static mergeRecursively(obj1: any, obj2: any): any;
}
