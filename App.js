import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar, TextInput, Button } from "react-native-paper";
import { render } from "react-dom";

export default class App extends React.Component {
  arr = [];
  id = 0;
  state = {
    text: "",
    item: [{ id: 1, data: "loading" }],
  };

  storedata = async () => {
    this.arr.push({ id: this.id, data: this.state.text });
    this.id++;
    await AsyncStorage.setItem("mylist", JSON.stringify(this.arr));
    this.setState({
      item: JSON.parse(await AsyncStorage.getItem("mylist")),
    });

    console.log(this.state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="ToDo" />
        </Appbar.Header>
        <TextInput
          label="Add ToDo"
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
        />
        <Text style={{ fontSize: 20 }}>{this.state.item[0].data}</Text>
        <Button mode="contained" onPress={this.storedata}>
          Add ToDo
        </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
