"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//with dotenv, we can access all global vars in .env file
//e.g: process.env.MONGO_URI
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
//Connect init to MongoDb atlas
var database_config_1 = require("./configs/database.config");
var order_router_1 = __importDefault(require("./routers/order.router"));
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200", /\.vercel\.app$/],
    maxAge: 86400
}));
// use body parser so we can get info from POST and/or URL parameters
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Used by load balancer to make sure we are taking requests
app.get('/healthcheck', function (req, res) { return res.send('System status: Ok'); });
// basic routes
app.get('/', function (req, res) {
    res.send("tokoFood API is running at PORT:".concat(port, "/api"));
});
app.use("/api/foods", food_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
var port = 5000;
app.listen(port, function () {
    console.log("Website API Server is listening at PORT " + port);
});
