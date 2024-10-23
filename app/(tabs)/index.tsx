import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { Image } from "expo-image";

// LOCALE IMPORTS
import { stocks } from "@/data";
import { StockCard } from "@/components";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        Available Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
        renderItem={({ item }: any) => <StockCard {...item} />}
        contentContainerStyle={{ paddingVertical: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 5,
  },
});
