import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ListView
} from 'react-native';
import _ from 'lodash';
import { updateAvailability, fetchFriends } from '../actions';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';

import ProfileListItem from '../components/ProfileListItem'
import FriendListItem from '../components/FriendListItem'

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      //visible: false,
      title: 'UFree'
    },
  };
//SET UP FOR LIST VIEW, uncomment this!
  componentWillMount() {
    //fetch friends here add funtion

    this.props.fetchFriends();
    this.createDataSource(this.props)

  }

  componentWillReceiveProps(nextProps) {
    //next props received when i get new friends
    console.log('component will receive nextprops', nextProps)
    //this.props.fetchFriends()
    
    this.createDataSource(nextProps)
  }

  createDataSource({friends}) {
      const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(friends);
  }

  renderRow(friend){
    return <FriendListItem friend = {friend} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <ProfileListItem />
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={(friend) => this.renderRow(friend)}
        />  
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    //position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: +5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    justifyContent: 'space-around',
    alignItems:'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    flexDirection: 'row'
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

function mapStateToProps({auth}){
  const friends = _.map(auth.friends, (val, id) => {
    console.log('inside map function', val, id)
    return {...val, id}
  });
  return {friends}
}

export default connect(mapStateToProps, {fetchFriends})(HomeScreen)