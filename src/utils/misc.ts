const changeCase = 
    (fn:any) => (str:string) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, fn).replace(/\s+/g, '');

export default {
    case: {
        camel: changeCase(
            (word:string, index:number) => index ? word.toUpperCase() : word.toLowerCase()
        ),
        kebab: changeCase(
            (word:string, index: number) => index ? '_' : '' + word.toLowerCase()
        ),
        pascal: changeCase( (word:string) => word.toUpperCase() )
    }
}