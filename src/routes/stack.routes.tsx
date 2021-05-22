import React from 'react';
import {
  createStackNavigator
} from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { PlayerAdd } from '../pages/PlayerAdd';
import { PlayerSave } from '../pages/PlayerSave';
import { Confirmation } from '../pages/Confirmation';
import AuthRoutes from './tab.routes';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
	<stackRoutes.Navigator
		headerMode='none'
		screenOptions={{
			cardStyle: {
				backgroundColor: colors.white
			},
		}}
	>
		<stackRoutes.Screen
			name="Welcome"
			component={Welcome}
		/>

		<stackRoutes.Screen
			name="PlayerSelect"
			component={AuthRoutes}
		/>

		<stackRoutes.Screen
			name="PlayerAdd"
			component={PlayerAdd}
		/>

		<stackRoutes.Screen
			name="PlayerSave"
			component={PlayerSave}
		/>
		
		<stackRoutes.Screen
			name="MyPlayers"
			component={AuthRoutes}
		/>
		
		<stackRoutes.Screen
			name="Confirmation"
			component={Confirmation}
		/>

	</stackRoutes.Navigator>
)

export default AppRoutes;