import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../main/main';

/*function mapStateToProps(state) {
  return {
    login: state.login,
    toaster: state.toaster,
    AddCoin: state.AddCoin,
    Main: state.Main,
    Dashboard: state.Dashboard,
    ActiveCoin: state.ActiveCoin,
    Settings: state.Settings,
    Interval: state.Interval,
  };
}*/

//const App = connect(mapStateToProps)(Main);

//export default App;
export default Main;
