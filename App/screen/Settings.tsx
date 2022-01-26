import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props { }
interface State { 
    url: string,
    filename: string,
}

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { 
        url: "",
        filename: ""
      }
  }

  async save():Promise<void> {
    try {
        await AsyncStorage.setItem('url', this.state.url);
        await AsyncStorage.setItem('filename', this.state.filename);
    } catch (e) {
        console.log("Error storing values to AsyncStorage.");
    }
    return;
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.settingLabel}>Backend URL</Text>
                <TextInput
                    style={styles.settingInput}
                    onChangeText={text => this.setState({url: text})}
                    value={this.state.url}
                    placeholder="Backend URL"
                />
                <Text style={styles.settingLabel}>Metadata filename</Text>
                <TextInput
                    style={styles.settingInput}
                    onChangeText={text => this.setState({filename: text})}
                    value={this.state.filename}
                    placeholder="Metadata filename"
                    keyboardType="numeric"
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => this.save()}
                >
                    <Text style={styles.text}>Save</Text>
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
        justifyContent:'center',
    },
    settingLabel:{
        color:'black',
        fontSize:20,
        padding: 10,
    },
    settingInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        color:'white',
        fontSize: 20,
    },
});

export default Settings;