import { FlatList, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { Text } from "react-native-paper";

// LOCALE IMPORTS
import { StoreContext } from "./_layout";
import { StockCard } from "@/components";

export default function Search() {
  const { searchQuery, searchedStocks } = useContext(StoreContext);

  if (!searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text
          variant="titleLarge"
          style={{ color: "#f9f9f9", fontWeight: "bold" }}
        >
          Search Stock
        </Text>
      </View>
    );
  }

  if (searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          No Stocks Found !
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={searchedStocks}
      contentContainerStyle={{ flexGrow: 1,marginTop:20 }}
      keyExtractor={(item) => item.ticker}
      renderItem={({ item }) => <StockCard {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '50%',
  },
});
