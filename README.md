# Endsmeet

# Documentation:

 Scaffold your project using **Ionic Framework + React.js + Redux.js (+ immer.js + Redux-Saga + Re-Select)** fully written in [typescript](https://www.typescriptlang.org/)

**Quick intro about ImmerJS**
[http://blog.logicwind.com/painless-react-state-management-with-immer/](http://blog.logicwind.com/painless-react-state-management-with-immer/)
[https://dev.to/horusgoul/use-react-s-usestate-and-usereducer-without-worrying-about-immutability-2a9k](https://dev.to/horusgoul/use-react-s-usestate-and-usereducer-without-worrying-about-immutability-2a9k)  
  
**Enjoy building complex Ionic + React based apps.**

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=github)](https://github.com/nirus/Ionic-React-Baseplate/pulls) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/nirus/Ionic-React-Baseplate)
  
## Baseplate features

- Well suited for **PWA**, **Apache Cordova or Electron** based applications.

- Out of the box lazy-loading components and pages.

- Tightly coupled with [Typescript](https://www.typescriptlang.org/) system.

## Usage: 

Clone the repository and run below command on the root of your project. 

 `npm i`
 
 `ionic serve`

 ## Service Dependencies

# Linkedin

For locally testing Linkedin authentication, one should:
1) Didcred-validator linkedin .env configurations must be set
    
    - LINKEDIN_API_KEY=**key**
    - LINKEDIN_API_SECRET=**secret**
    - LINKEDIN_CALLBACK_URL=**[local ip address]**/linkedin_callback

     **Note** : You can use the configuration in .env.example for testing, it should work if you run on localhost:3000  (return url configured in example linkedin OAuth provider)

2) Run profile app 

**Note:** profile app .env has the following configuration by default: 

- **REACT_APP_DIDCREDS_URL**=http://localhost:8081
- **REACT_APP_DIDCREDS_KEY**=didcreds-validator-secret-key

so make sure the configurations match those of the didcreds-validator service used

# Twitter

For locally testing Twitter authenticaton, one should:
1) Didcred-validator twitter .env configurations must be set:

    - TWITTER_CUSTOMER_KEY=**key**
    - TWITTER_CUSTOMER_SECRET=**secret**
    - TWITTER_CALLBACK_URL=**[local ip address]**/twitter_callback

    **Note** : You may try to use the configuration in .env.example but you need anyway to be whitelisted  

2) Whitelist your local IP address in twitter OAuth Server 
3) Run profile app locally

**Note:** profile app .env has the following configuration by default: 

- **REACT_APP_DIDCREDS_URL**=http://localhost:8081
- **REACT_APP_DIDCREDS_KEY**=didcreds-validator-secret-key

so make sure the configurations match those of the didcreds-validator service used

## CLi for page & component generation

**For page:**  `npm run gen-page TestPage`
  
**For Component:**   `npm run gen-comp TestComponent`

## Implementation details:

 |  File \ Folder | Details  | 
|---|---|
| `src\pages\SimplePage` |  Reference implementation for a page that is followed throughout boiler plate code *(built on container concept)* |
| `src\pages\SimplePage\constants.ts` |  Contains both action names and constants used within a Page \ Container|
| `src\components` | Contains all the elements and components to be used in Page \ Container. |
| `src\basplate` | Contains all the project related wiring and also application level configurations.|
| `src\shared-base` | Refer [readme.md](https://github.com/nirus/Ionic-React-Baseplate/tree/master/src/shared-base) inside *shared-base* folder  |

## Options

| Options \ Object | Details |
|---|---|
| [`eProps`](https://github.com/nirus/Ionic-React-Baseplate/blob/7ae9269e54010ede9db46a4fa9e349c5f97c9da5/src/pages/SimplePage/index.tsx#L102) | Emiter props *(differentiated from normal props)*, used to emit actions to the reducer or middleware from the container. |
| [`action`](#action-object---source) | object that carries the data in a component |
| [`reducer`](https://github.com/nirus/Ionic-React-Baseplate/blob/7ae9269e54010ede9db46a4fa9e349c5f97c9da5/src/pages/SimplePage/reducer.ts#L16) | is implemented using [**immer.js**](https://github.com/immerjs/immer), a draft based state manipulation. |
| [`SCSS`](https://github.com/nirus/Ionic-React-Baseplate/blob/master/src/pages/SimplePage/style.module.scss) | (***style.module.scss***) module based for the classname hashing & namespace collision prevention. |

### Action Object - [source](https://github.com/nirus/Ionic-React-Baseplate/blob/7ae9269e54010ede9db46a4fa9e349c5f97c9da5/src/baseplate/models.ts#L21)

| Options \ Object | Type | Description|
|---|---|---|
| type | String | Unique string for each page or container. It should be unique across the application.
| payLoad | String / Object | Data payload carrier for component to middleware and vice versa
| meta | Function / String / Object | Any data directly to be sent to middlewares and vice versa without putting to global store. ex: function callback |

## Boilerplate Repo credit
[IonicReactBaseplate](https://github.com/nirus/Ionic-React-Baseplate)

## Repo inspired by

🔥 [ReactBoilerplate](https://github.com/react-boilerplate/react-boilerplate)

## Suggestions 0r Comments

Please raise a PR or issue request for your valuable contributions and Suggestions
  

## Roadmaps

- Translation (i18n support) - *Tweaks needed*
- Boilerplate code without Redux and Saga 
- Adding more options to generator
- Support for React Native
