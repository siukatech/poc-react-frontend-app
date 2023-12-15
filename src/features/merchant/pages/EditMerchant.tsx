import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery } from '@tanstack/react-query';

import { Divider } from '@mui/material';

import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { IChangeEvent } from '@rjsf/core';
import { Form } from '@rjsf/mui';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { JsonFormsCore, ValidationMode } from '@jsonforms/core';

import { getSingleMerchant } from '../services/MerchantService';

import {
  jsonforms_dataSchema,
  jsonforms_uiSchema,
  rjsf_dataSchema,
  rjsf_uiSchema,
} from '../rjsf';

const EditMerchant = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { merchantId } = params;
  console.debug('EditMerchant - merchantId: ', merchantId);

  const {
    // data: data1,
    data: jfsDataInit,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['merchantId', merchantId],
    queryFn: async (queryContext) => {
      const { queryKey } = queryContext;
      let data;
      if (queryKey[1] != null) {
        data = await getSingleMerchant(parseInt(queryKey[1]));
      }
      return data;
    },
    enabled: merchantId != undefined,
  });

  const [rjsfData, setRjsfData] = useState(null);
  const [jfsData, setJfsData] = useState(null);
  // const [jfsDataInit, setJfsDataInit] = useState(null);
  const [jfsValidationMode, setJfsValidationMode] =
    useState<ValidationMode>('ValidateAndHide');

  // useEffect(() => {
  //   if (data1 != null) {
  //     setJfsData(data1);
  //     setJfsDataInit(data1);
  //   }
  // }, [data1]);
  useEffect(() => {
    if (jfsDataInit != null) {
      setJfsData(jfsDataInit);
    }
  }, [jfsDataInit])

  const handleRjsfFormChange = (evt: IChangeEvent, id?: string) => {
    setRjsfData(evt.formData);
  };

  const handleJfsFormChange = (
    state: Pick<JsonFormsCore, 'data' | 'errors'>
  ) => {
    const { data: retData, errors: retErrors } = state;
    setJfsData(retData);
    const jfsDataInitStr = JSON.stringify(jfsDataInit);
    const retDataStr = JSON.stringify(retData);
    const isIdentical = jfsDataInitStr === retDataStr;
    console.debug(`EditMerchant - handleJfsFormChange - isIdentical: [${isIdentical}]`);
    console.debug(`EditMerchant - handleJfsFormChange - jfsDataInitStr: `, jfsDataInitStr);
    console.debug(`EditMerchant - handleJfsFormChange - retDataStr: `, retDataStr);
    if (isIdentical) {
      setJfsValidationMode('ValidateAndHide');
    }
    else {
      setJfsValidationMode('ValidateAndShow');
    }
  };

  return (
    <>
      {/* <Form
        schema={rjsf_dataSchema}
        uiSchema={rjsf_uiSchema}
        formData={rjsfData}
        validator={validator}
        onChange={handleRjsfFormChange}
      />
      <Divider /> */}
      {jfsData && (
        <JsonForms
          schema={jsonforms_dataSchema}
          uischema={jsonforms_uiSchema}
          data={jfsData}
          renderers={materialRenderers}
          cells={materialCells}
          validationMode={jfsValidationMode}
          onChange={handleJfsFormChange}
        />
      )}
    </>
  );
};

export default EditMerchant;
