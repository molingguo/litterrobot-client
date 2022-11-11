import { Box, Grommet } from 'grommet';
import History from './components/History';
import { theme } from './theme';

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    // elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  return (
    <Grommet theme={theme}>
      <AppBar>Litter Robot Reports</AppBar>

      <Box pad="medium">
        <History />
      </Box>
    </Grommet>
  );
}

export default App;
