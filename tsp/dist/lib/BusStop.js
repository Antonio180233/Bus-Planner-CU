"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusStop = void 0;
class BusStop {
    constructor(options) {
        this.goal = false;
        this.name = options.name;
        this.people = options.people;
    }
    getPeople() {
        return this.people;
    }
    isGoal() {
        return this.goal;
    }
    isEmpty() {
        return this.people === 0;
    }
    setGoal() {
        this.goal = true;
    }
    takePeople(max) {
        const amount = Math.min(this.people, max);
        this.people -= amount;
        return amount;
    }
}
exports.BusStop = BusStop;
//# sourceMappingURL=BusStop.js.map