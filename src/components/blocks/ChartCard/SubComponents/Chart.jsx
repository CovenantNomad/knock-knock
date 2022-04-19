import React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { colors, fontPercentage, fontSize } from '../../../../theme/theme';

const Chart = ({ data }) => {

  return (
    <VictoryChart 
      width={350} 
      height={200}
      theme={VictoryTheme.material} 
      domain={{x: [0, 6], y: [0, 100]}}
    >
      <VictoryAxis 
        crossAxis
        style={{ 
          grid: { stroke: "none" }, 
          axis: { stroke: "transparent" },
          tickLabels: { fontSize: fontPercentage(fontSize.medium), fill: colors.gray300 }
        }}
        tickValues={[0, 1, 2, 3, 4, 5, 6]} 
        tickFormat={["일", "월", "화", "수", "목", "금", "토"]}
      />
      <VictoryBar 
        data={data} x="day" y="score" 
        labels={({ datum }) => `${datum.score}%`}
        style={{
          labels: { fill: "white", fontSize: fontPercentage(fontSize.small), fontWeight:'700' },
          data: { fill: colors.primary}
        }}
        cornerRadius={{ top: 6 , bottom: 6 }}
      />
    </VictoryChart>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chart;