import React from 'react';
import { Box, Heading, List, Text } from 'grommet';

export function History({ robotInfo }) {
  return (
    <Box>
      <Heading level="4" weight="normal">History</Heading>
      <List data={robotInfo.history} pad="small">
        {(datum) => {
          const dateString = `${new Date(datum.timestamp).toLocaleDateString()} ${new Date(datum.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }`;
          return (
            <Box direction="row" gap="medium">
              <Box width="150px">
                <Text size="small">{dateString}</Text>
              </Box>
              <Box><Text size="small">{datum.text}</Text></Box>
            </Box>
          );
        }}
      </List>
    </Box>
  )
}
