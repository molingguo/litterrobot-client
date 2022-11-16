import { Box, Meter, Stack, Text } from 'grommet'
import React from 'react'

const CircleMeter = ({ label, value, higherBetter = true, ...restProps }) => {
  let meterColor = 'status-warning';
  if (value >= 70) {
    meterColor = higherBetter ? 'status-ok' : 'status-critical';
  } else if (value <= 30) {
    meterColor = higherBetter ? 'status-critical' : 'status-ok';
  }
  return (
    <Box direction="column" gap="small">
      <Text>{label}</Text>
      <Stack anchor="center">
        <Meter
          values={[{
            value: value,
            label: 'Litter Level',
            color: meterColor
          }]}
          type="circle"
          size="xsmall"
          thickness="small"
          background="light-2"
          {...restProps}
        />
        <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
          <Text size="xlarge" weight="bold">
            {value}
          </Text>
          <Text size="small">%</Text>
        </Box>
      </Stack>
    </Box>
  )
}

export function StatusBoard({ robotInfo }) {
  return (
    <Box direction="row" fill="horizontal" align="center" justify='center' pad="medium" gap="large">
      <CircleMeter label="Litter Level" value={robotInfo.litter_level} />
      <Box
        direction="column"
        align="center"
        pad={{ horizontal: "16px", vertical: '32px' }}
        border={{ color: 'brand', size: 'xsmall' }}
        style={{ borderRadius: '5px' }}
      >
        <Box><Text>{robotInfo.status_text}</Text></Box>
        { robotInfo.is_drawer_full_indicator_triggered && (
          <Box><Text color='status-critical'>Drawer Full</Text></Box>
        )}
        <Box>
          <Text color={ robotInfo.is_online ? 'status-ok' : 'status-critical' }>
            {robotInfo.is_online ? 'Online' : 'Offline'}
          </Text>
        </Box>
      </Box>
      <CircleMeter label="Drawer Level" value={robotInfo.waste_drawer_level} higherBetter={false} />
    </Box>
  )
}
