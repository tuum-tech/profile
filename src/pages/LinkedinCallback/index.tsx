/**
 * Page
 */
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injector from 'src/baseplate/injectorWrap';
import { makeSelectCounter, makeSelectAjaxMsg } from './selectors';
import { incrementAction, getSimpleAjax } from './actions';
import React, { memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import { NameSpace } from './constants';
import reducer from './reducer';
import saga from './saga';
import { InferMappedProps, SubState, TokenResponse } from './types';
import { requestLinkedinToken } from './fetchapi';
import { Redirect, RouteComponentProps, useParams } from 'react-router-dom';
import { Interface } from 'readline';
import { createConstructSignature } from 'typescript';
import { strict } from 'assert';

const LinkedinCallback: React.FC<RouteComponentProps> = (props) => {

  /** 
   * Direct method implementation without SAGA 
   * This was to show you dont need to put everything to global state 
   * incoming from Server API calls. Maintain a local state.
  */
  const [token, setToken] = useState('');
  const getToken = async (code: string, state: string): Promise<TokenResponse> => {
    return await requestLinkedinToken(code, state) as TokenResponse;
  }



  useEffect(() => {
    let code: string = new URLSearchParams(props.location.search).get("code") || "";
    let state: string = new URLSearchParams(props.location.search).get("state") || "";

    (async () => {
      let t = await getToken(code, state);
      setToken(t.data.request_token);
    })();
  });





  return (

    <Redirect
      to={{
        pathname: "/profile",
        search: `?token=${token}`

      }}
    />
  )
};

/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  counter: makeSelectCounter(),
  msg: makeSelectAjaxMsg()
});

/** @returns {object} Contains dispatchable props */
export function mapDispatchToProps(dispatch: any) {
  return {
    eProps: { // eProps - Emitter proptypes thats binds to dispatch
      /** dispatch for counter to increment */
      onCount: (count: { counter: number }) => dispatch(incrementAction(count)),
      onSimpleAjax: () => dispatch(getSimpleAjax())
    }
  };
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(
  LinkedinCallback,
  {
    key: NameSpace,
    reducer,
    saga
  }
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withInjectedMode) as React.ComponentType<InferMappedProps>;

// export default Tab1;
