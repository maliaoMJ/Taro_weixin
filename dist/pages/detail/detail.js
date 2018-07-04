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

var Detail = function (_Component) {
  _inherits(Detail, _Component);

  function Detail(props) {
    _classCallCheck(this, Detail);

    var _this = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this, props));

    _this.$usedState = ["bookInfoObj"];
    _this.$components = {};
    _this.$dynamicComponents = {};
    _this.cnofig = {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f55002',
      navigationBarTitleText: '图书详情',
      navigationBarTextStyle: 'light',
      enablePullDownRefresh: false,
      onReachBottomDistance: 30,
      backgroundColor: '#f55002'
    };

    _this.state = {
      bookInfoObj: ''
    };
    _this.state = _this._createData();
    return _this;
  }

  _createClass(Detail, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.showNavigationBarLoading();
      _index2.default.setNavigationBarTitle({
        title: '加载中...'
      });
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(this.$router.params);
      var self = this;
      var isbn = this.$router.params.isbn;
      // 拿到路由参数 isbn
      if (isbn) {
        // 发起网络请求
        _index2.default.request({
          url: "http://api.jisuapi.com/isbn/query?appkey=348203e1118f392d&isbn=" + isbn,
          method: 'GET'
        }).then(function (res) {
          var data = res.data.result;
          console.log(data);
          self.setState({
            bookInfoObj: data
          });
          //   更换导航栏标题文字
          _index2.default.setNavigationBarTitle({
            title: '图书详情'
          });
          _index2.default.hideNavigationBarLoading();
        }).catch(function (error) {
          error.msg = '获取图书信息失败';
          console.log(error.msg);
        });
      } else {
        console.log('未获取到图书唯一编码');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        bookInfoObj: ''
      });
    }
  }, {
    key: "__event_addBook",
    value: function __event_addBook() {
      var self = this;

      _index2.default.getStorage({
        key: 'books',
        success: function success(res) {
          console.log(res.data);
          var books = res.data;
          var isRepeat = books.some(function (item) {
            return item.isbn === self.state.bookInfoObj.isbn;
          });
          if (isRepeat) {
            _index2.default.showToast({
              title: '该图书已存在！',
              icon: 'error',
              mask: true,
              success: function success() {
                // 添加图书失败的操作
              }
            });
          } else {
            console.log(self.state.bookInfoObj);
            var bookArr = books.concat(self.state.bookInfoObj);
            _index2.default.setStorage({
              key: 'books',
              data: bookArr
            });
            _index2.default.showToast({
              title: '添加成功！',
              icon: 'success',
              mask: true,
              success: function success() {
                _index2.default.switchTab({ url: '/pages/book/book' });
              }
            });
          }
        },
        fail: function fail(error) {
          console.log(error);
        }
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

  return Detail;
}(_index.Component);

exports.default = Detail;

Page(require('../../npm/@tarojs/taro-weapp/index.js').default.createPage(Detail, {
  path: 'src/pages/detail/detail.js'
}));