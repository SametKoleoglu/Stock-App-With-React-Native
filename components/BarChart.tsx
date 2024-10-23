import { View, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";
import React, { FC } from "react";
import { BarChart as Bar } from "react-native-gifted-charts";

interface BarChartProps {
  data: any[];
  label: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}

const BarChart: FC<BarChartProps> = ({ data, label, color, style }) => {
  const maxValue = Math.max(...data.map((i) => i.value));

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
      <Bar
        height={150}
        maxValue={maxValue * 1.5}
        barWidth={50}
        initialSpacing={0}
        noOfSections={5}
        rulesColor={"black"}
        barBorderRadius={4}
        frontColor={color}
        data={data}
        rotateLabel
        xAxisColor={"gray"}
        xAxisThickness={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});


export default BarChart