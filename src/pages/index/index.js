import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Icon,
  ScrollView
} from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '../../actions/counter';
import '../../static/style/fontawesome.css';

import './index.scss';

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
export default class Index extends Component {
  config = {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f55002',
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'light',
    enablePullDownRefresh: false,
    onReachBottomDistance: 30,
    backgroundColor: '#f55002'
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        {/* <Button className='add_btn' onClick={this.props.add}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.dec}>
          -
        </Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>{this.props.counter.num}</View> */}
        <View className='bannerImg'>
          <Swiper
            className='swiper'
            indicator-dots='true'
            indicator-color='rgba(0,0,0,0.3)'
            indicator-active-color='#fff'
            autoplay='true'
            duration={2000}
            interval={3000}
            circular
          >
            <SwiperItem>
              <Image
                className='swiperImage'
                src='http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                className='swiperImage'
                src='http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                className='swiperImage'
                src='http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
              />
            </SwiperItem>
          </Swiper>
        </View>
        <View className='contentBox'>
          <View className='booksCategory'>
            <Icon className='fa fa-fire' />
            <Text className='title'>&nbsp;最新书籍</Text>
          </View>
          <View className='booksCategory'>
            <Icon className='fa fa-flag-checkered' />
            <Text className='title'>&nbsp;推荐书籍</Text>
          </View>
          <View className='booksCategory'>
            <Icon className='fa fa-heartbeat' />
            <Text className='title'>&nbsp;热门书籍</Text>
          </View>
          <View className='booksCategory'>
            <Icon className='fa fa-star' />
            <Text className='title'>&nbsp;古典文学</Text>
          </View>
        </View>
      </View>
    );
  }
}
