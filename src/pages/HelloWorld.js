import { Card } from 'antd';

export default () => {
  const style = {
    width: '400px',
    margin: '30px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, .2)',
    border: '1px solid red'

  }
  return (
    <Card style={style} actions={[<a>操作①</a>, <a>操作②</a>]} >
      <Card.Meta 
        avatar={<img 
          alt=""
          style={{ width: '64px', height: '64px', borderRadius: '32px' }}
          src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
        />}
        title='Alipay'
        description='javaScript 字符串用于存储和处理文本，几乎被所有的编程语言所实现（然而c、c++没有提供）。多数开发者几乎每天都在和字符串打交道，语言内置的String模块，极大'
      />
      
    </Card>
  )
}