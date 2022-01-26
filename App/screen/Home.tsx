import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// data
import { CameraData } from '../Cameradata';

// components
import CameraImage from '../components/CameraImage';

interface Props { }
interface State { 
  url:string,
  filename:string,
  metadata:CameraData | undefined;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { 
      url: "https://ziegelwanger-edv.at/picam/",
      filename: "data.json",
      metadata: undefined 
    }
  }

  componentDidMount() {
    //this.initialize();
    this.api(this.state.url + this.state.filename);
  }

  async initialize():Promise<void> {
    try {
        const savedUrl = await AsyncStorage.getItem('url');
        if(savedUrl !== null) {
            this.setState({url: savedUrl});
        }
        const savedFilename = await AsyncStorage.getItem('filename');
        if(savedFilename !== null) {
            this.setState({filename: savedFilename});
        }
    } catch (e) {
        console.log("Error reading values from AsyncStorage.");
    }
    return;
  }

  async api(url:string):Promise<void> {
    const data = await( await fetch(url)).json();
    this.setState({metadata: data});
    return;
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            {this.state.metadata != undefined ? (
                this.state.metadata.images.map((element) => {
                return <View key={element.name}>
                    <CameraImage 
                        name={element.name}
                        filename={this.state.url+element.filename}
                        timestamp={element.timestamp} />
                    </View>
                })
            ) : (
                <ActivityIndicator size={80} style={{marginTop:Dimensions.get('window').height/2 - 130}}/>
            )}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => this.api(this.state.url + this.state.filename)}
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
    backgroundColor: '#eeeeee',
  },
  scrollView: {
    paddingBottom: 60,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 60,
  },
  buttonView: {
    width:'100%',
    height:60,
    backgroundColor:'darkslateblue', 
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    color:'white',
    fontSize: 20
  },
});

export default Home;