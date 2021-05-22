import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PlayerProps {
  id: string;
  name: string;
  photo: string;
  teams: string;
  about: string;
  mark: string;
  clan: string;
  village: string;
  villagename: string;
}

export interface StoragePlayerProps {
  [id: string]: {
    data: PlayerProps;
  }
}

export async function savePlayer(player: PlayerProps) : Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@jogatinna:players')
    const oldPlayers = data ? (JSON.parse(data) as StoragePlayerProps) : {};

    const newPlayer = {
      [player.id]: {
        data: player
      }
    }

    await AsyncStorage.setItem('@jogatinna:players',
    JSON.stringify({
      ...newPlayer,
      ...oldPlayers
    }));
  }catch(error) {
    throw new Error(error);
  } 
}

export async function loadPlayer() : Promise<PlayerProps[]> {
  try {
    const data = await AsyncStorage.getItem('@jogatinna:players');
    const players = data ? (JSON.parse(data) as StoragePlayerProps) : {};

    const playersSorted = Object
    .keys(players)
    .map((player) => {
      return {
        ...players[player].data
      }
    })
    return playersSorted;
  }catch(error) {
    throw new Error(error);
  } 
}

export async function removerPlayer(id: string): Promise<void>{
  const data = await AsyncStorage.getItem('@jogatinna:players');
  const players = data ? (JSON.parse(data) as StoragePlayerProps) : {};

  delete players[id];

  await AsyncStorage.setItem(
    '@jogatinna:players',
    JSON.stringify(players)
  );
}