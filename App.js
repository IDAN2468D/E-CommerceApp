import { Provider } from 'react-redux';
import StackNavigator from './navigation/StackNavigator';
import store from './store';
import { UserTypeProvider } from './UserContext';

export default function App() {
  return (
    <Provider store={store}>
      <UserTypeProvider>
        <StackNavigator />
      </UserTypeProvider>
    </Provider>

  );
}