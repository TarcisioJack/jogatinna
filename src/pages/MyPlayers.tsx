import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert
} from 'react-native';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlayerCardSecundary } from '../components/PlayerCardSecundary';
import { loadPlayer, PlayerProps, removerPlayer } from '../libs/storage';

import KagesImg from '../assets/Kages.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlayers() {
  const [myPlayers, setMyPlayers] = useState<PlayerProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleRemove(player: PlayerProps) {
    Alert.alert('Remover', `Deseja remover ${player.name}?`,[
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'sim 😢',
        onPress: async () => {
          try {
            await removerPlayer(player.id);
            setMyPlayers((oldData) =>
              oldData.filter((item) => item.id !== player.id)
            );
          }catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const playersStoraged = await loadPlayer();

      setMyPlayers(playersStoraged);
      setLoading(false);
    }

    loadStorageData();
  },[])

  if(loading)
    return <Load />

  return (
      <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image
            source={KagesImg}
            style={styles.spotlightImage}
          />
          <Text style={styles.spotlightText}>
            DICA: Arraste para a esquerda para remover.
          </Text>
        </View>

        <View style={styles.players}>
          <Text style={styles.playersTitle}>
            Ninjas em Batalha:
          </Text>

          <FlatList
            data={myPlayers}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlayerCardSecundary
                data={item}
                handleRemove={() => {handleRemove(item)}}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 5,
    backgroundColor: colors.background
  },
  spotlight:{
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  players: {
    flex: 1,
    width: '100%'
  },
  playersTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 5
  }
});