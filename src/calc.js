export default class Calc {
    add(...args) {
        args.reduce((acc, elem) => acc + elem, 0)
    }
}