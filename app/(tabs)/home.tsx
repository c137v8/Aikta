import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// Message interface
interface Message {
  id: string;
  text: string;
  sender: string;
}

// Mock AI response
const getMockAiResponse = (message: string): Message => {
  return {
    id: Math.random().toString(),
    text: `That's an interesting thought! For now, I'm just a simple AI. You said: "${String(
      message
    )}"`,
    sender: "ai",
  };
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [aura, setAura] = useState(51);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasSentMessage, setHasSentMessage] = useState(false); // 👈 track first message
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    if (!hasSentMessage) setHasSentMessage(true);

    const userMessage: Message = {
      id: Math.random().toString(),
      text: inputValue.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const aiResponse = getMockAiResponse(userMessage.text);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.aiMessageText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.auraContainer}>
          <Ionicons name="sparkles" size={22} color="#a78bfa" />
          <Text style={styles.auraText}>{aura}</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Section */}
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + 60 : 0}
      >
        <View style={styles.chatContainer}>
          {/* 👇 Background text before first message */}
          {!hasSentMessage && (
            <View style={styles.backgroundTextContainer}>
              <Text style={styles.backgroundText}>
                Send a message to start the conversation 
              </Text>
            </View>
          )}

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageListContent}
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Send a message..."
            placeholderTextColor="#999"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  avoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  auraContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  auraText: {
    color: "#a78bfa",
    fontSize: 16,
    marginLeft: 6,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageListContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: "#6d28d9",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: "#1a1a1a",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessageText: {
    color: "#e0e0e0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#a78bfa",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // 👇 Background text
  backgroundTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  backgroundText: {
    color: "#444",
    fontSize: 16,
    textAlign: "center",
  },
});
