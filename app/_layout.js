import { Stack, Slot } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

import { useAuth0, Auth0Provider } from 'react-native-auth0';

export default function RootLayout() {
  const { user } = useAuth0();
  const loggedIn = user !== undefined && user !== null;
  
  return (
    <Auth0Provider 
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN} 
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID}
    >
      <>
        {loggedIn ? <Slot /> : <Home />}
      </>
    </Auth0Provider>
  );
}

const Home = () => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading</Text></View>;
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});