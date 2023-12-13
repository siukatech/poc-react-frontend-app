import { RJSFSchema, UiSchema } from '@rjsf/utils';

const rjsf_dataSchema: RJSFSchema = {
  title: 'Merchant Form',
  type: 'object',
  required: ['mid', 'name'],
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

const rjsf_uiSchema: UiSchema = {
  'ui:submitButtonOptions': {
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
    },
  ],
};

const jsonforms_dataSchema = {
  title: 'Merchant Form',
  type: 'object',
  required: ['mid', 'name', 'description', 'test1', 'test2'],
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
    test1: {
      title: 'Test1',
      type: 'string',
    },
    test2: {
      title: 'Test2',
      type: 'string',
    },
    shops: {
      title: 'Shops',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
          },
          id: {
            title: 'Id',
            type: 'number',
          },
          mid: {
            title: 'Mid',
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

const jsonforms_uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/id',
        },
        {
          type: 'Control',
          scope: '#/properties/mid',
        },
      ],
    },
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/description',
    },
    {
      type: 'Control',
      scope: '#/properties/test1',
    },
    {
      type: 'Control',
      scope: '#/properties/test2',
    },
    {
      // type: 'Control',
      type: 'ListWithDetail',
      scope: '#/properties/shops',
      options: {
        detail: {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/id',
                  label: 'Id',
                },
                {
                  type: 'Control',
                  scope: '#/properties/mid',
                  label: 'Mid',
                },
              ],
            },
            {
              type: 'Control',
              scope: '#/properties/name',
              label: 'Name',
            },
            {
              type: 'Control',
              scope: '#/properties/addressFull',
              label: 'Address (Full)',
            },
            {
              type: 'Control',
              scope: '#/properties/description',
              label: 'Description',
            },
            {
              type: 'Control',
              scope: '#/properties/status',
              label: 'Status',
            },
          ],
        },
      },
    },
  ],
};

export {
  rjsf_dataSchema,
  rjsf_uiSchema,
  jsonforms_dataSchema,
  jsonforms_uiSchema,
};
