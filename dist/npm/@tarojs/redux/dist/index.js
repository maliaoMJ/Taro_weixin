'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var store = null;
function getStore() {
  return store;
}
function setStore(arg) {
  store = arg;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function isObject(arg) {
  return arg != null && _typeof(arg) === 'object' && !Array.isArray(arg);
}
function mergeObjects(obj1, obj2) {
  var result = Object.assign({}, obj1);

  if (isObject(obj1) && isObject(obj2)) {
    for (var p in obj2) {
      if (isObject(obj1[p]) && isObject(obj2[p])) {
        result[p] = mergeObjects(obj1[p], obj2[p]);
      } else {
        result[p] = obj2[p];
      }
    }
  }

  return result;
}

function connect(mapStateToProps, mapDispatchToProps) {
  var store = getStore();
  var dispatch = store.dispatch;
  var initMapDispatch = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch) : {};
  initMapDispatch.dispatch = dispatch;

  var stateListener = function stateListener() {
    var _this = this;

    var isChanged = false;
    var newMapState = mapStateToProps(store.getState());
    Object.keys(newMapState).forEach(function (key) {
      var val = newMapState[key];

      if (isObject(val) && isObject(initMapDispatch[key])) {
        val = mergeObjects(val, initMapDispatch[key]);
      }

      _this.prevProps = Object.assign({}, _this.props);

      if (_this.props[key] !== val) {
        _this.props[key] = val;
        isChanged = true;
      }
    });
    var isPageHide = this.$root ? this.$root.$isPageHide : this.$isPageHide;

    if (isChanged && !isPageHide) {
      this._unsafeCallUpdate = true;
      this.setState({}, function () {
        delete _this._unsafeCallUpdate;
      });
    }
  };

  return function connectComponent(Component) {
    var unSubscribe = null;
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(Connect, _Component);

        function Connect() {
          var _this2;

          _classCallCheck(this, Connect);

          _this2 = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, Object.assign.apply(Object, Array.prototype.slice.call(arguments).concat([mergeObjects(mapStateToProps(store.getState()), initMapDispatch)]))));
          Object.keys(initMapDispatch).forEach(function (key) {
            _this2["__event_".concat(key)] = initMapDispatch[key];
          });
          return _this2;
        }

        _createClass(Connect, [{
          key: "componentWillMount",
          value: function componentWillMount() {
            var store = getStore();
            Object.assign(this.props, mergeObjects(mapStateToProps(store.getState()), initMapDispatch));
            unSubscribe = store.subscribe(stateListener.bind(this));

            if (_get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentWillMount", this)) {
              _get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentWillMount", this).call(this);
            }
          }
        }, {
          key: "componentDidShow",
          value: function componentDidShow() {
            this.$isPageHide = false;

            if (_get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentDidShow", this)) {
              _get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentDidShow", this).call(this);
            }
          }
        }, {
          key: "componentDidHide",
          value: function componentDidHide() {
            this.$isPageHide = true;

            if (_get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentDidHide", this)) {
              _get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentDidHide", this).call(this);
            }
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            if (_get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentWillUnmount", this)) {
              _get(Connect.prototype.__proto__ || Object.getPrototypeOf(Connect.prototype), "componentWillUnmount", this).call(this);
            }

            if (unSubscribe) {
              unSubscribe();
            }

            unSubscribe = null;
          }
        }]);

        return Connect;
      }(Component)
    );
  };
}

var Provider = function Provider() {
  _classCallCheck(this, Provider);
};

var index = {
  connect: connect,
  Provider: Provider,
  getStore: getStore,
  setStore: setStore
};

exports.default = index;
exports.connect = connect;
exports.Provider = Provider;
exports.getStore = getStore;
exports.setStore = setStore;
//# sourceMappingURL=index.js.map
