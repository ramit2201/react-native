import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ReimbursementsListScreen} from '../screens/ReimbursementsListScreen';
import CreateClaimFormScreen from '../screens/CreateClaimFormScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
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
  );
};
