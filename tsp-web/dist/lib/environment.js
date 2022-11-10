"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const ts_dotenv_1 = require("ts-dotenv");
exports.env = (0, ts_dotenv_1.load)({
    NODE_ENV: [
        'development',
        'production'
    ]
});
//# sourceMappingURL=environment.js.map