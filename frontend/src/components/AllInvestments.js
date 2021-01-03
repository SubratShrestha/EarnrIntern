import { useState, useEffect } from 'react';
import {
  Table,
  Placeholder,
  Loader,
} from 'rsuite';

export default function AllInvestments() {

  const [investments, setInvestments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/investments')
      .then(res => res.json())
      .then(data => {
        setInvestments(data);
        setLoading(false);
      })
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '50%' }}>
        <h2>All Investments</h2>
      </div>
      {
        loading ?
          <Placeholder.Paragraph rows={6}>
            <Loader center content="loading" />
          </Placeholder.Paragraph>
          :
          <Table
            height={400}
            width={650}
            data={investments.data}
          >
            <Table.Column width={150} align="center" fixed>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.Cell dataKey="firstname" />
            </Table.Column>
            <Table.Column width={150} align="center" fixed>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.Cell dataKey="lastname" />
            </Table.Column>
            <Table.Column width={100} align="center" fixed>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.Cell dataKey="amount" style={{ color: '#AED582' }} />
            </Table.Column>
            <Table.Column width={150} align="center" fixed>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>
          </Table>
      }
    </div>
  )
}