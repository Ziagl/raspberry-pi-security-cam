import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { 
    title:string;
}

class Header extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
  }

  static defaultProps = {
    title: 'Security Cameras',
  }
  
  render() {
    return (
      <Text style={styles.text}>{this.props.title}</Text>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
      color: '#fff',
      fontSize: 23,
      textAlign: 'center',
  },
});

export default Header;