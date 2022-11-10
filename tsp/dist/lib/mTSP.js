"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mTSP = void 0;
const Bus_1 = require("./Bus");
class mTSP {
    constructor(cityMap, endStop) {
        this.buses = [];
        this.cityMap = cityMap;
        this.endStop = endStop;
        this.cityMap.getStop(endStop).setGoal();
        this.cityMap.assertDistances();
    }
    getSortedByDistance() {
        const stopsWithPeople = this.cityMap.getStopsWithPeople();
        return Object.entries(this.cityMap.timeDistances)
            .filter(i => !i[0].startsWith(`${this.endStop}-`) && !i[0].endsWith(`-${this.endStop}`))
            .sort((a, b) => a[1] - b[1])
            .map(i => i[0].split('-'))
            .flat()
            .reduce((list, item) => {
            if (!list.includes(item))
                list.push(item);
            return list;
        }, [])
            .filter(i => stopsWithPeople.has(i));
    }
    getLastBus() {
        const bus = this.buses.at(-1);
        if (!bus || bus.isFull()) {
            const bus = new Bus_1.Bus(this.cityMap);
            this.buses.push(bus);
            return bus;
        }
        return bus;
    }
    haveRemainingStops() {
        return !!Object.values(this.cityMap.stops).map(i => i.getPeople()).find(i => i !== 0);
    }
    run() {
        while (this.haveRemainingStops()) {
            const bus = this.getLastBus();
            const start = this.getSortedByDistance().shift();
            if (!start)
                break;
            const startStop = this.cityMap.getStop(start);
            bus.run(startStop);
        }
        return this.buses;
    }
}
exports.mTSP = mTSP;
//# sourceMappingURL=mTSP.js.map