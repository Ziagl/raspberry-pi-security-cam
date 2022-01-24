import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  AppRegistry,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
 
import { CameraData } from './Cameradata';

// components
import CameraImage from './components/CameraImage';
import Header from './components/Header';

interface Props { }
interface State { 
  url:string,
  data:string,
  metadata:CameraData | undefined;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { 
      url: "https://my-api-domain.com/",
      data: "data.json",
      metadata: undefined 
    }
  }

  componentDidMount() {
    this.api(this.state.url + this.state.data);
  }

  async api(url:string):Promise<void> {
    const data = await( await fetch(url)).json();
    this.setState({metadata: data});
    return;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.state.metadata != undefined ? (
            this.state.metadata.images.map((element) => {
              return <CameraImage 
                name={element.name}
                filename={this.state.url+element.filename}
                timestamp={element.timestamp} />
            })
          ) : (
            <ActivityIndicator size="large" />
          )}
        </ScrollView>
        <View style={{flex: 1,justifyContent: 'flex-end',height: 60}}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => this.api(this.state.url + this.state.data)}
          >
            <Text style={styles.text}>Reload</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  scrollView: {
    paddingBottom: 60,
  },
  buttonView: {
    width:'100%',
    height:60,
    backgroundColor:'red', 
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    color:'white',
    fontSize: 20
  }
});

export default App;