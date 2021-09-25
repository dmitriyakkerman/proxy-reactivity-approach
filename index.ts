import {EffectorObserverInterface} from "./interfaces/EffectorObserverInterface";

let activeEffect: Function | null;

function watchEffect(fn: Function): void {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

class EffectObserver implements EffectorObserverInterface {
    effects: Array<Function>;

    constructor() {
        this.effects = [];
    }

    public addEffect(fn: Function): void {
        this.effects.push(fn);
    }

    public notify(): void {
        this.effects.forEach(effect => effect())
    }
}

function reactive(obj: Object): Object {
    Object.keys(obj).forEach(key => {
        let observer = new EffectObserver();

        obj = new Proxy(obj, {
            get(target, prop): any {
                if(activeEffect) {
                    observer.addEffect(activeEffect);
                }

                return target[prop as keyof typeof target];
            },
            set(target, prop, newValue) {
                target[prop as keyof typeof target] = newValue;
                observer.notify();

                return true;
            }
        });

        return obj;
    });

    return obj;
}



