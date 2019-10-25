import React from 'react';
import {Table} from 'antd';
import { connect } from 'dva';

const mapStateToProps = (state) => {
  return {
    cardsList: state.cards.cardsList,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    queryData: () => {
      dispatch({
        type: 'cards/queryList',
      });
    },
  }
}


@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component{
  state={
    columns:[
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '链接',
        dataIndex: 'url',
        render: value => <a href={value}>{value}</a>,
      },
    ]
  }


  componentDidMount(){
    this.props.queryData()
  }

  render(){
    const {cardsList} = this.props;
    console.log(cardsList)
    return (
      <Table columns={this.state.columns} dataSource={cardsList} rowKey={record => record.id} />
    )
  }
}

export default List
