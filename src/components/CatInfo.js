import React from 'react';
import { Box, Card, CardBody, Image, Text } from 'grommet';
import ricecake from '../images/ricecake.jpeg';
import zorro from '../images/zorro.jpeg';

const CAT_MAP = {
  ricecake: 16.5,
  zorro: 12.5
};

const logCatRecord = function(dict, historyData, weight, cat) {
  if (Math.abs(weight - CAT_MAP[cat]) <= 2) {
    const dateString = new Date(historyData.timestamp).toLocaleDateString();
    if (!dict[cat]) dict[cat] = {};
    if (!dict[cat][dateString]) dict[cat][dateString] = 0;
    dict[cat][dateString] = dict[cat][dateString] + 1;
  }
}

const CatInfoCard = function({ catRecord, image }) {
  return (
    <Card elevation='small' width="medium" justify='center' align="center">
      <CardBody width="small" margin="small">
        <Box height="small" width="100%" justify="center" overflow="hidden" style={{ borderRadius: '50%'}}>
          <Image fit="cover" src={image}></Image>
        </Box>
      </CardBody>
      <Box pad="small">
        {/* TODO use better design, like a calendar ? */}
        { Object.keys(catRecord).map((d) => {
          return (
            <Box key={d} direction="row" gap="small">
              <Box width="small"><Text>{d}</Text></Box>
              <Text>{catRecord[d]}</Text>
            </Box>
          )
        })}
      </Box>
    </Card>
  )
}

export const CatInfo = function({ robotInfo }) {
  const insight = React.useMemo(() => {
    const result = {};
    for (const hd of robotInfo.history) {
      if (hd.action) continue;
      if (!hd.text.startsWith('Pet Weight Recorded: ')) continue;
      const weight = parseFloat(hd.text.split(': ')[1].split(' ')[0]);
      logCatRecord(result, hd, weight, 'ricecake');
      logCatRecord(result, hd, weight, 'zorro');
    }
    console.log('result', result);
    return result;
  }, [robotInfo]);

  return (
    <Box direction="row" justify="center" gap="large" pad="medium">
      { insight.ricecake && <CatInfoCard catRecord={insight.ricecake} image={ricecake} /> }
      { insight.zorro && <CatInfoCard catRecord={insight.zorro} image={zorro} /> }
    </Box>
  )
}