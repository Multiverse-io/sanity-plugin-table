"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default2 = _interopRequireDefault(require("part:@sanity/components/buttons/default"));

var _closeIcon = _interopRequireDefault(require("part:@sanity/base/close-icon"));

var _table = _interopRequireDefault(require("./table.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Table = (_ref) => {
  let _onFocus = _ref.onFocus,
      rows = _ref.rows,
      updateCell = _ref.updateCell,
      removeColumn = _ref.removeColumn,
      removeRow = _ref.removeRow;
  if (!rows || !rows.length) return null; // Button to remove row

  const renderRowRemover = index => _react.default.createElement("td", {
    className: _table.default.rowDelete
  }, _react.default.createElement(_default2.default, {
    title: "Remove this row",
    color: "white",
    icon: _closeIcon.default,
    size: "small",
    padding: "small",
    onClick: () => removeRow(index)
  })); // Button to remove column


  const renderColumnRemover = index => _react.default.createElement("td", {
    key: index,
    className: _table.default.colDelete
  }, _react.default.createElement(_default2.default, {
    title: "Remove this column",
    color: "white",
    icon: _closeIcon.default,
    size: "small",
    padding: "small",
    onClick: () => removeColumn(index)
  }));

  const renderColumnRemovers = row => _react.default.createElement("tr", null, row.cells.map((c, i) => renderColumnRemover(i)));

  const renderRowCell = rowIndex => (cell, cellIndex) => _react.default.createElement("td", {
    key: `cell-${cellIndex}`,
    className: _table.default.cell
  }, _react.default.createElement("input", {
    className: _table.default.input,
    type: "text",
    value: cell,
    onChange: e => updateCell(e, rowIndex, cellIndex),
    onFocus: () => _onFocus([rowIndex, cellIndex])
  }));

  const renderRow = (row, rowIndex) => {
    const renderCell = renderRowCell(rowIndex);
    return _react.default.createElement("tr", {
      key: `row-${rowIndex}`
    }, row.cells.map(renderCell), renderRowRemover(rowIndex));
  };

  return _react.default.createElement("table", {
    className: _table.default.table
  }, _react.default.createElement("tbody", null, rows.map(renderRow), renderColumnRemovers(rows[0])));
};

Table.propTypes = {
  rows: _propTypes.default.array,
  updateCell: _propTypes.default.func,
  removeColumn: _propTypes.default.func,
  removeRow: _propTypes.default.func
};
var _default = Table;
exports.default = _default;