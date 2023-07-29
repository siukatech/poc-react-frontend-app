import { useState, useEffect } from 'react';

import { NavDropdown } from 'react-bootstrap';
import { Bell, BellFill } from 'react-bootstrap-icons';
import { useTranslation, Trans } from 'react-i18next';

import classes from './NavNoti.module.css';

const NavNoti = () => {
  const { t, i18n } = useTranslation();
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    let notisTemp = new Array();
    for (let i = 0; i < 20; i++) {
      notisTemp.push({
        message: `Notification Item ${i + 1}`,
        href: `/notification/${i + 1}`,
      });
    }
    setNotis(notisTemp);
  }, []);


  return (
    <>
      <NavDropdown
        className={`${classes['dropdown-menu-noti']} dropdown-noti`}
        title={
          <span>
            {
            (notis.length === 0 && <Bell />) 
            || 
            (notis.length > 0 && (<><BellFill alt={notis.length} /> {notis.length}</>))
            }
          </span>
        }
      >
        {notis.length > 0 && notis.map((noti, idx) => {
          return (
            <NavDropdown.Item key={idx} href={noti.href}>
              {noti.message}
            </NavDropdown.Item>
          );
        })}
        {notis.length === 0 && <NavDropdown.Item >{t('No notification')}</NavDropdown.Item>}
      </NavDropdown>
    </>
  );
};

export default NavNoti;
