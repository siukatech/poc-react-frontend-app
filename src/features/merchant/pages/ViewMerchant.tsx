import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { IChangeEvent } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Form } from '@rjsf/mui';

import { ThemeProvider } from '@mui/material';

import { getSingleMerchant } from '../services/MerchantService';
import { themeFormReadonly } from '../../../frameworks/app/themes/theme';
import LoadingSpinner from '../../../frameworks/ui/components/LoadingSpinner';

import MuiGridObjectFieldTemplate from '../../../frameworks/rjsf/components/MuiGridObjectFieldTemplate';
import MuiTitleFieldTemplate from '../../../frameworks/rjsf/components/MuiTitleFieldTemplate';
import MuiFieldTemplate from '../../../frameworks/rjsf/components/MuiFieldTemplate';
import { intlSchema } from '../../../frameworks/rjsf/services/translation-service';

import { rjsf_dataSchema, rjsf_uiSchema } from '../rjsf';

const ViewMerchant = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { merchantId } = params;
  console.debug('ViewMerchant - merchantId: ', merchantId);

  const {
    // data: data1,
    data: data1,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['merchantId', merchantId],
    queryFn: async (queryContext) => {
      const queryKey = queryContext.queryKey;
      let data;
      if (queryKey[1] != null) {
        data = await getSingleMerchant(parseInt(queryKey[1]));
      }
      return data;
    },
    enabled: merchantId != undefined,
  });

  useEffect(() => {
    if (data1 != null) {
      setFormData(data1);
    }
  }, [data1]);

  const [formData, setFormData] = useState(null);

  const handleFormChange = (evt: IChangeEvent, id?: string) => {
    setFormData(evt.formData);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <ThemeProvider theme={themeFormReadonly}>
          <Form
            templates={{
              ObjectFieldTemplate: MuiGridObjectFieldTemplate,
              // TitleFieldTemplate: MuiTitleFieldTemplate,
              // FieldTemplate: MuiFieldTemplate,
            }}
            // readonly={true}
            // schema={dataSchema}
            schema={intlSchema(rjsf_dataSchema, 'merchant', t)}
            uiSchema={rjsf_uiSchema}
            formData={formData}
            validator={validator}
            onChange={handleFormChange}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export default ViewMerchant;
