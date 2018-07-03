import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './book.scss';

export default class Book extends Component {
  config = {};
  componentDidMount() {}
  render() {
    return (
      <View className='bookPage'>
        <Text>hello world</Text>
      </View>
    );
  }
}
