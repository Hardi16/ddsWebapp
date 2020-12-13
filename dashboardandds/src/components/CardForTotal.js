import React from 'react';
import classes from '../pages/Dashboard/Dashboard.module.css'

const CardForTotal=(props)=>{
    return(
        <div className={props.css}>
                  <div className={classes.cardContentLeft}>
                    <div className={classes.heading}>{props.heading}</div>
                    <div className={classes.subheading}>{props.subheading}</div>
                  </div>
                  <div className={classes.cardContentRight}>
                    {props.content}
                  </div>
                </div>
    )
}

export default CardForTotal;