import React from 'react';
import axios from 'axios';
import { Box, Card, CardBody, Heading, Image, List, Text } from 'grommet';
import ricecake from '../images/ricecake.jpeg';
import zorro from '../images/zorro.jpeg';

const URL = "http://smartlitterrobot-env-1.eba-kiu2bdfx.us-east-1.elasticbeanstalk.com/";
// const URL = "http://127.0.0.1:5000/"

const CAT_MAP = {
  ricecake: 15,
  zorro: 12
};

const logCatRecord = function(dict, historyData, weight, cat) {
  if (Math.abs(weight - CAT_MAP[cat]) <= 1) {
    const dateString = new Date(historyData.timestamp).toLocaleDateString();
    if (!dict[cat]) dict[cat] = {};
    if (!dict[cat][dateString]) dict[cat][dateString] = 0;
    dict[cat][dateString] = dict[cat][dateString] + 1;
  }
}

const CatInfo = function({ catRecord, image }) {
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

export default function History() {
  const [historyData, setHistoryData] = React.useState([]);

  React.useEffect(() => {
    axios.get(URL).then(res => {
      console.log(res.data.history);
      const data = res.data;
      setHistoryData(data.history);
    });
  }, []);

  const insight = React.useMemo(() => {
    const result = {};
    for (const hd of historyData) {
      if (hd.action) continue;
      if (!hd.text.startsWith('Pet Weight Recorded: ')) continue;
      const weight = parseFloat(hd.text.split(': ')[1].split(' ')[0]);
      logCatRecord(result, hd, weight, 'ricecake');
      logCatRecord(result, hd, weight, 'zorro');
    }
    console.log('result', result);
    return result;
  }, [historyData]);

  return (
    <Box>
      <Box direction="row" justify="center" gap="large">
        { insight.ricecake && <CatInfo catRecord={insight.ricecake} image={ricecake} /> }
        { insight.zorro && <CatInfo catRecord={insight.zorro} image={zorro} /> }
      </Box>
      <Heading level="4" weight="normal">History</Heading>
      <List data={historyData} pad="small">
        {(datum) => {
          const dateString = `${new Date(datum.timestamp).toLocaleDateString()} ${new Date(datum.timestamp).toLocaleTimeString() }`;
          return (
            <Box direction="row" gap="medium">
              <Box width="small">
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
