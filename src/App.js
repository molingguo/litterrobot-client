import React from 'react';
import axios from 'axios';
import { Box, Grommet } from 'grommet';
import { History } from './components/History';
import { theme } from './theme';
import { CatInfo } from './components/CatInfo';
import { StatusBoard } from './components/StatusBoard';

// const URL = "https://robotserver.molingguo.com"
// const URL = "http://127.0.0.1:5000/"
const URL = "https://orca-app-ornpd.ondigitalocean.app/";

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  const [robotInfo, setRobotInfo] = React.useState({ history: [] });

  React.useEffect(() => {
    axios.get(URL).then(res => {
      const data = res.data;
      setRobotInfo(data);
    });
  }, []);

  return (
    <Grommet theme={theme}>
      <AppBar>Litter Robot Reports</AppBar>
      <StatusBoard robotInfo={robotInfo} />
      <CatInfo robotInfo={robotInfo} />
      <Box pad="medium">
        <History robotInfo={robotInfo} />
      </Box>
    </Grommet>
  );
}

export default App;
