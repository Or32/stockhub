import React from "react";
import useFetchUserHistory from "../API/useFetchUserHistory";
import { Table,MantineProvider } from '@mantine/core';

export default function History(props){
    const {user,error, loaded} =useFetchUserHistory(props.jwt)
    
    

    const rows = user.slice(1).map((action)=>(
       
            <tr key={action.ticker}>
              <td>{action.ticker}</td>
              <td>{action.kind}</td>
              <td>{action.amount}</td>
              <td>{(action.price / action.amount).toFixed(2)}</td>
              
            </tr>
          
    ))

    return(
        <div className="history" >

        
        <MantineProvider theme={{
            colorScheme: 'dark',
            colors: {
              // override dark colors to change them for all components
              dark: [
                '#d5d7e0',
                '#acaebf',
                '#8c8fa3',
                '#666980',
                '#4d4f66',
                '#34354a',
                '#2b2c3d',
                '#1d1e30',
                '#0c0d21',
                '#01010a',
              ],
            },
          }}
    >
        <Table 
        
        highlightOnHover>
        <thead>
          <tr>
            <th>ticker</th>
            <th>kind name</th>
            <th>amount</th>
            <th>price of</th>
          </tr>
        </thead>
        <tbody>{loaded? rows: ""}</tbody>
      </Table>
      </MantineProvider>
      </div>
    )



}