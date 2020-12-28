import React from 'react';
import { Lottie } from '@crello/react-lottie';
import * as animationData from '../../assets/animations/heartbeat.json'

// This container is shown while the app is being logged out of
class LogoutScreen extends React.Component {
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
        <h4>{"Logging Out..."}</h4>
      </div>
    );
  }
}

export default LogoutScreen