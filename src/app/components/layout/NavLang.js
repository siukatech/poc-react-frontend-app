import { NavDropdown } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';

const NavLang = () => {
  const { t, i18n } = useTranslation();

  const langs = [
    { lang: 'en', title: t('menu.lang.en') },
    { lang: 'zh-TW', title: t('menu.lang.zh') },
    { lang: 'zh-CN', title: t('menu.lang.cn') },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nlng', lng);
  };

  return (
    <>
      {langs && (
        <NavDropdown title={t('menu.lang')}>
          {langs.map((lang, idx) => {
            return (
              <NavDropdown.Item
                key={idx}
                onClick={() => {
                  changeLanguage(lang.lang);
                }}
              >
                {lang.title}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      )}
    </>
  );
};

export default NavLang;
