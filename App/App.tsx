import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './screen/Home';
import Settings from './screen/Settings';

// components
import Header from './components/Header';

const Stack = createNativeStackNavigator();

interface Props { }
interface State { }

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerStyle: {
                height: 60,
                padding: 15,
                backgroundColor: 'darkslateblue',
              },
              headerTitle: (props) => <Header {...props} />,
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Settings')}
                  title="Info"
                  color="#fff"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={() => ({
              headerStyle: {
                height: 60,
                padding: 15,
                backgroundColor: 'darkslateblue',
              },
              headerTintColor: '#fff',
              headerTitle: (props) => <Header title="Settings" {...props} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;