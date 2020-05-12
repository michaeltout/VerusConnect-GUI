import React from 'react';
import { Lottie } from '@crello/react-lottie';
import * as animationData from '../../assets/animations/heartbeat.json'

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
          flexDirection: "column",
        }}
      >
        <img
          src={`assets/images/verus-graphics/logoslogan_loading.png`}
          width="325px"
          height="40px"
          style={{
            marginBottom: 60,
          }}
        />
        <Lottie
          config={{animationData: animationData.default, loop: true}}
          height="10%"
          width="50%"
          style={{
            marginBottom: 60
          }}
        />
      </div>
    );
  }
}

export default SplashScreen