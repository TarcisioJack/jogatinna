import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import Image from 'react-native-scalable-image';

import { PlayerProps, savePlayer } from '../libs/storage';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  player: PlayerProps
}

export function PlayerSave() {
  const route = useRoute();
  const { player } = route.params as Params;

  const navigation = useNavigation();

  async function handleSave() {
    try {
      await savePlayer({
        ...player
      });

      navigation.navigate('Confirmation', {
        title: `${player.name}`,
        subtitle: 'entrou na batalha!',
        buttonTitle: 'Fight!',
        icon: 'smile',
        nextScreen: 'MyPlayers',
      });
      
    }catch {
      Alert.alert('Não foi possível salvar. 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.playerInfo}>
          <Image
            source={{uri: player.photo}}
            width={Dimensions.get('window').width = 200}
          />

          <Text style={styles.playerName}>
            {player.name}
          </Text>
        </View>
        
        <View style={styles.playerAboutIMG}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
          >
            <Image
            width={Dimensions.get('window').width = 300}
            source={{uri: player.about}}
            />
            {/* <Text style={styles.playerAbout}>
              {player.about}
            </Text> */}
          </ScrollView>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              width={Dimensions.get('window').width = 18}
              source={{uri: player.village}}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {player.villa}
            </Text>

            <Image
              width={Dimensions.get('window').width = 18}
              source={{uri: player.mark || undefined}}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {player.clan}
            </Text>
          </View>
          
          <Text style={styles.text}>
            Deseja adicionar o Ninja na batalha?
          </Text>

          <Button
            title="Adicionar"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  playerInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: getBottomSpace() || 10
  },
  playerName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  playerAboutIMG:{
    flex:1,
    paddingHorizontal: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  playerAbout: {
    textAlign: 'justify',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 18,
    height: 18,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  text: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  }
});