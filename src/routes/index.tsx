import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ReimbursementsListScreen} from '../screens/ReimbursementsListScreen';
import CreateClaimFormScreen from '../screens/CreateClaimFormScreen';
import {ReimbursementsProvider} from '../context/ReimbursementsContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <ReimbursementsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Reimbursements"
            component={ReimbursementsListScreen}
            options={{title: 'Reimbursements'}}
          />
          <Stack.Screen
            name="CreateClaim"
            component={CreateClaimFormScreen}
            options={{title: 'Create Claim'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReimbursementsProvider>
  );
};
