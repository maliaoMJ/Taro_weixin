import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon } from '@tarojs/components';
import '../../static/style/fontawesome.css';
import './detail.scss';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookInfoObj: ''
    };
  }
  cnofig = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f55002',
    navigationBarTitleText: '图书详情',
    navigationBarTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 30,
    backgroundColor: '#f55002'
  };
  componentWillMount() {
    Taro.showNavigationBarLoading();
    Taro.setNavigationBarTitle({
      title: '加载中...'
    });
  }
  componentDidShow() {}
  componentDidMount() {
    console.log(this.$router.params);
    let self = this;
    const isbn = this.$router.params.isbn;
    // 拿到路由参数 isbn
    if (isbn) {
      // 发起网络请求
      Taro.request({
        url: `http://api.jisuapi.com/isbn/query?appkey=348203e1118f392d&isbn=${isbn}`,
        method: 'GET'
      })
        .then(res => {
          const data = res.data.result;
          console.log(data);
          self.setState({
            bookInfoObj: data
          });
          //   更换导航栏标题文字
          Taro.setNavigationBarTitle({
            title: '图书详情'
          });
          Taro.hideNavigationBarLoading();
        })
        .catch(error => {
          error.msg = '获取图书信息失败';
          console.log(error.msg);
        });
    } else {
      console.log('未获取到图书唯一编码');
    }
  }
  componentWillUnmount() {
    this.setState({
      bookInfoObj: ''
    });
  }
  addBook() {
    let self = this;

    Taro.getStorage({
      key: 'books',
      success: function(res) {
        console.log(res.data);
        let books = res.data;
        let isRepeat = books.some(
          item => item.isbn === self.state.bookInfoObj.isbn
        );
        if (isRepeat) {
          Taro.showToast({
            title: '该图书已存在！',
            icon: 'error',
            mask: true,
            success: function() {
              // 添加图书失败的操作
            }
          });
        } else {
          console.log(self.state.bookInfoObj);
          let bookArr = books.concat(self.state.bookInfoObj);
          Taro.setStorage({
            key: 'books',
            data: bookArr
          });
          Taro.showToast({
            title: '添加成功！',
            icon: 'success',
            mask: true,
            success: function() {
              Taro.switchTab({ url: '/pages/book/book' });
            }
          });
        }
      },
      fail: function(error) {
        console.log(error);
      }
    });
  }
  render() {
    return (
      <View className='detailPage'>
        <Icon className='fa fa-plus' onClick={this.addBook.bind(this)} />
        <View className='bookImg'>
          {this.state.bookInfoObj.pic ? (
            <Image className='bookPic' src={this.state.bookInfoObj.pic} />
          ) : (
            <View className='nopic'>暂无该书封面</View>
          )}
        </View>
        <View className='bookInfo'>
          <View className='baseInfo'>
            <Text className='bookName'>
              {this.state.bookInfoObj.author}-{this.state.bookInfoObj.title}
            </Text>
            <Text className='bookPrice'>
              售价：{this.state.bookInfoObj.price}￥
            </Text>
          </View>
          <View className='bookDetailInfo'>
            <View className='autherInfo'>
              <Text className='auther'>
                作者：{this.state.bookInfoObj.author}
              </Text>
              <Text className='publisher'>
                出版社：{this.state.bookInfoObj.publisher}
              </Text>
            </View>
            <Text className='bookSummary'>
              {this.state.bookInfoObj.summary}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
