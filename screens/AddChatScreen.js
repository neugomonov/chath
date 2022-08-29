import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input,
            })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => alert(error));
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                type="text"
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={<AntDesign name="edit" size={24} color="black" />}
            />
            <Button
                disabled={!input}
                onPress={createChat}
                title="Create a new chat"
            />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: "white", padding: 30, height: "100%" },
});
