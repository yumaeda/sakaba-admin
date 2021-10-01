import * as React from 'react'
import Menu from '../interfaces/Menu'
import { Column, useTable } from 'react-table'

interface Props {
    columns: Column<Menu>[]
    data: Menu[]
}

const Table: React.FC<Props> = props => {
    const { columns, data } = props
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Menu>({ columns, data, })

    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            { rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
}
    
export default Table
