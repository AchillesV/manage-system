import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import SampleChart from '../../components/SampleChart';

const FormItem = Form.Item;


const mapStateToProps = (state) => {
  return {
    cardsList: state.cards.cardsList,
    statistic: state.cards.statistic,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    queryChartData: () => {
      dispatch({
        type: 'cards/getStatistic',
      });
    },
    queryData: () => {
      dispatch({
        type: 'cards/queryList',
      });
    },
    addOne: (payload) => {
      console.log(payload)
      dispatch({
        type: 'cards/addOne',
        payload
      });
    },
  }
}


@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component{
  constructor(props){
    super(props)
      this.state={
        statisticVisible: false,
        id: null,
        statistic:[],
        visible: false,
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
          {
            title: '',
            dataIndex: '_',
            render: () => {
              return (
                <Button onClick={() => { this.showStatistic(); }}>图表</Button>
              );
            },
          },
        ]
      }

  }


  showStatistic = (id) => {
    this.props.queryChartData();
    // 更新 state，弹出包含图表的对话框
    this.setState({ id, statisticVisible: true });
  };

  handleStatisticCancel = () => {
    this.setState({
      statisticVisible: false,
    });
  }


  handleShow = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handleOk = () => {
    const {
      dispatch,
      
      form: { validateFields, setFieldsValue },
    } = this.props;
    validateFields((err, values) => {
      if(!err) {
        this.props.addOne(values)
      }
      this.setState({visible: false})
    })
    setFieldsValue({name: '', desc: '', url: ''})
  }



  componentDidMount(){
    this.props.queryData()
    this.props.queryChartData()
    const {statistic} = this.props;
    this.setState({statistic})
  }

  render() {
    const {cardsList, statistic} = this.props;
    const {form: {getFieldDecorator}} = this.props;
    const {visible, statisticVisible, id } = this.state;
    console.log(cardsList);
    console.log(statistic);
    return (
      <div>
        <Table columns={this.state.columns} dataSource={cardsList} rowKey={record => record.id} />
        <Button onClick={this.handleShow}>新建</Button>
        <Modal 
          title="新建记录" 
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules:[{required: true}]
              })(
                <Input />
              )}

            </FormItem>
            <FormItem label="描述">
              {getFieldDecorator('desc')(
                <Input />
              )}

            </FormItem>
            <FormItem label="链接">
              {getFieldDecorator('url', {
                rules:[{type: 'url'}]
              })(
                <Input />
              )}

            </FormItem>
          </Form>


        </Modal>

        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
          <SampleChart data={statistic} />
        </Modal>
      </div>
    )
  }
}

export default Form.create()(List)
