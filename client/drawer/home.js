import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../components/Home';

const homeDrawerItem = createStackNavigator(
    {
        Home: {
          screen: Home
      }
    },
    { 
      navigationOptions: { header: null}
    }
);

homeDrawerItem.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default homeDrawerItem;