import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BasicCircle } from 'screens/BasicCircle';
import { CircleGesture } from 'screens/CircleGesture';
import { Home } from 'screens/Home';
import { PolarCurveRose } from 'screens/PolarCurveRose';

export type RootStackParamList = {
  PolarCurveRose: undefined;
  CircleGesture: undefined;
  BasicCircle: undefined;
  Home: undefined;
};

type ScreenType = keyof RootStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export const SCREENS = [
  'BasicCircle' as ScreenType,
  'CircleGesture' as ScreenType,
  'PolarCurveRose' as ScreenType,
  'Home' as ScreenType,
];

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name={SCREENS[2]}
          component={PolarCurveRose}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS[1]}
          component={CircleGesture}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={SCREENS[0]} component={BasicCircle} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
