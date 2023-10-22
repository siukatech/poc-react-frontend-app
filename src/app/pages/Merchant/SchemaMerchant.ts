import { RJSFSchema, UiSchema } from '@rjsf/utils';

const dataSchema: RJSFSchema = {
  title: 'Merchant Form',
  type: 'object',
  properties: {
    id: {
      title: 'Id',
      description: 'Id',
      type: 'number',
    },
    mid: {
      title: 'Mid',
      type: 'string',
    },
    name: {
      title: 'Name',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
    },
    shops: {
      title: 'Shops',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            title: 'Id',
            type: 'number',
          },
          mid: {
            title: 'Mid',
            type: 'string',
          },
          name: {
            title: 'Name',
            type: 'string',
          },
          addressFull: {
            title: 'Address (Full)',
            type: 'string',
          },
          description: {
            title: 'Description',
            type: 'string',
          },
          status: {
            title: 'Status',
            type: 'string',
          },
          merchantId: {
            title: 'Merchant Id',
            type: 'number',
          },
          createdBy: {
            title: 'Created By',
            type: 'string',
          },
          createdDatetime: {
            title: 'Created Datetime',
            type: 'string',
          },
          lastModifiedBy: {
            title: 'Last Modified by',
            type: 'string',
          },
          lastModifiedDatetime: {
            title: 'Last Modified Datetime',
            type: 'string',
          },
          versionNo: {
            title: 'Version No',
            type: 'integer',
          },
        },
      },
    },
  },
};

const uiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    // "submitText": "Confirm Details",
    // "norender": false,
    // "props": {
    //   "disabled": false,
    //   "className": "btn btn-info"
    // },
    norender: true,
  },
  'ui:labelPrefix': 'merchant',
  'ui:grid': [
    {
      id: 5,
      mid: 5,
    },
    {
      name: 12,
    },
    { 
      description: 12,
    },
    {
      linebreak: 12,
    },
    {
      shops: 12,
    }
  ],
};

export { dataSchema, uiSchema, };
