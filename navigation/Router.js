import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import RootNavigation from './RootNavigation';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import AuthScreen from '../screens/AuthScreen';
import AddFriendsScreen from '../screens/AddFriendsScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default createRouter(() => ({
  auth: () => AuthScreen,
  home: () => HomeScreen,
  chat: () => ComingSoonScreen,
  addFriends: () => AddFriendsScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
