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
const lz_string_1 = __importDefault(require("lz-string"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../static')));
app.listen(3000, () => console.log('ready'));
app.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stops = ['Torres Henequén', 'Bodega Aurrera (Independencia)', 'Mi Plaza Libramiento', 'Aztecas', 'Plaza Las Torres', 'Torres del Sur (Torres Libramiento)', 'Plaza Sendero', 'Plaza Juárez', 'Panamericana', 'Porvenir', 'Rayón y Lucero', 'Plaza del Reloj', 'Plaza Las Misiones', 'Carlos Amaya', 'Plaza Pinocelli', 'Centro'].sort();
    res.render('index', { stops });
}));
app.get('/encode', (req, res) => {
    var _a;
    const data = {};
    for (const [key, value] of Object.entries((_a = req.query) !== null && _a !== void 0 ? _a : {})) {
        if (typeof value !== 'string')
            continue;
        data[key] = parseInt(value) || 0;
    }
    res.send(lz_string_1.default.compressToBase64(JSON.stringify(data)));
});
app.get('/result', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { key } = req.query;
    if (typeof key !== 'string') {
        res.sendStatus(400);
        return;
    }
    const text = (_a = lz_string_1.default.decompressFromBase64(key)) !== null && _a !== void 0 ? _a : '{}';
    const data = JSON.parse(text.replace(/_/g, ' '));
    for (const [key, value] of Object.entries(data)) {
        data[key] = parseInt(value) || 0;
    }
    const result = yield fetch('http://localhost:8000/test', {
        body: JSON.stringify(data),
        credentials: 'omit',
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        mode: 'no-cors'
    }).then(r => r.json()).catch(() => null);
    res.render('result', { data, result });
}));
//# sourceMappingURL=main.js.map