import React, { Fragment, FC } from 'react';
import styled from 'lib/woowahan-components';

import { Table } from 'components';

import { IListAddress } from 'types/address';

interface MyAddressTableProps {
  loading: boolean;
  addressList: IListAddress[];
  onRemove: (id: string) => void;
  removeLoading: boolean;
}

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const TableRowText = styled.div`
  text-align: center;
`;

const RemoveButton = styled.button`
  width: 60px;
  height: 30px;
  color: ${props => props.theme?.colorError};
  border: 1px solid ${props => props.theme?.colorError};
`;

const tableHeaders = [
  { column: '배송지', span: 1 },
  { column: '받는분', span: 1 },
  { column: '주소', span: 4 },
  { column: '삭제', span: 1 },
];

const MyAddressTable: FC<MyAddressTableProps> = ({ loading, addressList, onRemove }) => {
  return (
    <Wrapper>
      <Table headers={tableHeaders} loading={loading}>
        {addressList.map(adrs => {
          const { id, name, receiver, address, addressDetail } = adrs;
          return (
            <Fragment key={id}>
              <TableRowText>{name}</TableRowText>
              <TableRowText>{receiver}</TableRowText>
              <TableRowText>{`${address} ${addressDetail}`}</TableRowText>
              <TableRowText>
                <RemoveButton type="button" onClick={() => onRemove(id)}>
                  삭제
                </RemoveButton>
              </TableRowText>
            </Fragment>
          );
        })}
      </Table>
    </Wrapper>
  );
};
export default MyAddressTable;
