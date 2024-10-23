import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import React, { FC } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { Text } from "react-native-paper";
import { formatCurrency } from "@/utils/formatCurrency";

interface StockCardProps {
  ticker: string;
  companyName: string;
  price: number;
  priceChangePercentage: number;
  priceChange: number;
  image: string;
}

const StockCard: FC<StockCardProps> = ({
  ticker,
  companyName,
  price,
  priceChangePercentage,
  priceChange,
  image,
}) => {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${ticker}`)}
      style={{
        flexDirection: "row",
        marginVertical: 15,
        paddingHorizontal: 10,
        height: 60,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 50 }}
        contentFit="contain"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 75,
          paddingLeft: 15,
        }}
      >
        <View>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {ticker}
          </Text>
          <Text
            variant="labelMedium"
            selectionColor={"gray"}
            accessibilityIgnoresInvertColors
            style={{ color: "gray" }}
          >
            {companyName}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end",gap:5 }}>
          <Text
            variant="labelMedium"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {formatCurrency(price)}
          </Text>
          <Text
            variant="labelMedium"
            style={{
              color:
                priceChange < 0 ? "red" : priceChange > 0 ? "green" : "auto",
            }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StockCard;
