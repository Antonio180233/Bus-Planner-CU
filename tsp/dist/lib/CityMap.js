"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityMap = void 0;
const BusStop_1 = require("./BusStop");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
class CityMap {
    constructor() {
        this.goal = null;
        this.stops = {};
        // timeDistances[ 'stopA-stopB' ]
        this.timeDistances = {};
    }
    addStop(stop) {
        this.stops[stop.name] = stop;
    }
    assertDistances() {
        var _a, _b;
        const names = Object.keys(this.stops);
        for (let i = 0; i < names.length - 1; i++) {
            const name1 = (_a = names[i]) !== null && _a !== void 0 ? _a : '';
            for (let j = i + 1; j < names.length; j++) {
                const name2 = (_b = names[j]) !== null && _b !== void 0 ? _b : '';
                this.getTimeDistance(name1, name2);
            }
        }
    }
    getClosestStops(stop) {
        if (stop instanceof BusStop_1.BusStop)
            stop = stop.name;
        return Object.values(this.stops)
            .filter(i => i.name !== stop && !i.isEmpty() && !i.isGoal())
            .sort((a, b) => this.getTimeDistance(stop, a) - this.getTimeDistance(stop, b));
    }
    getGoal() {
        if (!this.goal) {
            this.goal = Object.values(this.stops).find(i => i.isGoal());
        }
        return this.goal;
    }
    getStop(name) {
        if (name instanceof BusStop_1.BusStop)
            return name;
        const stop = this.stops[name];
        if (!stop)
            throw new RangeError(`No stop named "${name}".`);
        return stop;
    }
    getStopsKey(stop1, stop2) {
        stop1 = this.getStop(stop1);
        stop2 = this.getStop(stop2);
        return [stop1.name, stop2.name].sort().join('-');
    }
    getStopsWithPeople() {
        return new Set(Object.values(this.stops)
            .filter(i => !i.isEmpty())
            .map(i => i.name));
    }
    getTimeDistance(stop1, stop2) {
        stop1 = this.getStop(stop1);
        stop2 = this.getStop(stop2);
        if (stop1.name === stop2.name)
            return 0;
        const key = this.getStopsKey(stop1, stop2);
        const time = this.timeDistances[key];
        if (!time)
            throw new RangeError(`No time distance set between ${stop1.name} and ${stop2.name}.`);
        return time;
    }
    setTimeDistance(stop1, stop2, time) {
        const key = this.getStopsKey(stop1, stop2);
        this.timeDistances[key] = time;
    }
    populateDistances() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lines = readline_1.default.createInterface({
                input: fs_1.default.createReadStream('distances.csv'),
                crlfDelay: Infinity
            });
            try {
                for (var lines_1 = __asyncValues(lines), lines_1_1; lines_1_1 = yield lines_1.next(), !lines_1_1.done;) {
                    const line = lines_1_1.value;
                    if (line.length === 0)
                        continue;
                    const [stop1, stop2, time] = line.split(',').map(i => i.trim()).map(i => {
                        const number = parseInt(i, 10);
                        return isNaN(number) ? i : number;
                    });
                    if (!this.stops[stop1] || !this.stops[stop2])
                        continue;
                    this.setTimeDistance(stop1, stop2, time);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) yield _a.call(lines_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.CityMap = CityMap;
//# sourceMappingURL=CityMap.js.map