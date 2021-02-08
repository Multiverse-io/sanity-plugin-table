"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("@sanity/uuid");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _table = _interopRequireDefault(require("./components/table"));

var _patchEvent = _interopRequireWildcard(require("part:@sanity/form-builder/patch-event"));

var _default = _interopRequireDefault(require("part:@sanity/components/fieldsets/default"));

var _buttonGrid = _interopRequireDefault(require("part:@sanity/components/buttons/button-grid"));

var _default2 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _component = _interopRequireDefault(require("./component.css"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createPatchFrom = value => {
  return _patchEvent.default.from((0, _patchEvent.set)(value));
};

class TableInput extends _react.default.Component {
  constructor() {
    var _this;

    _this = super(...arguments);

    _defineProperty(this, "updateCell", (e, rowIndex, cellIndex) => {
      const _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange; // Clone the current table data

      const newValue = _objectSpread({}, value);

      newValue.rows[rowIndex].cells[cellIndex] = e.target.value;
      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "initializeTable", () => {
      const onChange = this.props.onChange; // Add a single row with a single empty cell (1 row, 1 column)

      const newValue = {
        rows: [{
          _type: 'row',
          _key: (0, _uuid.uuid)(),
          cells: ['']
        }]
      };
      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "addRow", e => {
      const _this$props2 = this.props,
            value = _this$props2.value,
            onChange = _this$props2.onChange; // If we have an empty table, create a new one

      if (!value) return this.initializeTable(); // Clone the current table data

      const newValue = _objectSpread({}, value); // Calculate the column count from the first row


      const columnCount = value.rows[0].cells.length; // Add as many cells as we have columns

      newValue.rows.push({
        _type: 'row',
        _key: (0, _uuid.uuid)(),
        cells: Array(columnCount).fill('')
      });
      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "removeRow", index => {
      if (!window.confirm('Remove this row?')) {
        return;
      }

      const _this$props3 = this.props,
            value = _this$props3.value,
            onChange = _this$props3.onChange; // Clone the current table data

      const newValue = _objectSpread({}, value); // Remove the row via index


      newValue.rows.splice(index, 1); // If the last row was removed, clear the table

      if (!newValue.rows.length) {
        return this.clear(true);
      }

      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "addColumn", e => {
      const _this$props4 = this.props,
            value = _this$props4.value,
            onChange = _this$props4.onChange; // If we have an empty table, create a new one

      if (!value) return this.initializeTable(); // Clone the current table data

      const newValue = _objectSpread({}, value); // Add a cell to each of the rows


      newValue.rows.forEach((row, i) => {
        newValue.rows[i].cells.push('');
      });
      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "removeColumn", index => {
      if (!window.confirm('Remove this column?')) {
        return;
      }

      const _this$props5 = this.props,
            value = _this$props5.value,
            onChange = _this$props5.onChange; // Clone the current table data

      const newValue = _objectSpread({}, value); // For each of the rows, remove the cell by index


      newValue.rows.forEach(row => {
        row.cells.splice(index, 1);
      }); // If the last cell was removed, clear the table

      if (!newValue.rows[0].cells.length) {
        return this.clear(true);
      }

      return onChange(createPatchFrom(newValue));
    });

    _defineProperty(this, "clear", function () {
      let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const onChange = _this.props.onChange;

      if (!force && !window.confirm('Clear table contents?')) {
        return;
      }

      return onChange(_patchEvent.default.from((0, _patchEvent.unset)()));
    });

    _defineProperty(this, "focus", () => {});
  }

  render() {
    const _this$props6 = this.props,
          onFocus = _this$props6.onFocus,
          type = _this$props6.type,
          value = _this$props6.value,
          name = _this$props6.name;
    const title = type.title,
          description = type.description,
          options = type.options;
    const table = value && value.rows && value.rows.length ? _react.default.createElement(_table.default, {
      rows: value.rows,
      updateCell: this.updateCell,
      removeColumn: this.removeColumn,
      removeRow: this.removeRow,
      onFocus: onFocus
    }) : null;
    const buttons = value ? _react.default.createElement(_buttonGrid.default, null, _react.default.createElement(_default2.default, {
      inverted: true,
      onClick: this.addRow
    }, "Add Row"), _react.default.createElement(_default2.default, {
      inverted: true,
      onClick: this.addColumn
    }, "Add Column"), _react.default.createElement(_default2.default, {
      inverted: true,
      color: "danger",
      onClick: this.clear
    }, "Clear")) : _react.default.createElement(_default2.default, {
      color: "primary",
      onClick: this.initializeTable
    }, "New Table");
    return _react.default.createElement(_default.default, {
      legend: title,
      description: description,
      isCollapsible: options.collapsible,
      isCollapsed: options.collapsed
    }, _react.default.createElement("div", {
      className: _component.default.container
    }, table, buttons));
  }

}

exports.default = TableInput;

_defineProperty(TableInput, "propTypes", {
  type: _propTypes.default.shape({
    title: _propTypes.default.string,
    description: _propTypes.default.string,
    options: _propTypes.default.object
  }).isRequired,
  value: _propTypes.default.object,
  onChange: _propTypes.default.func.isRequired
});