import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { Button, Text } from "@rneui/themed";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) =>
            alert(error)
        );
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onSubmitEditing={signIn}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    Type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button
                title={<CustomTitleLogin />}
                buttonStyle={styles.button}
                onPress={signIn}
            />
            <Button
                title={<CustomTitleRegister />}
                onPress={() => navigation.navigate("Register")}
                buttonStyle={styles.buttonOutline}
                type="outline"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};
const CustomTitleLogin = () => {
    return <Text style={styles.textButton}>Login</Text>;
};
const CustomTitleRegister = () => {
    return <Text style={styles.textButtonOutline}>Register</Text>;
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: { width: 300 },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#B38965",
        borderWidth: 1.5,
        borderColor: "black",
        borderRadius: 0,
        color: "#000",
    },
    buttonOutline: {
        width: 200,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: "#B38965",
        borderRadius: 0,
    },
    textButton: {
        fontSize: 18,
    },
    textButtonOutline: {
        fontSize: 18,
        color: "#B38965",
    },
});
