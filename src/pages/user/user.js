import Taro, { Component } from '@tarojs/taro';
import { View, Text, Icon, Button, Image } from '@tarojs/components';
import '../../static/style/fontawesome.css';
import './user.scss';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ''
    };
  }
  config = {};
  componentDidShow() {
    let self = this;
    Taro.getStorage({
      key: 'userinfo',
      success: function(data) {
        self.setState({
          userInfo: data.data
        });
      },
      fail: function() {
        console.log('找不到数据');
      }
    });
  }
  componentDidMount() {}
  // get user
  getuserinfo(event) {
    let userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setState({
        userInfo
      });
      let { nickName, country, province, city, avatarUrl } = userInfo;
      // 本地存储用户信息
      Taro.setStorage({
        key: 'userinfo',
        data: {
          nickName,
          country,
          province,
          avatarUrl,
          city
        },
        success: function() {
          console.log('本地存储用户信息成功！');
        },
        fail: function() {
          console.log('存储数据失败');
        }
      });
    }
  }
  // isNotLoginDOM
  isNotLoginUI() {}
  render() {
    let rendDOM;
    if (this.state.userInfo) {
      rendDOM = (
        <View className='isLogin'>
          <View className='top'>
            <Image className='wrapper' src={this.state.userInfo.avatarUrl} />
            <View className='userInfo'>
              <Image src={this.state.userInfo.avatarUrl} className='userAv' />
              <Text className='nickName'>{this.state.userInfo.nickName}</Text>
            </View>
          </View>
          <View className='menu'>
            <View className='item'>
              <Icon className='fa fa-book' />
              <Text>&nbsp;我的书架</Text>
              <Icon class='fa fa-angle-right' />
            </View>
            <View className='item'>
              <Icon className='fa fa-heart' />
              <Text>&nbsp;最近阅读</Text>
              <Icon class='fa fa-angle-right' />
            </View>
            <View className='item'>
              <Icon className='fa fa-star' />
              <Text>&nbsp;我的收藏</Text>
              <Icon class='fa fa-angle-right' />
            </View>
          </View>
        </View>
      );
    } else {
      rendDOM = (
        <View className='isNotLogin'>
          <Icon className='fa fa-grav' />
          <Text class='title'>未登录</Text>
          <Button
            className='login'
            open-type='getUserInfo'
            onGetuserinfo={this.getuserinfo.bind(this)}
          >
            授权登录
          </Button>
        </View>
      );
    }
    return <View className='UserPage'>{rendDOM}</View>;
  }
}
