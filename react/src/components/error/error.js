import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
const { shell } = window.require('electron');

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    const DISCORD_LINK = "https://discord.gg/VRKMP2S"
    const WIKI_LINK = "https://wiki.veruscoin.io/#!index.md"

    return (
      <div className="error-container">
        <div className="error-text">
          <SentimentVeryDissatisfiedIcon
            fontSize="inherit"
            color="inherit"
            style={{ marginRight: 8 }}
          />
          {"Something went wrong..."}
        </div>
        {this.props.error && this.props.errorInfo ? (
          <textarea
            className="error-textarea"
            rows="10"
            cols="80"
            value={
              this.props.error.toString() +
              this.props.errorInfo.componentStack
            }
          />
        ) : null}
        <div className="error-links">
          <div>
            <a
              href="#"
              className="pre-auth-help-link"
              onClick={() => shell.openExternal(WIKI_LINK)}
            >
              {"Verus Wiki"}
            </a>
          </div>
          <div>
            <a
              href="#"
              className="pre-auth-help-link"
              onClick={() => shell.openExternal(DISCORD_LINK)}
            >
              {"Ask on Discord"}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Error
