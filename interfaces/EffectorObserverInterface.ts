export interface EffectorObserverInterface {
    effects: Array<Function>,
    addEffect: Function,
    notify: Function
}