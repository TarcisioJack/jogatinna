import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { PlayerCardPrimary } from '../components/PlayerCardPrimary';
import { TeamButton } from '../components/TeamButton';
import { Load } from '../components/Load';
import { PlayerProps } from '../libs/storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface TeamProps {
  key: string;
  title: string;
}

export function PlayerSelect() {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerProps[]>([]);
  const [teamSelected, setTeamSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleTeamSelected(team: string) {
    setTeamSelected(team);

    if(team == 'all')
      return setFilteredPlayers(players);

    const filtered = players.filter(player =>
      player.teams.includes(team)
    );

    setFilteredPlayers(filtered);
  }

  async function fetchPlayers() {
    const { data } = await api
    .get(`players?_sort=name&_order=asc&_page=${page}&_limit=100`);

    if(!data)
      return setLoading(true);

    if(page > 1){
      setPlayers(oldValue => [...oldValue, ...data])
      setFilteredPlayers(oldValue => [...oldValue, ...data])
    }else {
      setPlayers(data);
      setFilteredPlayers(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }
  
  function handleFetchMore(distance: number) {
    if(distance < 1)
      return;

      setLoadingMore(true);
      setPage(oldValue => oldValue + 1);
      fetchPlayers();
  }

  function handlePlayerSelect(player: PlayerProps){
    navigation.navigate('PlayerSave', { player });
  }

  useEffect(() => {
    async function fetchTeam() {
      const { data } = await api
      .get('players_teams?_sort=title&order=asc');
      setTeams([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchTeam();
  },[])

  useEffect(() => {
    fetchPlayers();
  },[])


  if(loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Vamos jogar?
        </Text>
        <Text style={styles.subtitle}>
          Selecione o seu Ninja favorito para a batalha!
        </Text>
      </View>

      <View>
        <FlatList
          data={teams}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <TeamButton
              title={item.title}
              active={item.key === teamSelected}
              onPress={() => handleTeamSelected(item.key)}
          />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teamList}
        />
      </View>

      <View style={styles.players}>
        <FlatList 
        data={filteredPlayers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PlayerCardPrimary 
            data={item}
            onPress={() => handlePlayerSelect(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) =>
          handleFetchMore(distanceFromEnd)
        }
        ListFooterComponent={
          loadingMore
          ? <ActivityIndicator color={colors.green} />
          : <></>
        }
        />

      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 5,
  },
  players: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  teamList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 5,
    paddingEnd: '20%'
  }
});