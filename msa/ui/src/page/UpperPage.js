import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, CardActions } from '@material-ui/core';
import { GridList } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardRoot: {
    maxWidth: 275,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }
}));

function UpperPage() {
    const classes = useStyles();
    const [ data, setState ] = useState({outcome:[]})
    
    const url = '{backend-ingress ADDRESS}/services/all'
    
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const result = await axios(
    //       url,
    //     );
    //     setState(result.data);
    //   };
      
    //   fetchData();
    // }, []);
  
    
    return (
      <div className={classes.root}>
        <ul>
      {data.outcome.map( item => (
        <li key={item.url}>
          <a href={item.url}>{item.title}</a><br/>
        </li>
      ))}
      </ul>
      
      </div>
    )
}

export default UpperPage;