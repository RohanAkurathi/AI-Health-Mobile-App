import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs initialRouteName="voice" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="voice" options={{ title: 'Voice' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}