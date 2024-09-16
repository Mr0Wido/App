import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name='orderDetail' options={{ headerShown: false }} />
        <Stack.Screen name='profileDetail' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}