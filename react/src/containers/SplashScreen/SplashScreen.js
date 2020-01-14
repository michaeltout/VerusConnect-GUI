import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

// This container simply displays the Verus logo, 
// and a loading bar to indicate that the app is initializing
class SplashScreen extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <img
          src={`assets/images/splash.svg`}
          width="200px"
          height="200px"
          style={{
            marginBottom: 24
          }}
        />
        <LinearProgress style={{ width: 256, height: 8 }}/>
      </div>
    );
  }
}

export default SplashScreen