import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import useHttp from '../../hooks/use-http';
import { getPublicKey } from '../../services/MyService';


const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const firstNameKeyReact = 'Alan';
  const lastNameKeyReact = 'Wong';
  const firstNameKeyDb = firstNameKeyReact;
  const test1KeyReact = 'Testing-1';


  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(getPublicKey, true);

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  if (getStatus === 'error') {
    console.log('Home - getError: [' + JSON.stringify(getError) + ']');
    navigate('/redirect');
  }
  if (getStatus === 'completed') {
    const publicKeyBase64 = loadedObj;
    console.log('Home - public-key: [' + publicKeyBase64 + ']');
    sessionStorage.setItem('publicKeyBase64', publicKeyBase64);
  }

  return (
    <>
      <section style={{ width: '70%' }}>
        <div>
          {t('hello', {
            firstNameKeyDb: firstNameKeyReact,
            lastNameKeyDb: lastNameKeyReact,
            test1KeyDd: 'Testing-Text',
          })}
        </div>
        <div>
          <Trans i18nKey="hello">
            <i>{{ firstNameKeyDb }}</i>
            <strong
              title={t('hello-title', {
                'here is not working': 'here is not working',
                lastNameKeyDb: lastNameKeyReact,
              })}
            >
              {{ lastNameKeyDb: lastNameKeyReact }}
            </strong>
          </Trans>
        </div>
        <div>
          <Trans i18nKey="hello">
            {{
              firstNameKeyDb: firstNameKeyReact,
              lastNameKeyReact: lastNameKeyReact,
              test1KeyDd: test1KeyReact,
            }}
          </Trans>
        </div>
        <div>
          {
            //一起來<a>這裡</a>學習 React 吧
          }
          <Trans i18nKey="hello-link">
            <a></a>
          </Trans>
        </div>
      </section>
    </>
  );
};

export default Home;
