import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ProfileTab from './profile-tabs';
import FinanceTab from './finance-tab';
import AnalysisTab from './analysis-tab'
import NewsTab from './news-tab';

export default function LabTabs(props) {
  const [value, setValue] = React.useState('1');

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className='tabs' sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: '#5a189a' }}>
          <TabList textColor="#5a189a"
           indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example" className='gg' >
            <Tab label="profile" value="1" />
            <Tab label="financials" value="2" />
            <Tab label="news" value="3" />
            <Tab label="analysis" value="4" />

          </TabList>
        </Box>
        <TabPanel value="1"><ProfileTab profile={props.profile}/></TabPanel>
        <TabPanel value="2"><FinanceTab finance={props.finance}/></TabPanel>
        <TabPanel value="3"><NewsTab  articles={props.articles}/></TabPanel>
        <TabPanel value="4"><AnalysisTab  rating={props.rating} pricetarget={props.pricetarget} price={props.price} score={props.score} /></TabPanel>

      </TabContext>
    </Box>
  );
}
