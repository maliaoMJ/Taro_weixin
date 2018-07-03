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

var User = function (_Component) {
  _inherits(User, _Component);

  function User(props) {
    _classCallCheck(this, User);

    var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));

    _this.$usedState = ["userInfo"];
    _this.$components = {};
    _this.$dynamicComponents = {};

    _this.state = {
      userInfo: ''
    };
    _this.state = _this._createData();
    return _this;
  }

  _createClass(User, [{
    key: "componentDidShow",
    value: function componentDidShow() {
      var self = this;
      _index2.default.getStorage({
        key: 'userinfo',
        success: function success(data) {
          self.setState({
            userInfo: data.data
          });
        },
        fail: function fail() {
          console.log('找不到数据');
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
    // get user

  }, {
    key: "__event_getuserinfo",
    value: function __event_getuserinfo(event) {
      var userInfo = event.detail.userInfo;
      if (userInfo) {
        this.setState({
          userInfo: userInfo
        });
        var nickName = userInfo.nickName,
            country = userInfo.country,
            province = userInfo.province,
            city = userInfo.city,
            avatarUrl = userInfo.avatarUrl;
        // 本地存储用户信息

        _index2.default.setStorage({
          key: 'userinfo',
          data: {
            nickName: nickName,
            country: country,
            province: province,
            avatarUrl: avatarUrl,
            city: city
          },
          success: function success() {
            console.log('本地存储用户信息成功！');
          },
          fail: function fail() {
            console.log('存储数据失败');
          }
        });
      }
    }
    // isNotLoginDOM

  }, {
    key: "isNotLoginUI",
    value: function isNotLoginUI() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      {
        var rendDOM = void 0;
        if (this.__state.userInfo) {} else {}
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

  return User;
}(_index.Component);

exports.default = User;

Page(require('../../npm/@tarojs/taro-weapp/index.js').default.createPage(User, {
  path: 'src/pages/user/user.js'
}));