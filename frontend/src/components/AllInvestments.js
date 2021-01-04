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
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2>All Investments</h2>
      {
        loading ?
          <Placeholder.Paragraph rows={6}>
            <Loader center content="loading" />
          </Placeholder.Paragraph>
          :
          <Table
            height={400}
            data={investments.data}
          >
            <Table.Column width={150}>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.Cell dataKey="firstname" />
            </Table.Column>
            <Table.Column width={150}>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.Cell dataKey="lastname" />
            </Table.Column>
            <Table.Column width={100}>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.Cell dataKey="amount" style={{ color: '#AED582' }} />
            </Table.Column>
            <Table.Column width={150}>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.Cell dataKey="type" />
            </Table.Column>
            <Table.Column width={200}>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.Cell dataKey="email" />
            </Table.Column>
            <Table.Column width={150}>
              <Table.HeaderCell>Phone number</Table.HeaderCell>
              <Table.Cell dataKey="number" />
            </Table.Column>
          </Table>
      }
    </div>
  )
}