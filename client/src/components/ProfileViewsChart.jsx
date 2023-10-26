import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';
import { VictoryLine, VictoryScatter, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const ProfileViewsCard = ({ data }) => {
  const { colorMode } = useColorMode();

  // Define a custom style for the chart to remove grid lines
  const chartStyle = {
    parent: {
      border: '1px solid #ccc', // Optional border for the chart container
      background: colorMode === 'dark' ? '#5eb462' : '#5eb462', // Adjust background based on color mode
    },
    grid: { stroke: 'none' }, // Remove grid lines
  };

  // Define colors based on color mode
  const lineColor = colorMode === 'dark' ? 'white' : 'white'; // Adjust line color based on color mode
  const dotColor = colorMode === 'dark' ? 'white' : 'white'; // Adjust dot color based on color mode

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" mb={4}>
        Profile Views Chart
      </Text>
      <VictoryChart theme={VictoryTheme.grayscale} domainPadding={20} style={chartStyle}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7]} // Days of the week
          tickFormat={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          style={{
            axis: { stroke: colorMode === 'dark' ? 'white' : 'black' }, // Adjust axis color
            tickLabels: { fill: colorMode === 'dark' ? 'white' : 'black' }, // Adjust tick label color
          }}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} style={{ tickLabels: { fill: colorMode === 'dark' ? 'white' : 'black' } }} />
        <VictoryLine data={data} x="dayOfWeek" y="profileViews" style={{ data: { stroke: lineColor } }} />
        <VictoryScatter data={data} x="dayOfWeek" y="profileViews" style={{ data: { fill: dotColor } }} size={5} />
      </VictoryChart>
    </Box>
  );
};

export default ProfileViewsCard;
