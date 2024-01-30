import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export class ExampleTwo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHead: ['PID', 'Username', 'CPU%', 'RAM%', 'Uptime', 'Proc name'],
        // tableTitle: ['Title', 'Title2', 'Title3', 'Title4','Title5','Title6'],
      }
    }
  
    render() {
      const { tableHead, tableTitle } = this.state;
      const { tableData } = this.props;
      return (
        <View style={styles2.container}>
          <Table borderStyle={{borderWidth: 0.5, }}>
            <Row data={tableHead} flexArr={[0.5, 1, 0.7, 0.7,1,1]} style={styles2.head} textStyle={styles2.text}/>
            <TableWrapper style={styles2.wrapper}>
              <Col data={tableTitle} style={styles2.title} heightArr={[28,28]} textStyle={styles2.text}/>
              <Rows data={tableData} flexArr={[0.5, 1, 0.7, 0.7,1,1]} style={styles2.row} textStyle={styles2.text}/>
            </TableWrapper>
          </Table>
        </View>
      )
    }
  }
  
  const styles2 = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#4E4E4E4B' },
    head: {  height: 40,  backgroundColor: '#2978C765'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#205B9600' },
    row: {  height: 28  },
    text: { textAlign: 'center', fontFamily:"NeueMontreal-Medium" }
  });