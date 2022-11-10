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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const stops = [];
    const data = [
        ['Torres Henequén', 95],
        ['Bodega Aurrera (Independencia)', 85],
        ['Mi Plaza Libramiento', 75],
        ['Aztecas', 75],
        ['Plaza Las Torres', 60],
        ['Torres del Sur (Torres Libramiento)', 60],
        ['Plaza Sendero', 50],
        ['Plaza Juárez', 50],
        ['Panamericana', 45],
        ['Porvenir', 30],
        ['Rayón y Lucero', 20],
        ['Plaza del Reloj', 15],
        ['Plaza Las Misiones', 15],
        ['Carlos Amaya', 15],
        ['Plaza Pinocelli', 10],
        ['Centro', 5],
        ['CU', 0]
    ];
    stops.push(...data.map(i => new lib_1.BusStop({ name: i[0], people: i[1] })));
    const map = new lib_1.CityMap();
    for (const bstop of stops)
        map.addStop(bstop);
    yield map.populateDistances();
    const model = new lib_1.mTSP(map, 'CU');
    const buses = model.run();
    let totalTime = 0;
    for (const bus of buses) {
        totalTime += bus.getTime();
        console.log(`${bus}`);
    }
    console.log(`----\nTotal time: ${totalTime}`);
}))();
//# sourceMappingURL=main.js.map