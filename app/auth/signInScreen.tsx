import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebaseCongig";

export default function SignUpScreen() {
    // Specify the type for navigation, e.g., 'any' for simplicity
    const navigation = useNavigation<any>(); 
    
    // Explicitly type the state variables as strings
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [nameError, setNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleSignUp = async () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");

        let isValid: boolean = true;

        if (!name) {
            setNameError("Please enter your full name.");
            isValid = false;
        }

        if (!email) {
            setEmailError("Please enter your email address.");
            isValid = false;
        } else if (!email.endsWith("@nitsri.ac.in")) {
            setEmailError("Only NITSRI email addresses are allowed.");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Please create a password.");
            isValid = false;
        }

        if (isValid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await sendEmailVerification(user);

                alert(`Welcome ${name}! Please check your email to verify your account.`);
                navigation.replace("../(tabs)/About");
            } catch (error: any) { // Type 'error' as 'any' for generic error handling
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError("That email address is already in use.");
                } else if (error.code === 'auth/invalid-email') {
                    setEmailError("That email address is invalid.");
                } else if (error.code === 'auth/weak-password') {
                    setPasswordError("Password must be at least 6 characters long.");
                } else {
                    alert("An error occurred. Please try again.");
                    console.error(error);
                }
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View>
                <TextInput
                    style={[styles.input, nameError ? styles.inputError : null]}
                    placeholder="Full Name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.errorText}>{nameError}</Text>
            </View>

            <View>
                <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholder="Email (must be @nitsri.ac.in)"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.errorText}>{emailError}</Text>
            </View>

            <View>
                <TextInput
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("auth/login")}
                style={styles.linkContainer}
            >
                <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 28,
        color: "#fff",
        marginBottom: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#1a1a1a',
    },
    inputError: {
        borderColor: '#ff4d4f',
        borderWidth: 1,
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 12,
        height: 20,
        marginLeft: 5,
        marginTop: 5,
    },
    button: {
        backgroundColor: "#a78bfa",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600"
    },
    linkContainer: {
        marginTop: 20,
        alignItems: "center"
    },
    link: {
        color: "#a78bfa",
        fontSize: 14
    },
});