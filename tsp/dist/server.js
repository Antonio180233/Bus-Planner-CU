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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lib_1 = require("./lib");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use(function (_, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
app.listen(8000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server started');
}));
app.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.ip);
    try {
        const map = new lib_1.CityMap();
        const data = req.body;
        for (const [name, people] of Object.entries(data)) {
            map.addStop(new lib_1.BusStop({ name, people }));
        }
        map.addStop(new lib_1.BusStop({ name: 'CU', people: 0 }));
        yield map.populateDistances();
        const model = new lib_1.mTSP(map, 'CU');
        const buses = model.run();
        res.send(buses);
    }
    catch (e) {
        res.send(null);
    }
}));
//# sourceMappingURL=server.js.map