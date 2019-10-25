import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards'
const mapStateToProps = (state) => {
  const cardList = state[namespace].data
  return {
    cardList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newCard) => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard
      }
      dispatch(action)
    },
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      });
    },
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardPage extends Component {
  constructor(props){
    super(props)
    this.counter = 100
    this.state = {
      cardList : [
        {
          id: 1,
          setup: 'hello world',
          punchline: 'c++'
        },
        {
          id: 2,
          setup: 'hello react',
          punchline: 'javascript'
        }
      ],
      newList: { title: 'hello antd!!!', body: 'react&umi&dva'}
    }
    
  }


  componentDidMount(){
    this.props.onDidMount();
  }

  addNewCard = () => {
    const {cardList} = this.state;    
    this.counter += 1;
    const newCard = {
      id:3,
      setup: 'hello antd',
      punchline: 'react&umi&dva'
    }
    cardList.push(newCard)
    this.setState({cardList})
  }

  render() {
    const {cardList,onClickAdd} = this.props
    const {newList} = this.state;  
    console.log(cardList)
    return (
      <div>
        {
          cardList.map(item => {
            return (
              <Card key={item.id}>
                <div>Q: {item.title}</div>
                <div><strong>A: {item.body}</strong></div>
              </Card>
            )
          })
        }
        <div>
          <Button onClick={() => onClickAdd(newList)}>添加</Button>
        </div>
      </div>
    )
  }
}