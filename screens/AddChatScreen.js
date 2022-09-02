import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements/dist/input/Input";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import { Button, Text } from "@rneui/themed";

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
                buttonStyle={styles.button}
                title={<CustomTitle />}
            />
        </View>
    );
};
const CustomTitle = () => {
    return <Text style={styles.textButton}>Create a new chat</Text>;
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: "white", padding: 30, height: "100%" },
    button: {
        backgroundColor: "#B38965",
        borderWidth: 1.5,
        borderColor: "black",
        borderRadius: 0,
    },
    textButton: {
        fontSize: 18,
    },
});
