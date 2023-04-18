import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import { store } from './redux/store'; // redux store'u dahil ediyoruz
import Menu from "./screens/Menu";
import Game from "./screens/Game";
import Gameover from "./screens/Gameover";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Gameover" component={Gameover} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}