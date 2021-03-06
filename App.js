import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar, TextInput, Button } from "react-native-paper";

export default function App() {
  arr = [];
  state = {
    text: "",
    item: [{ id: 1, data: "loading" }],
  };

  storedata = async () => {
    this.arr.push(this.state.text);
    await AsyncStorage.setItem("mylist", JSON.stringify(this.arr));
    value = AsyncStorage.getItem("mylist");
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="ToDo" />
      </Appbar.Header>
      <TextInput
        label="Add ToDo"
        value={this.state.text}
        onChangeText={(text) => this.setText({ text })}
      />
      <Text style={{ fontSize: 20 }}>
        Open up App.js to start working on your app!
      </Text>
      <Button mode="contained" onPress={this.storedata}>
        Add ToDo
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
