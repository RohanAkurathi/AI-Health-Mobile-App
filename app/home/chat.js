import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase/auth";
const user = auth.currentUser;
const username = user?.displayName || user?.email?.split("@")[0] || "there";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { chatCompletion } from "../utils/openai";
import { Feather } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: "0",
      from: "assistant",
      text: `👋 Welcome to the Cora community, ${username}! I'm excited to get to know you better. What would you like to chat about today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const flatRef = useRef();

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const reply = await chatCompletion([
        ...messages.map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: userMsg.text },
      ]);
      const botMsg = {
        id: Date.now().toString() + "_r",
        from: "assistant",
        text: reply,
      };
      setMessages((m) => [...m, botMsg]);
    } catch (e) {
      const errMsg = {
        id: Date.now().toString() + "_e",
        from: "assistant",
        text: "😞 Oops, something went wrong.",
      };
      setMessages((m) => [...m, errMsg]);
    }
  };

  useEffect(() => {
    flatRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => (
    <View
      style={[styles.bubble, item.from === "user" ? styles.userBubble : styles.assistantBubble]}
    >
      <Text
        style={[styles.bubbleText, item.from === "user" ? styles.userText : styles.assistantText]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Write your response…"
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={send} style={styles.sendButton}>
            <Feather name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    height: 4,
    width: "100%",
    backgroundColor: "#FF66C4",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
  },
  bubble: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: "#4A43EC",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  assistantBubble: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "System",
  },
  userText: {
    color: "#fff",
  },
  assistantText: {
    color: "#000",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    backgroundColor: "#4A43EC",
    borderRadius: 24,
    padding: 10,
    marginLeft: 8,
  },
});