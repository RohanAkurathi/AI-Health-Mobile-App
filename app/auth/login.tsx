import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        <Text style={styles.signupText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/signup')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#4A43EC', textAlign: 'center' }}>New here? Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff'
  },
  title: {
    fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  signupButton: {
    backgroundColor: '#4A43EC',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center'
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});