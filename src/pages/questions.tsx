import React, { useEffect, useCallback, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';
import { getQuestionList } from '@/api';
import { IQuestion } from '@/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;

  & > div {
    margin-top: 20px;
    width: 100%;
  }
`;

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
];

export default function BasicTable() {
  const [page, setPage] = React.useState(0);
  const [listData, setListData] = useState<IQuestion[]>([]);

  const fetchData = useCallback(async () => {
    const listData = await getQuestionList();
    // setListData(listData)
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>题名</TableCell>
              <TableCell>分类</TableCell>
              <TableCell>公司</TableCell>
            </TableRow>
          </TableHead>
          {listData.length ? (
            <TableBody>
              {listData.map((row) => (
                <TableRow key={row.issueId}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <>
              <Skeleton animation="wave" height={53} width="100%" />
              <Skeleton animation="wave" height={53} width="100%" />
              <Skeleton animation="wave" height={53} width="100%" />
            </>
          )}
        </Table>
      </TableContainer>
      {listData.length ? (
        <TablePagination
          rowsPerPage={20}
          rowsPerPageOptions={[]}
          count={listData.length}
          page={page}
          onChangePage={handleChangePage}
          component="div"
        />
      ) : null}
    </StyledContainer>
  );
}
