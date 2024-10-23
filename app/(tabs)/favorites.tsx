import { useContext } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { StoreContext } from "../_layout";
import { stocks } from "@/data";
import { StockCard } from "@/components";

interface StockRightActionsProps {
  progress: Animated.AnimatedInterpolation<string | number>;
  dragX: Animated.AnimatedInterpolation<string | number>;
  onPress: () => void;
}
function RightActions({ onPress, dragX, progress }: StockRightActionsProps) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        backgroundColor: "red",
      }}
    >
      <Animated.Text
        style={{
          fontWeight: "bold",
          fontSize: 23,
          color: "#fff",
          transform: [{ scale }],
        }}
      >
        Delete
      </Animated.Text>
    </TouchableOpacity>
  );
}

export default function Favorites() {
  const { likedStocks, updateLikedStocks } = useContext(StoreContext);

  if (likedStocks.length > 0) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={stocks.filter((stock) => likedStocks.includes(stock.ticker))}
          keyExtractor={(item) => item.ticker}
          renderItem={({ item }: any) => (
            <Swipeable
              renderRightActions={(progress, dragX) => (
                <RightActions
                  progress={progress}
                  dragX={dragX}
                  onPress={() => updateLikedStocks(item.ticker, "del")}
                />
              )}
            >
              <StockCard {...item} />
            </Swipeable>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">No Stocks Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
