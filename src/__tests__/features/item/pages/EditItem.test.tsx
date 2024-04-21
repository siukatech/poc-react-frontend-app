import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ItemDetail from '../../../../features/item/components/ItemDetail';
import { IItem } from '../../../../features/item/models';
import AllItems from '../../../../features/item/pages/AllItems';
import * as ItemService from '../../../../features/item/services/ItemService';
import EditItem from '../../../../features/item/pages/EditItem';


const itemObjs: IItem[] = [
  {
    id: 1,
    name: 'item 01',
    purchasedDate: new Date(),
    lastModifiedDatetime: new Date(),
    versionNo: 2,
  },
];


// const mock_useState: any = (useState: any) => [useState, jest.fn()];
// const useStateSpy = jest.spyOn(React, 'useState');
// useStateSpy.mockImplementation(mock_useState);


describe('EditItem', () => {
  test('renders EditItem', async () => {
    // jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue(1);

    await act(async () => {
      render(<EditItem 
      />);
    });

    // screen.debug();

  });
});
