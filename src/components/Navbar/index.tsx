import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import style from './style.module.scss';
import { UserService } from 'src/services/user.service';

interface Props {
  tab?: string;
}

const Navbar: React.FC<Props> = ({ tab = 'dashboard' }) => {
  const [active, setActive] = useState(tab);
  const history = useHistory();

  return (
    <IonContent>
      <div className={style['navbar']}>
        <IonList>
          <IonItem
            className={
              active === 'dashboard' ? style['item-active'] : style['item-link']
            }
            onClick={() => setActive('dashboard')}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_dashboard.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Dashboard</h3>
            </IonLabel>
          </IonItem>
          <IonItem
            className={
              active === 'profile_manager'
                ? style['item-active']
                : style['item-link']
            }
            onClick={() => setActive('profile_manager')}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_profile_manager.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Profile Manager</h3>
            </IonLabel>
          </IonItem>
          <IonItem
            className={
              active === 'connections-followers' ||
              active === 'connections-followings'
                ? style['item-active']
                : style['item-link']
            }
            onClick={() => {
              setActive('connections-followers');
              history.push('/connections/followers');
            }}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_connections.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Connections</h3>
            </IonLabel>
          </IonItem>

          {['connections-followers', 'connections-followings'].some(function (
            v
          ) {
            return active.indexOf(v) >= 0;
          }) && (
            <>
              <IonItem
                className={
                  active === 'connections-followers'
                    ? style['item-active'] +
                      ' ' +
                      style['item-connections-active']
                    : style['item-link'] + ' ' + style['item-connections-link']
                }
                onClick={() => {
                  setActive('connections-followers');
                  history.push('/connections/followers');
                }}
              >
                <IonIcon
                  slot='start'
                  src='../../assets/icon_connections.svg'
                  className={style['img']}
                ></IonIcon>
                <IonLabel>
                  <h3>Followers</h3>
                </IonLabel>
              </IonItem>
              <IonItem
                className={
                  active === 'connections-followings'
                    ? style['item-active'] +
                      ' ' +
                      style['item-connections-active']
                    : style['item-link'] + ' ' + style['item-connections-link']
                }
                onClick={() => {
                  setActive('connections-followings');
                  history.push('/connections/followings');
                }}
              >
                <IonIcon
                  slot='start'
                  src='../../assets/icon_connections.svg'
                  className={style['img']}
                ></IonIcon>
                <IonLabel>
                  <h3>Followings</h3>
                </IonLabel>
              </IonItem>
            </>
          )}

          <IonItem
            className={
              active === 'search' ? style['item-active'] : style['item-link']
            }
            onClick={() => {
              setActive('search');
              history.push('/explore');
            }}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_search.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Explore</h3>
            </IonLabel>
          </IonItem>
          <hr className={style['divider']} />
          <IonItem
            className={
              active === 'settings' ? style['item-active'] : style['item-link']
            }
            onClick={() => {
              setActive('settings');
              history.push('/settings');
            }}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_settings.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Settings</h3>
            </IonLabel>
          </IonItem>
          <IonItem
            className={
              active === 'notifications'
                ? style['item-active']
                : style['item-link']
            }
            onClick={() => setActive('notifications')}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_notifications.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Notifications</h3>
            </IonLabel>
          </IonItem>
          <IonItem
            className={style['item-link']}
            onClick={async () => {
              await UserService.logout();
              window.location.href = '/';
            }}
          >
            <IonIcon
              slot='start'
              src='../../assets/icon_dashboard.svg'
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Sign Out</h3>
            </IonLabel>
          </IonItem>
        </IonList>
        {/* <img src="../../assets/icon_dashboard.svg" /> Dashboard<br />
          <img src="../../assets/icon_profile_manager.svg" /> Profile Manager<br />
          <img src="../../assets/icon_connections.svg" /> Connections<br />
          <img src="../../assets/icon_explore.svg" /> Explore<br /> */}

        {/* <hr /> */}

        {/* <img src="../../assets/icon_settings.svg" /> Settings<br />
          <img src="../../assets/icon_notifications.svg" /> Notifications<br />           */}
      </div>
    </IonContent>
  );
};

export default Navbar;
