import React from 'react';
import { NavigatorIOS } from 'react-native';
import { Container, Button, Text } from 'native-base';
import HomePage from './src/HomeScreen/index';

export default class App extends React.Component {

  render() {
    return (
        <HomePage />
    );
  }
}