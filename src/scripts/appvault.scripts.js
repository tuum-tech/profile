const config = require('./config.json');
const { testHelper } = require('./testsHelper');

let run = async () => {
  let client = await testHelper.getHiveInstance(
    config.app1,
    config.tuum_tech_mnemonic,
    config.hive_host,
    config.appId
  );
  client.Payment.CreateFreeVault();

  const fs = require('fs');

  // ===== followers section start =====
  await client.Database.createCollection('followers');
  await client.Scripting.SetScript({
    name: 'set_followers',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'update',
      name: 'set_followers',
      body: {
        collection: 'followers',
        filter: {
          did: '$params.did'
        },
        update: {
          $set: {
            did: '$params.did',
            followers: '$params.followers'
          }
        },
        options: {
          upsert: true,
          bypass_document_validation: false
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_followers',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_followers',
      output: true,
      body: {
        collection: 'followers',
        filter: {
          did: { $in: '$params.did' }
        },
        options: {
          projection: {
            _id: false,
            created: false
          }
        }
      }
    }
  });

  // ===== users section start =====
  await client.Database.createCollection('users');
  await client.Scripting.SetScript({
    name: 'add_user',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'insert',
      name: 'add_user',
      output: true,
      body: {
        collection: 'users',
        document: {
          did: '$params.did',
          accountType: '$params.accountType',
          passhash: '$params.passhash', // remove
          name: '$params.name',
          userToken: '$params.userToken',
          isDIDPublished: '$params.isDIDPublished',
          onBoardingCompleted: '$params.onBoardingCompleted',
          loginCred: '$params.loginCred',
          timestamp: '$params.timestamp',
          tutorialStep: '$params.tutorialStep',
          hiveHost: '$params.hiveHost',
          avatar: '$params.avatar',
          code: '$params.code',
          status: '$params.status'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'update_user',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'update',
      name: 'update_user',
      output: false,
      body: {
        collection: 'users',
        filter: {
          code: '$params.code',
          did: '$params.did',
          status: 'CONFIRMED'
        },
        update: {
          $set: {
            did: '$params.did',
            accountType: '$params.accountType',
            passhash: '$params.passhash',
            name: '$params.name',
            userToken: '$params.userToken',
            loginCred: '$params.loginCred',
            isDIDPublished: '$params.isDIDPublished',
            onBoardingCompleted: '$params.onBoardingCompleted',
            tutorialStep: '$params.tutorialStep',
            hiveHost: '$params.hiveHost',
            avatar: '$params.avatar'
          }
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'update_email_user',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'update',
      name: 'update_email_user',
      output: false,
      body: {
        collection: 'users',
        filter: {
          code: '$params.code',
          status: 'CONFIRMED'
        },
        update: {
          $set: {
            did: '$params.did',
            accountType: '$params.accountType',
            passhash: '$params.passhash',
            name: '$params.name',
            userToken: '$params.userToken',
            loginCred: '$params.loginCred',
            isDIDPublished: '$params.isDIDPublished',
            onBoardingCompleted: '$params.onBoardingCompleted',
            tutorialStep: '$params.tutorialStep',
            hiveHost: '$params.hiveHost',
            avatar: '$params.avatar'
          }
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'delete_users',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'delete',
      name: 'delete_users',
      output: true,
      body: {
        collection: 'users',
        filter: {
          did: { $in: '$params.dids' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });

  await client.Scripting.SetScript({
    name: 'delete_expired_users', //  remove
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'delete',
      name: 'delete_expired_users',
      output: true,
      body: {
        collection: 'users',
        filter: {
          did: '',
          timestamp: { $lt: '$params.timestamp' }
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'delete_users_by_dids',
    name: 'get_users_by_tutorialStep',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_users_by_tutorialStep',
      output: true,
      body: {
        collection: 'users',
        filter: {
          tutorialStep: { $in: '$params.tutorialStep' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_dids',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_users_by_dids',
      output: true,
      body: {
        collection: 'users',
        filter: {
          did: { $in: '$params.dids' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_email',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'users_found',
      output: true,
      body: {
        collection: 'users',
        filter: {
          'loginCred.email': '$params.filter'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_google',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'users_found',
      output: true,
      body: {
        collection: 'users',
        filter: {
          'loginCred.google': '$params.filter'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_twitter',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'users_found',
      output: true,
      body: {
        collection: 'users',
        filter: {
          'loginCred.twitter': '$params.filter'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_facebook',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'users_found',
      output: true,
      body: {
        collection: 'users',
        filter: {
          'loginCred.facebook': '$params.filter'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_linkedin',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'users_found',
      output: true,
      body: {
        collection: 'users',
        filter: {
          'loginCred.linkedin': '$params.filter'
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'verify_code', // is being used in backend
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'aggregated',
      name: 'find_and_update_code',
      body: [
        {
          type: 'find',
          name: 'find_code',
          output: true,
          body: {
            collection: 'users',
            filter: {
              code: '$params.code',
              status: 'WAITING_CONFIRMATION'
            }
          }
        },
        {
          type: 'update',
          name: 'update_status',
          output: false,
          body: {
            collection: 'users',
            filter: {
              code: '$params.code',
              status: 'WAITING_CONFIRMATION'
            },
            update: {
              $set: {
                status: 'CONFIRMED'
              }
            }
          }
        }
      ]
    }
  });

  // ===== For searching on explore page =====
  await client.Scripting.SetScript({
    name: 'get_users_by_name',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_users_by_name',
      output: true,
      body: {
        collection: 'users',
        filter: {
          name: { $regex: '$params.name', $options: 'i' },
          did: { $nin: '$params.self_did' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });
  await client.Scripting.SetScript({
    name: 'get_users_by_did', // searching all users with search words of DID
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_users_by_did',
      output: true,
      body: {
        collection: 'users',
        filter: {
          did: { $regex: '$params.did', $nin: '$params.self_did' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });

  // ===== universities section start =====
  //store and retrieve universities data from tuum-tech vault
  await client.Database.deleteCollection('universities');
  await client.Database.createCollection('universities');

  fs.readFile('./src/data/world_universities_and_domains.json', (err, data) => {
    if (err) throw err;
    let universityList = JSON.parse(data);
    console.log(universityList[0]);
    client.Database.insertMany('universities', universityList);
  });

  await client.Scripting.SetScript({
    name: 'get_all_universities',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_universities',
      output: true,
      body: {
        collection: 'universities',
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });

  await client.Scripting.SetScript({
    name: 'get_universities_by_name',
    allowAnonymousUser: true,
    allowAnonymousApp: true,
    executable: {
      type: 'find',
      name: 'get_universities',
      output: true,
      body: {
        collection: 'universities',
        filter: {
          name: { $regex: '$params.name', $options: 'i' }
        },
        options: {
          limit: 150, //'$params.limit',
          skip: 0 //'$params.skip',
        }
      }
    }
  });

  console.log('All scripts OK');
};

run();
