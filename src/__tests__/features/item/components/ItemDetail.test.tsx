import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemDetail from '../../../../features/item/components/ItemDetail';
import { IItem } from '../../../../features/item/models';


const itemObj: IItem = {
  id: 1,
  name: 'item 01',
  purchasedDate: new Date(),
  lastModifiedDatetime: new Date(),
  versionNo: 2,
};


// Reference
// https://dev.to/lausuarez02/testing-usenavigate-1mg3
// https://cursos.alura.com.br/forum/topico-solucao-para-o-erro-the-module-factory-of-jest-mock-is-not-allowed-to-reference-any-out-of-scope-variables-288913
// const useNavigateMocked = jest.fn();
const mock_useNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useNavigate: () => useNavigateMocked,
  useNavigate: () => mock_useNavigate,
}));


describe('ItemDetail', () => {
  test('renders ItemDetail', async () => {
    render(<ItemDetail itemObj={itemObj} defaultExpanded={false} />);

    // screen.debug();

    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();

    const accordionSummaryTypographyEle = screen.getByTestId('item-name');
    expect(accordionSummaryTypographyEle).toBeInTheDocument();

    const buttonEditEle = screen.getByText('button.edit');
    await act(async () => {
      userEvent.click(buttonEditEle);
    });
    expect(mock_useNavigate).toBeCalled();
    expect(mock_useNavigate).toHaveBeenCalledWith(`/items/${itemObj?.id}/edit`);

    // const navigate = useNavigate();
    // const buttonBackEle = screen.getByRole('button');
    const buttonBackEle = screen.getByText('button.back');
    await act(async () => {
      userEvent.click(buttonBackEle);
    });
    // expect(useNavigateMocked).toBeCalled();
    // expect(useNavigateMocked).toHaveBeenCalledWith(-1);
    expect(mock_useNavigate).toBeCalled();
    expect(mock_useNavigate).toHaveBeenCalledWith(-1);

  });

});
