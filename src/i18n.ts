import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const STORAGE_KEY_I18N = 'i18nlng';

// for typescript, "import './i18n';" will be ok.
// xxxxx - typescript is required to wrap a function to call in index.tsx
// const initI18n = () => {
const i18nLangUrl: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  (process.env.REACT_APP_API_PATH_I18N_LANG as string);
// console.log(`i18nLangUrl: [${i18nLangUrl}]`);

i18n
  // 使用 i18next-http-backend
  .use(Backend)
  // 將 i18next 傳入 react-i18next 裡面
  .use(initReactI18next)
  // 實例化 initReactI18next
  .init(
    {
      backend: {
        //網頁載入時去下載語言檔的位置
        //loadPath: "/locales/{{lng}}/{{ns}}.json",
        //{{ns}} = translation
        //{{lng}} = en
        //loadPath: 'http://localhost:28080/v1/public/i18n/{{lng}}',
        loadPath: i18nLangUrl,
      },
      // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng (en) 作為預設語言
      fallbackLng: 'en',
      // 預設語言
      //lng: "en",
      //lng: localStorage.lng == null ? 'en' : localStorage.getItem(lng),
      lng: localStorage.getItem(STORAGE_KEY_I18N) as string,
      interpolation: {
        // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
        escapeValue: false,
      },
      // debug: true,
    },
    (err, t) => {
      if (err) return console.log('something went wrong loading', err);
    }
  );
// };

// export default initI18n;
export default i18n;
export { STORAGE_KEY_I18N };
