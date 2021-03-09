import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Appbar, TextInput, Button, Card, List } from "react-native-paper";
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
    if (this.state.item.length > 0) {
      renderList = this.state.item.map((item) => {
        return (
          <Card key={item.id} style={{ marginBottom: 10 }}>
            <List.Item
              title={item.data}
              right={() => <List.Icon icon="delete" />}
            />
          </Card>
        );
      });
    } else {
      renderList = <Text>no items</Text>;
    }
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
        <Button mode="contained" onPress={this.storedata}>
          Add ToDo
        </Button>
        <View>{renderList}</View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
});
