import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpperPage from './page/UpperPage'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#000000e6',
  },
}));

function App(props) {
  const classes = useStyles();
  // const { sections } = props;
  const [ data, setState ] = useState({outcome: []});
  const [query, setQuery] = useState('eks');
  const [search, setSearch] = useState('eks');

  var url = `http://localhost:8080/company`
  // var url = `{backend-ingress ADDRESS}/contents/${search}`

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setState(result.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, [search]);
  
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#f8f9fa' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CloudIcon />
          </IconButton>
          <Typography
            variant="h6"
            align="center"
            className={classes.title}
          >
            SGI-EDU-CLOUD-DEMO-WebApp
          </Typography>
          {new Date().toLocaleTimeString()}
        </Toolbar>
      </AppBar>
      <br/>

      <UpperPage key={1} />
      <br/>
      
      <ul>
      {data.outcome.map( item => (
        <li key={item.id}>
          <a href={item.id}>{item.name}</a><br/>
        </li>
      ))}
      </ul>
    </div>
  );
}

App.propTypes = {
  sections: PropTypes.array,
};

export default App;
