import { useTranslation } from 'react-i18next';

import { TitleFieldProps } from '@rjsf/utils';

const MuiTitleFieldTemplate = (props: TitleFieldProps) => {
  const { t } = useTranslation();

  console.log(`MuiTitleFieldTemplate - props: `, props);

  return <>{props.title}</>;
};

export default MuiTitleFieldTemplate;
