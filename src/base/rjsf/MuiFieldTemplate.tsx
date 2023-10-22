import { useTranslation } from "react-i18next";

import {
  FieldTemplateProps,
} from '@rjsf/utils';



const MuiFieldTemplate = (props: FieldTemplateProps) => {
  const { t } = useTranslation();

  console.log(`MuiFieldTemplate - props: `, props);

  return (<>
  {props.children}
  </>);
}

export default MuiFieldTemplate;

