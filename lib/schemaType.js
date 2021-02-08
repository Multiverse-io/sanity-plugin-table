"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Table',
  name: 'table',
  type: 'object',
  fields: [{
    name: 'rows',
    type: 'array',
    of: [{
      name: 'row',
      type: 'object',
      fields: [{
        name: 'cells',
        type: 'array',
        of: [{
          name: 'cell',
          type: 'string'
        }]
      }]
    }]
  }],
  inputComponent: _component.default
};
exports.default = _default;