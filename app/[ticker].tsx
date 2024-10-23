import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LineChart } from "react-native-gifted-charts";
import { useContext, useState } from "react";

// LOCALE IMPORTS
import { selectStockPrices, selectStock } from "@/utils/searchStocks";
import { formatCurrency } from "@/utils/formatCurrency";
import { StoreContext } from "./_layout";
import { BarChart } from "@/components";

export default function Ticker() {
  const { ticker } = useLocalSearchParams();
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);
  const options = ["Description", "Historical Metrics"];
  const { width } = useWindowDimensions();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { likedStocks, updateLikedStocks } = useContext(StoreContext);

  const positiveOverallPriceChange =
    stockPrices &&
    stockPrices[0].value < stockPrices[stockPrices.length - 1].value;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" color="#fff" size={40} />
        </TouchableOpacity>
        <Text style={styles.title}>{ticker}</Text>
        <TouchableOpacity
          onPress={() => {
            if (likedStocks.includes(ticker as string)) {
              updateLikedStocks(ticker as string, "del");
            } else updateLikedStocks(ticker as string, "add");
          }}
        >
          <MaterialCommunityIcons
            name={
              likedStocks.includes(ticker as string) ? "heart" : "heart-outline"
            }
            size={40}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
      {stock ? (
        <FlatList
          data={[1]}
          renderItem={() => (
            <View>
              <View style={styles.stockContainer}>
                <Image
                  source={stock.image}
                  style={{ width: 50, height: 50 }}
                  contentFit="contain"
                />
                <View style={styles.stockDetails}>
                  <Text style={styles.ticker} variant="titleMedium">
                    {stock.ticker}
                  </Text>
                  <Text variant="labelMedium">{stock.companyName}</Text>
                </View>
              </View>
              <View style={styles.stockContainer2}>
                <Text
                  variant="headlineLarge"
                  style={{ fontWeight: "bold", fontSize: 16 }}
                >
                  {formatCurrency(stock.price)}
                </Text>
                <Text
                  variant="labelLarge"
                  style={{
                    color:
                      stock.priceChange < 0
                        ? "red"
                        : stock.priceChange > 0
                        ? "green"
                        : "auto",
                  }}
                >
                  {formatCurrency(stock.priceChange)}{" "}
                  {stock.priceChangePercentage.toFixed(2)}%
                </Text>
              </View>
              <View style={styles.stockContainer2}>
                <LineChart
                  areaChart
                  data={stockPrices}
                  rotateLabel
                  labelsExtraHeight={20}
                  hideDataPoints
                  spacing={width / stockPrices.length - 2}
                  color={positiveOverallPriceChange ? "green" : "red"}
                  thickness={2}
                  startFillColor={positiveOverallPriceChange ? "green" : "red"}
                  endFillColor={positiveOverallPriceChange ? "green" : "red"}
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  hideYAxisText={true}
                  rulesType="solid"
                  rulesColor="black"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripHeight: 140,
                    pointerStripColor: "lightgray",
                    pointerStripWidth: 2,
                    pointerColor: "lightgray",
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 90,
                            width: 100,
                            justifyContent: "center",
                            marginTop: -30,
                            marginLeft: -40,
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              marginBottom: 6,
                              textAlign: "center",
                            }}
                          >
                            {items[0].date}
                          </Text>

                          <View
                            style={{
                              paddingHorizontal: 14,
                              paddingVertical: 6,
                              borderRadius: 16,
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {"$" + items[0].value.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
              </View>

              <FlatList
                style={{ marginTop: 80 }}
                data={options}
                keyExtractor={(item) => item}
                horizontal
                renderItem={({ item }) => (
                  <Button
                    style={{ marginRight: 10 }}
                    onPress={() => setSelectedOption(item)}
                    mode={item === selectedOption ? "contained" : "outlined"}
                  >
                    {item}
                  </Button>
                )}
              />

              {selectedOption === "Historical Metrics" ? (
                <View style={{ paddingVertical: 50 }}>
                  <BarChart
                    data={stock.returnOnEquity}
                    label="ROE"
                    color={"lightblue"}
                  />

                  <BarChart
                    data={stock.returnOnEquity}
                    label="ROCE"
                    color={"lightgreen"}
                  />

                  <BarChart
                    data={stock.revenue}
                    label="Revenue"
                    color={"dodgerblue"}
                  />

                  <BarChart
                    data={stock.earnings}
                    label="Earnings"
                    color={"darkgreen"}
                  />

                  <BarChart
                    data={stock.freeCashFlow}
                    label="FCF"
                    color={"maroon"}
                  />

                  <BarChart data={stock.cash} label="Cash" color={"green"} />

                  <BarChart data={stock.debt} label="Debt" color={"purple"} />

                  <BarChart
                    data={stock.grossProfitMargin}
                    label="Gross Profit Margin"
                    color={"orange"}
                  />

                  <BarChart
                    data={stock.netProfitMargin}
                    label="Net Profit Margin"
                    color={"cornsilk"}
                  />
                </View>
              ) : (
                <View style={{ marginVertical: 40, paddingVertical: 10 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                    CEO
                  </Text>
                  <Text>{stock.ceo}</Text>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Exchange
                  </Text>
                  <Text>{stock.exchange}</Text>

                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Sector
                  </Text>
                  <Text>{stock.sector}</Text>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Industry
                  </Text>
                  <Text>{stock.industry}</Text>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Location
                  </Text>
                  <Text>
                    {stock.city} {stock.state}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    IPO
                  </Text>
                  <Text>{stock.ipoDate}</Text>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Description
                  </Text>
                  <Text>{stock.description}</Text>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <Text>No Stock Found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
  stockContainer: {
    flexDirection: "row",
  },
  stockDetails: {
    paddingLeft: 20,
  },
  ticker: {
    fontWeight: "bold",
  },
  stockContainer2: {
    paddingTop: 20,
  },
});
