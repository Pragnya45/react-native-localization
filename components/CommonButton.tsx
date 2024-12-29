import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

type CommonButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void; // Event handler type for touch events
};

const CommonButton: React.FC<any> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ba0441',
    borderRadius: 8,
    marginTop: 20,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
