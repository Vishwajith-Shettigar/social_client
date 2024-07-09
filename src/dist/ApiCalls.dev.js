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
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(process.env.REACT_APP_API_URL, "/auth/login"), userCredential));

        case 4:
          res = _context.sent;
          console.log("Log in ---------->" + res);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
          });
          setJwtToken("userId", res.data._id, {
            maxAge: 172800
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          dispatch({
            type: "LOGIN_FAILURE",
            payload: _context.t0
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.loginCall = loginCall;