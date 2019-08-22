import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import AppNavigation from './AppNavigation'


import Settings from '../screens/Settings'
import About from '../screens/About'


const DrawerNavigator = createDrawerNavigator(
  {
    Home: AppNavigation,
    Settings: Settings,
    About: About
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(86, 86, 86, 0.9)',
    overlayColor: '#C09F80',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#76323F',
    },
  }
);

export default createAppContainer(DrawerNavigator);