import React from 'react';
import classes from './LoadingSpinner.module.css';
import giphy from '../../assets/giphy.gif';
import loadingGif from '../../assets/loading-gif.gif';

const LoadingSpinner = (props) => {

  // this is the original version from tutorial, acadmind
  // this is not working becoz of '::after' 
  const spinnerWithAfter = <div className={classes['spinner']}></div>;

  // this is using the animation gif to replace the css-animation
  // this is not working
  const spinnerByLoadingGif = (
    <div className={classes.spinner}>
      <img src={loadingGif} />
    </div>
  );

  // this is downloaded from internet
  // this is not working
  const spinnerByLoadingClsNStyle2 = (
    <div className={`${classes.loading} ${classes['style-2']}`}>
      //<div className={`${classes['loading-wheel']}`}></div>
      //<div className={classes.spinner}></div>
      <img className={classes['wheel-img']} src={loadingGif} />
    </div>
  );

  // remove the ::after from the tutorial code
  // this is ok
  const spinnerWithoutAfter = (
    <div className={classes['spinner-backdrop']}>
      <div className={classes['spinner-wheel']}></div>
    </div>
  );

  const spinnerJsx = spinnerWithoutAfter;

  return <>{spinnerJsx}</>;
};

export default LoadingSpinner;
