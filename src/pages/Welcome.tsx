import React from 'react';
import { 
	SafeAreaView, 
	Text, 
	Image, 
	StyleSheet, 
	TouchableOpacity,
	Dimensions,	
	View
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';

import BemVindoImg from '../assets/BemVindo.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
	const navigation = useNavigation();

	function handleStart(){
		navigation.navigate('PlayerSelect');
	}

	return(
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					JogaTinna
				</Text>

        <Text style={styles.subtitle}>
					Chame seus amigos para jogar e marque as pontuações.
				</Text>

				<Image
					source={BemVindoImg}
					style={styles.image}
					resizeMode="contain"
				/>

				<Text style={styles.subtitle}>
          Veja qual Ninja você mais se identifica, e selecione-o para representá-lo!
				</Text>

				<TouchableOpacity 
					style={styles.button}	
					activeOpacity={0.7}
					onPress={handleStart}
				>
					<Feather 
						name="chevron-right"
						style={styles.buttonIcon}
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 20
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.heading,
		marginTop: 38,
		fontFamily: fonts.heading,
		lineHeight: 34
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading,
		fontFamily: fonts.text
	},
	image: {
		height: Dimensions.get('window').width * 0.7
	},

	button: {
		backgroundColor: colors.purple,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		marginRight: 10,
		height: 56,
		width: 56
	},

	buttonIcon: {
		fontSize: 32,
		color: colors.white
	}
});