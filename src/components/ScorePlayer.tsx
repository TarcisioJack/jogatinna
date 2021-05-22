import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function ScorePlayer() {
  const [count, setCount] = useState(0);

  function reduction() {
    setCount(count - 1);
  }

  async function increment() {
    setCount(count + 1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.buttonReduction}
					activeOpacity={0.2}
          onPress={reduction}
        >
          <Feather
            name="minus-square"
            style={styles.buttonReductionIcon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonIncrement}
					activeOpacity={0.2}
          onPress={increment}
        >
          <Feather
            name="plus-square"
            style={styles.buttonIncrementIcon}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.label}>
        <Text style={styles.pointLabelText}>
          Pontuação
        </Text>
        <Text style={styles.pointLabel}>
          {count}
        </Text>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  content:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  buttonReduction: {
    alignItems: 'center'
  },
  buttonReductionIcon: {
    fontSize: 48,
    color: colors.red
  },
  buttonIncrement: {
    alignItems: 'center'
  },
  buttonIncrementIcon: {
    fontSize: 48,
    color: colors.green_dark
  },
  label: {
    alignItems: 'center',
  },
  pointLabel: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.purple
  },
  pointLabelText: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },
});