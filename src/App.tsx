import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// import './theme/theme-clearlyme.css';

/* Pages */
// import LoginPage from './pages/LoginPage/Loadable';
// import ElastosLoginPage from './pages/ElastosLoginPage/Loadable';
// import MnemonicPage from './pages/MnemonicPage/Loadable';
import ProfilePage from './pages/ProfilePage/Loadable';
// import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ElastosMnemonicPage from './pages/ElastosMnemonicPage';
import ElastosLoginQRPage from './pages/ElastosLoginQRPage';
import CreateIdentityPage from './pages/CreateIdentityPage';
import ConfirmMnemonicPage from './pages/ConfirmMnemonicPage';
import PublishIdentityPage from './pages/PublishIdentityPage';
import ChooseVaultPage from './pages/ChooseVaultPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route path="/login" component={LoginPage} exact={true} /> */}
        <Route path="/login/elastos/mnemonic" component={ElastosMnemonicPage} exact={true} />
        <Route path="/login/elastos/qrcode" component={ElastosLoginQRPage} exact={true} />
        {/* <Route path="/register" component={RegisterPage} exact={true} />         */}
        
        <Route path="/create" component={CreateIdentityPage} exact={true} />        
        <Route path="/confirm" component={ConfirmMnemonicPage} exact={true} />        
        <Route path="/publish" component={PublishIdentityPage} exact={true} />        

        <Route path="/choosevault" component={ChooseVaultPage} exact={true} />        

        <Route path="/home" component={HomePage} exact={true} />
        <Route path="/profile" component={ProfilePage} exact={true} />
        {/* <Route path="/login/mnemonic" component={MnemonicPage} exact={true} /> */}
        {/* <Route path="/register/mnemonic" component={MnemonicPage} exact={true} /> */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
