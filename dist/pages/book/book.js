"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Book = function (_Component) {
  _inherits(Book, _Component);

  function Book(props) {
    _classCallCheck(this, Book);

    var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this, props));

    _this.$usedState = ["books"];
    _this.$components = {};
    _this.$dynamicComponents = {};

    _this.state = {
      books: []
    };
    _this.state = _this._createData();
    return _this;
  }

  _createClass(Book, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _index2.default.setStorage({
        key: 'books',
        data: []
      });
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var self = this;
      _index2.default.getStorage({
        key: 'books',
        success: function success(res) {
          console.log('-------book page-----');
          console.log(res);
          self.setState({
            books: res.data
          });
        },
        fail: function fail() {
          _index2.default.setStorage({
            key: 'books',
            data: []
          });
        }
      });
    }
  }, {
    key: "__event_addBooks",
    value: function __event_addBooks() {
      _index2.default.scanCode({
        onlyFromCamera: true,
        scanType: ['qrCode', 'barCode', 'DataMatrix', 'pdf417']
      }).then(function (res) {
        // 扫码成功 1.跳转页面 2.设置state
        console.log('图书ISBN:' + res.result);
        _index2.default.navigateTo({
          url: "/pages/detail/detail?isbn=" + res.result
        });
      }).catch(function (error) {
        console.log("\u83B7\u53D6\u626B\u7801\u6570\u636E\u5931\u8D25\uFF1A" + error);
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      {
        Object.assign(this.__state, {});
        this.__state.__data = Object.assign({}, this.__state);
        return this.__state;
      }
      delete this.__props;
      var __state = this.__state;
      delete this.__state;
      return __state;
    }
  }]);

  return Book;
}(_index.Component);

exports.default = Book;

Page(require('../../npm/@tarojs/taro-weapp/index.js').default.createPage(Book, {
  path: 'src/pages/book/book.js'
}));