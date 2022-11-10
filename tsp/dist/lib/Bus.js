"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
class Bus {
    constructor(cityMap) {
        this.stops = [];
        this.passengers = 0;
        this.cityMap = cityMap;
        this.id = Bus.counter++;
    }
    addPassengers(stop, i) {
        this.passengers += i;
        if (this.passengers > Bus.CAPACITY)
            throw new RangeError(`This bus is beyond full: ${this.passengers} / ${Bus.CAPACITY}`);
        this.stops.push({
            passengers: i,
            stop
        });
    }
    availableCapacity() {
        return Bus.CAPACITY - this.passengers;
    }
    getTime() {
        let time = 0;
        for (let i = 0; i < this.stops.length - 1; i++) {
            const stopA = this.stops[i].stop;
            const stopB = this.stops[i + 1].stop;
            time += this.cityMap.getTimeDistance(stopA, stopB);
        }
        time += this.cityMap.getTimeDistance(this.stops.at(-1).stop, this.cityMap.getGoal());
        return time;
    }
    isFull() {
        return this.passengers === Bus.CAPACITY;
    }
    run(stop) {
        while (!this.isFull()) {
            if (stop.isEmpty()) {
                const closest = this.cityMap.getClosestStops(stop);
                const first = closest[0];
                if (!first)
                    return;
                stop = first;
            }
            this.addPassengers(stop.name, stop.takePeople(this.availableCapacity()));
        }
    }
    toString() {
        const result = [`Bus ${this.id}:`];
        for (const stop of this.stops) {
            result.push(`\t${stop.stop}: ${stop.passengers} passengers`);
        }
        result.push(`\t* Total: ${this.passengers}`);
        result.push(`\t* Time: ${this.getTime()}`);
        return result.join('\n');
    }
}
exports.Bus = Bus;
Bus.CAPACITY = 44;
Bus.counter = 1;
//# sourceMappingURL=Bus.js.map