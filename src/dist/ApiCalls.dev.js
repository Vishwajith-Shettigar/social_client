"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginCall = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginCall = function loginCall(userCredential, dispatch, setJwtToken) {
  var res;
  return regeneratorRuntime.async(function loginCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dispatch({
            type: "LOGIN_START"
          });
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("/auth/login", userCredential));

        case 4:
          res = _context.sent;
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
          });
          setJwtToken("userId", res.data._id, {
            maxAge: 172800
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          dispatch({
            type: "LOGIN_FAILURE",
            payload: _context.t0
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.loginCall = loginCall;