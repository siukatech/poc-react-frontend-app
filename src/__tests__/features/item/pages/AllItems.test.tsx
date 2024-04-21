import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ItemDetail from '../../../../features/item/components/ItemDetail';
import { IItem } from '../../../../features/item/models';
import AllItems from '../../../../features/item/pages/AllItems';
import * as ItemService from '../../../../features/item/services/ItemService';

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

describe('AllItems', () => {
  test('renders AllItems', async () => {
    const mock_getAllItems = jest.spyOn(ItemService, 'getAllItems'); // spy on foo
    mock_getAllItems.mockImplementation(
      (): Promise<any> => Promise.resolve(itemObjs)
    ); // replace implementation

    await act(async () => {
      render(<AllItems />);
    });

    // screen.debug();
  
    const buttonEditEles = screen.getAllByText('button.edit');
    expect(buttonEditEles).toHaveLength(itemObjs.length);
  
  
  });
});
