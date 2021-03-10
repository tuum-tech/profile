import { IonCol, IonRow } from '@ionic/react'
import { connect } from 'react-redux'
import { StaticContext, RouteComponentProps, useHistory } from 'react-router'
import styled from 'styled-components'

import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import injector from 'src/baseplate/injectorWrap'
import { makeSelectCounter, makeSelectAjaxMsg } from './selectors'
import { incrementAction, getSimpleAjax } from './actions'
import React, { memo, useState, useEffect } from 'react'
import style from './style.module.scss'
import { NameSpace } from './constants'
import reducer from './reducer'
import saga from './saga'
import { InferMappedProps, SubState, UserType, LocationState } from './types'

import {
  OnBoardLayout,
  OnBoardLayoutRight,
} from 'src/components/layouts/OnBoardLayout'
import { UserService } from 'src/services/user.service'
import DidSignForm from '../components/DidSign/DidSignForm'
import DidLeftSide from '../components/DidSign/DidLeftSide'
import PassPhraseHelp from '../components/DidSign/PassPhraseHelp'

const SignDidPage: React.FC<
  RouteComponentProps<{}, StaticContext, LocationState>
> = (props) => {
  const history = useHistory()
  const [showHelp, setShowHelp] = useState(false)
  const [error, setError] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    if (
      !user &&
      props.location.state &&
      props.location.state.user &&
      props.location.state.user.name
    ) {
      setUser(props.location.state.user)
    }
  }, [])

  return (
    <OnBoardLayout className={style['did-signin']}>
      {showHelp && <PassPhraseHelp close={() => setShowHelp(false)} />}
      <DidLeftSide error={error} />
      <OnBoardLayoutRight>
        <DidSignForm
          showModal={() => setShowHelp(true)}
          error={error}
          setError={setError}
          onSuccess={async (uDid: string, mnemonic: string) => {
            const res = await UserService.SearchUserWithDID(uDid)
            window.localStorage.setItem(
              `temporary_${uDid.replace('did:elastos:', '')}`,
              JSON.stringify({
                mnemonic: mnemonic,
              })
            )
            if (res) {
              history.push({
                pathname: '/set-password',
                state: {
                  hiveHost: res.hiveHost,
                  userToken: res.userToken,
                  did: res.did,
                  name: res.name,
                  accountType: res.accountType,
                  isDIDPublished: res.isDIDPublished,
                  onBoardingCompleted: res.onBoardingCompleted,
                },
              })
            } else {
              history.push({
                pathname: '/create-profile-with-did',
                state: {
                  did: uDid,
                  mnemonic,
                  user,
                },
              })
            }
          }}
        />
      </OnBoardLayoutRight>
    </OnBoardLayout>
  )
}

/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  counter: makeSelectCounter(),
  msg: makeSelectAjaxMsg(),
})

/** @returns {object} Contains dispatchable props */
export function mapDispatchToProps(dispatch: any) {
  return {
    eProps: {
      // eProps - Emitter proptypes thats binds to dispatch
      /** dispatch for counter to increment */
      onCount: (count: { counter: number }) => dispatch(incrementAction(count)),
      onSimpleAjax: () => dispatch(getSimpleAjax()),
    },
  }
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(SignDidPage, {
  key: NameSpace,
  reducer,
  saga,
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  memo
)(withInjectedMode) as React.ComponentType<InferMappedProps>

// export default Tab1;
