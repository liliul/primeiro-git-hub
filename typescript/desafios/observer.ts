type fnObserver = () => void

class SubejectObserver {
    private observers: fnObserver[] = []

    subscribe(fn: fnObserver): void {
        this.observers.push(fn)
    }

    unSubscribe(fnToRemove: fnObserver): void {
        this.observers = this.observers.filter(fn => {
            if (fn != fnToRemove) {
                return fn
            }
        })
    }

    fire(): void {
        this.observers.forEach(fn => {
            return fn()
        })
    }
}

const subejectObserver = new SubejectObserver()

function observer1(): void {
    console.log('Observer 1...');
}

function observer2(): void {
    console.log('Observer 2...');
}

subejectObserver.subscribe(observer1)
subejectObserver.subscribe(observer2)

subejectObserver.unSubscribe(observer2)

subejectObserver.fire()