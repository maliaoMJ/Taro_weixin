import Taro, { Component } from '@tarojs/taro';
import { View, Text, Icon, Image } from '@tarojs/components';
import '../../static/style/fontawesome.css';
import './book.scss';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  config = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f55002',
    navigationBarTitleText: '我的书架',
    navigationBarTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 30,
    backgroundColor: '#f55002'
  };
  componentDidMount() {
    Taro.setStorage({
      key: 'books',
      data: []
    });
  }
  componentDidShow() {
    let self = this;
    Taro.getStorage({
      key: 'books',
      success: function(res) {
        console.log('-------book page-----');
        console.log(res);
        self.setState({
          books: res.data
        });
      },
      fail: function() {
        Taro.setStorage({
          key: 'books',
          data: []
        });
      }
    });
  }
  addBooks() {
    Taro.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode', 'barCode', 'DataMatrix', 'pdf417']
    })
      .then(res => {
        // 扫码成功 1.跳转页面 2.设置state
        console.log('图书ISBN:' + res.result);
        Taro.navigateTo({
          url: `/pages/detail/detail?isbn=${res.result}`
        });
      })
      .catch(error => {
        console.log(`获取扫码数据失败：${error}`);
      });
  }
  render() {
    return (
      <View className='bookPage'>
        <Icon className='fa fa-qrcode' onClick={this.addBooks} />
        {this.state.books.length > 0 ? (
          this.state.books.map(item => (
            <View className='bookItem' key={item.title}>
              <View className='wrapper'>
                <Image className='bookPic' src={item.pic} />
              </View>
              <View className='bookInfos'>
                <View className='baseInfos'>
                  <Text className='bookName'>{item.title}</Text>
                </View>
                <Text className='publisher'>作者：{item.authoer}</Text>
                <Text className='publisher'>出版社：{item.publisher}</Text>
              </View>
            </View>
          ))
        ) : (
          <View className='nobook'>暂无书籍</View>
        )}
      </View>
    );
  }
}
