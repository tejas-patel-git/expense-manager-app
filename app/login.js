import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';

export default function Login() {
  const { authorize, user, isLoading, error } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize({
        prompt: 'login',
        scope: 'openid profile email',
      });
      router.replace('/');
    } catch (e) {
      console.error('Login Error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Please log in</Text>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
      <Button onPress={onLogin} title="Log In" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  statusText: {
    marginBottom: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});