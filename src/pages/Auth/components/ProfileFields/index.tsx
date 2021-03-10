import React, { useState } from 'react'

import {
  OnBoardLayout,
  OnBoardLayoutLeft,
  OnBoardLayoutLeftContent,
  OnBoardLayoutLeftContentTitle,
  OnBoardLayoutLeftContentDescription,
  OnBoardLayoutLeftContentIntro,
  OnBoardLayoutLogo,
  OnBoardLayoutRight,
  OnBoardLayoutRightContent,
  OnBoardLayoutRightContentTitle,
  WavingHandImg,
} from 'src/components/layouts/OnBoardLayout'
import { ButtonWithLogo } from 'src/components/buttons'
import TextInput from 'src/components/inputs/TextInput'
import { Text16, TextLink } from 'src/components/texts'

import whitelogo from 'src/assets/logo/whitetextlogo.png'
import wavinghand from 'src/assets/icon/wavinghand.png'
import style from './style.module.scss'

interface Props {
  setUserInfo: (firstName: string, lastName: string, email: string) => void
  isCreate?: boolean
}

const UseDetailsForm: React.FC<Props> = ({ setUserInfo, isCreate = true }) => {
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const setField = (fieldName: string, fieldValue: string) => {
    setError('')
    if (fieldName === 'firstName') setfirstName(fieldValue)
    if (fieldName === 'lastName') setlastName(fieldValue)
    if (fieldName === 'email') setEmail(fieldValue)
  }

  return (
    <OnBoardLayout className={style['create-profile']}>
      <OnBoardLayoutLeft>
        <OnBoardLayoutLogo src={whitelogo} />
        <OnBoardLayoutLeftContent>
          <WavingHandImg src={wavinghand} />
          <OnBoardLayoutLeftContentTitle className='mt-18px'>
            {isCreate ? 'A better way to be online.' : 'Complete your profile'}
          </OnBoardLayoutLeftContentTitle>
          <OnBoardLayoutLeftContentDescription className='mt-25px'>
            {isCreate
              ? 'Having multiple profiles is messy. Your personal information is copied and stored on every app. Profile gives you total control of your digital world, in one place. Finally unlock the power of your content online.'
              : 'Complete your profile by filling your first name, last name, and email'}
          </OnBoardLayoutLeftContentDescription>
          {isCreate && (
            <OnBoardLayoutLeftContentIntro className='mt-25px mb-0'>
              Already have a profile?
            </OnBoardLayoutLeftContentIntro>
          )}
          {isCreate && (
            <TextLink width={100} to='/sign-did'>
              Sign in Here
            </TextLink>
          )}
        </OnBoardLayoutLeftContent>
      </OnBoardLayoutLeft>
      <OnBoardLayoutRight>
        <OnBoardLayoutRightContent>
          {isCreate && (
            <OnBoardLayoutRightContentTitle>
              Create your profile
            </OnBoardLayoutRightContentTitle>
          )}
          {isCreate && (
            <Text16 style={{ marginBottom: '54px' }}>
              It’s free and easy to get set up.
            </Text16>
          )}
          <TextInput
            value={firstName}
            label='First Name'
            onChange={(n) => setField('firstName', n)}
            placeholder='Enter your first name'
            hasError={error !== '' && firstName === ''}
          />
          <TextInput
            value={lastName}
            label='Last Name'
            onChange={(n) => setField('lastName', n)}
            placeholder='Enter your Last name'
            hasError={error !== '' && lastName === ''}
          />
          <TextInput
            value={email}
            label='E-mail'
            onChange={(n) => setField('email', n)}
            placeholder='Enter your e-mail'
            hasError={error !== '' && email === ''}
            type='email'
          />
          <ButtonWithLogo
            text={
              isCreate ? 'Create your profile now' : 'Complete your profile now'
            }
            onClick={() => {
              if (firstName === '' || lastName === '' || email === '') {
                setError('You should fill all the blanks')
                return
              }
              setUserInfo(firstName, lastName, email)
            }}
          />
        </OnBoardLayoutRightContent>
      </OnBoardLayoutRight>
    </OnBoardLayout>
  )
}

export default UseDetailsForm
