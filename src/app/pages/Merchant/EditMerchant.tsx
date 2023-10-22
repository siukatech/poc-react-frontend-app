import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { IChangeEvent } from '@rjsf/core';
import { Form } from '@rjsf/mui';

import { getSingleMerchant } from '../../services/MerchantService';

import { dataSchema } from './SchemaMerchant';

const EditMerchant = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { merchantId } = params;
  console.log('EditMerchant - merchantId: ', merchantId);

  const query = useQuery({
    queryKey: ['merchantId', merchantId],
    queryFn: async (queryContext) => {
      const queryKey = queryContext.queryKey;
      let data;
      if ( queryKey[1] != null ) {
        data = await getSingleMerchant(parseInt(queryKey[1]));
      }
      return data;
    },
    enabled: merchantId != undefined,
  });

  const [formData, setFormData] = useState(null);

  const handleFormChange = (evt: IChangeEvent, id?: string) => {
    setFormData(evt.formData);
  };

  return (
    <>
      <Form
        schema={dataSchema}
        formData={formData}
        validator={validator}
        onChange={handleFormChange}
      />
    </>
  );
};

export default EditMerchant;
