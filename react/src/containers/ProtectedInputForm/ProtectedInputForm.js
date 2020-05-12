/**
 * This container is a simple form for either logging in with, or creating
 * passwords. If the 'confirm' prop is specified, this will be a two step
 * form, where the user must confirm their password before the onSubmit prop
 * function is called, which takes in the resulting password as its parameter.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import Cached from '@material-ui/icons/Cached';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ArrowForward from '@material-ui/icons/ArrowForward';
import FormHelperText from '@material-ui/core/FormHelperText';
import passwordStrength from 'passwd-strength';
import { PWD_STRENGTH_THRESHOLD } from '../../util/constants/componentConstants'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import passphraseGenerator from 'agama-wallet-lib/src/crypto/passphrasegenerator';
import Divider from '@material-ui/core/Divider';

const ENTER_PASSWORD = 0
const CONFIRM_PASSWORD = 1

class ProtectedInputForm extends React.Component {
  constructor(props) {
    super(props);

    const { seedGenerator } = this.props
    
    this.state = {
      showPassword: false,
      password: seedGenerator ? passphraseGenerator.generatePassPhrase(256) : '',
      confirmedPassword: '',
      confirmPassword: '',
      step: ENTER_PASSWORD,
      error: null,
      risksAcknowledged: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkPwdMatch = this.checkPwdMatch.bind(this)
    this.goBack = this.goBack.bind(this)
    this.refreshPassphrase = this.refreshPassphrase.bind(this)
    this.checkBox = this.checkBox.bind(this)
  }

  componentWillReceiveProps(nextProps) {    
    const { seedGenerator } = nextProps

    this.setState({
      showPassword: false,
      password: seedGenerator ? passphraseGenerator.generatePassPhrase(256) : '',
      confirmedPassword: '',
      confirmPassword: '',
      step: ENTER_PASSWORD,
      error: null,
      risksAcknowledged: false
    })
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleMouseDownPassword(e) {
    e.preventDefault();
  }

  refreshPassphrase() {
    this.setState({ password: passphraseGenerator.generatePassPhrase(256) })
  }

  handleChange(e) {
    const key = this.state.step === ENTER_PASSWORD ? "password" : "confirmedPassword"
    this.setState({ [key]: e.target.value, error: null })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit()
    }
  }

  onSubmit() {
    const { confirm, onSubmit, seedGenerator, inlineSubmit } = this.props
    const { step, password, confirmedPassword, risksAcknowledged } = this.state
    
    if (step === CONFIRM_PASSWORD) {
      if (this.checkPassword(confirmedPassword) && this.checkPwdMatch()) {
        onSubmit(this.state.password)
      }      
    } else {
      if (this.checkPassword(password)) {
        if (seedGenerator) {
          if (!risksAcknowledged) {
            this.setState({ error: "Please acknowledge the risks of handling your new seed." })
          } else {
            this.setState({ step: CONFIRM_PASSWORD })
          }
        } else if (confirm && !inlineSubmit) {
          this.setState({ step: CONFIRM_PASSWORD })
        } else {
          onSubmit(this.state.password)
        }
      }
    }
  }

  checkPassword(password) {    
    if (password.length === 0) {
      this.setState({ error: "Required field." })
      return false
    } else if (this.props.verifyPassword && passwordStrength(password) < PWD_STRENGTH_THRESHOLD) {
      this.setState({ error: "Password is too weak, try using special characters or numbers." })
      return false
    } else {
      this.setState({ error: null })
      return true
    }
  }

  checkBox(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  checkPwdMatch() {
    const { password, confirmedPassword } = this.state

    if (password === confirmedPassword) {
      this.setState({ error: null})
      return true
    } else {
      this.setState({ error: `${this.props.seedGenerator ? 'Seeds' : 'Passwords'} do not match.`})
      return false
    }
  }

  goBack() {
    this.setState({ step: ENTER_PASSWORD })
  }

  render() {
    const { 
      heading, 
      submitBtnText,
      confirmBtnText,
      multiline,
      confirmHeading,
      inputContainerStyle,
      submitDisabled,
      inputDisabled,
      helperText,
      seedGenerator,
      inlineSubmit,
      headingStyle,
      headingContainerStyle,
      inputRef
    } = this.props;

    const propsError = this.props.error

    const inputStyleSafe = inputContainerStyle ? inputContainerStyle : {}

    const { showPassword, password, step, confirmedPassword, error, risksAcknowledged } = this.state

    return (
      <div
        className="d-sm-flex flex-column justify-content-sm-center align-items-center"
        style={{ width: "100%" }}
      >
        <div
          className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
          style={{ maxWidth: 650, ...headingContainerStyle }}
        >
          <h1
            className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
            style={{
              marginBottom: 0,
              color: "rgb(0,0,0)",
              fontSize: 16,
              width: "max-content",
              maxWidth: "100%",
              ...headingStyle
            }}
          >
            {step === ENTER_PASSWORD ? heading : confirmHeading}
          </h1>
        </div>
        <div
          className="d-lg-flex justify-content-lg-center"
          style={{
            paddingTop: 35,
            flexDirection: "column",
            alignItems: "center",
            minWidth: 400,
            ...inputStyleSafe
          }}
        >
          <OutlinedInput
            id="outlined-adornment-password"
            inputProps={{
              //Multiline doesnt work with input type=password, it's a bug in Material UI
              style: { 
                WebkitTextSecurity: showPassword || (seedGenerator && step === ENTER_PASSWORD) ? "unset" : "disc",
                color: seedGenerator && step === ENTER_PASSWORD ? "rgb(0, 0, 0)" : "unset"
              },
              onKeyDown: multiline ? undefined : this.handleKeyDown
            }}
            style={{
              width: "100%"
            }}
            value={step === ENTER_PASSWORD ? password : confirmedPassword}
            onChange={this.handleChange}
            error={error || propsError ? true : false}
            helperText={helperText ? helperText : error}
            multiline={multiline}
            inputRef={inputRef}
            disabled={inputDisabled || (step === ENTER_PASSWORD && seedGenerator)}
            endAdornment={
              <InputAdornment position="end">
                {!(seedGenerator && step === ENTER_PASSWORD) &&
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>}
                {seedGenerator && step === ENTER_PASSWORD &&
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.refreshPassphrase}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    <Cached />
                </IconButton>}
                { inlineSubmit &&
                  <React.Fragment>
                    <Divider orientation="vertical" />
                    <IconButton 
                      color="primary" 
                      onClick={this.onSubmit}>
                      <ArrowForward />
                    </IconButton>
                  </React.Fragment>}
              </InputAdornment>
            }
          />
          {seedGenerator && step === ENTER_PASSWORD &&
            <div>
              <div
                className="form-check d-flex align-items-center"
                style={{ paddingTop: 20 }}
              >
                <CustomCheckbox
                  checkboxProps={{
                    checked: risksAcknowledged,
                    onChange: this.checkBox,
                    name: "risksAcknowledged"
                  }}
                  colorChecked="rgb(78,115,223)"
                  colorUnchecked={error ? "red" : "rgb(78,115,223)"}
                />
                <label
                  className="form-check-label"
                  htmlFor="formCheck-1"
                  style={{ color: "rgb(0,0,0)" }}
                >
                  {"I acknowledge that if I lose my seed, I will lose access to all my funds."}
                </label>
              </div>
            </div>
          }
          <FormHelperText error={error || propsError ? true : false} variant="outlined">
            {helperText ? helperText : error}
          </FormHelperText>
        </div>
        { !inlineSubmit &&
          <div className="d-flex d-sm-flex justify-content-center justify-content-sm-center">
            {step === CONFIRM_PASSWORD && (
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  fontSize: 14,
                  backgroundColor: "rgb(78,115,223)",
                  marginRight: 15,
                  marginTop: 50,
                  borderWidth: 1,
                  borderColor: "rgb(78,115,223)"
                }}
                onClick={this.goBack}
              >
                {"Back"}
              </button>
            )}
            <button
              className="btn btn-primary"
              type="button"
              disabled={submitDisabled}
              style={{
                fontSize: 14,
                backgroundColor: "rgb(78,115,223)",
                marginLeft: step === CONFIRM_PASSWORD ? 15 : 0,
                marginTop: step === CONFIRM_PASSWORD ? 50 : 10,
                borderWidth: 1,
                borderColor: "rgb(78,115,223)"
              }}
              onClick={this.onSubmit}
            >
              {step === ENTER_PASSWORD ? submitBtnText : confirmBtnText}
            </button>
          </div>}
      </div>
    );
  }
}

ProtectedInputForm.propTypes = {
  heading: PropTypes.string.isRequired,
  headingStyle: PropTypes.object,
  headingContainerStyle: PropTypes.object,
  submitBtnText: PropTypes.string,
  multiline: PropTypes.bool,
  onSubmit: PropTypes.func,
  confirmHeading: PropTypes.string,
  confirm: PropTypes.bool,
  confirmBtnText: PropTypes.string,
  inputContainerStyle: PropTypes.object,
  verifyPassword: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  inputDisabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  seedGenerator: PropTypes.bool,
  inlineSubmit: PropTypes.bool,
  inputRef: PropTypes.func
};

export default ProtectedInputForm