export class Utils {
    public static isHTML(str: string) {
        var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

        // test isHTML regex
        return str.match(isHTML);

    }
    public static wrapString(str: string, tag: string) {
        return `<${tag}>${str}</${tag}>`;
    }
}