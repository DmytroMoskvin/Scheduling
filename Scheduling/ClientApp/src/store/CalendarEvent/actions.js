"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
var setHistory = function (events) { return ({ type: 'SET_HISTORY', events: events }); };
var checkUser = function () { return ({ type: 'CHECK_USER' }); };
exports.actionCreators = {
    setHistory: setHistory,
    checkUser: checkUser
};
//# sourceMappingURL=actions.js.map