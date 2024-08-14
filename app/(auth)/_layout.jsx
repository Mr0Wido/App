import { StatusBar } from 'expo-status-bar';
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            headerShown:false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#F5EFF7" style="light"/>
    </>
  );
}

export default AuthLayout