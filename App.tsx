import 'react-native-gesture-handler';

import RootStack from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootStack />
    </GestureHandlerRootView>
  );
}
