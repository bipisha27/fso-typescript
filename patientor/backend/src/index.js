"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 3001;
app.get("/ping", function (_req, res) {
    res.send("pong");
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
