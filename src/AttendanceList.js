import * as React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
//import { withTransaction } from '@elastic/apm-rum-react';

class ListAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch('/attendance/search')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(err => console.error(err.toString()));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Attendance List"></Page.Card>
        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
              <Table.ColHeader>Date</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((item, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Col>{item.id}</Table.Col>
                    <Table.Col>{item.status}</Table.Col>
                    <Table.Col>{item.date}</Table.Col>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListAttendance;
//export default withTransaction('ListAttendance', 'component')(ListAttendance);
