import Taro, { Component } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/redux';

import Index from './pages/index';

import configStore from './store';

import './app.scss';

const store = configStore();
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/book/book',
      'pages/detail/detail',
      'pages/user/user'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f55002',
      navigationBarTitleText: '图书详情',
      navigationBarTextStyle: 'light',
      enablePullDownRefresh: false,
      onReachBottomDistance: 30,
      backgroundColor: '#f55002'
    },
    tabBar: {
      backgroundColor: '#eee',
      selectedColor: '#f55002',
      color: '#aaa',
      borderStyle: '#f55002',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: './static/images/home_default.png',
          selectedIconPath: './static/images/home_selected.png',
          text: '首页'
        },
        {
          pagePath: 'pages/book/book',
          iconPath: './static/images/book_default.png',
          selectedIconPath: './static/images/book_selected.png',
          text: '书架'
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
          iconPath: './static/images/user_default.png',
          selectedIconPath: './static/images/user_selected.png'
        }
      ]
    },
    networkTimeout: {
      request: 6000,
      downloadFile: 10000
    },
    debug: true
  };
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
