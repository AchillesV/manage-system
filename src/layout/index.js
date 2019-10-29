import { Component } from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import Link from 'umi/link';

const {Header, Footer, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const {Search} = Input;

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{minHeight: '100vh', color: 'white'}}>
          <Menu defaultSelectedKeys={['1']} theme='dark' mode='inline' >
            <Menu.Item key="1">
              <Link to="/helloworld">
                <Icon type="pie-chart" />
                <span>Hello World</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard" /><span>工作台</span></span>}
            >
              <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
              <Menu.Item key="3"><Link to='/dashboard/monitor'>监控页</Link></Menu.Item>
              <Menu.Item key="4"><Link to='/dashboard/workplace'>工作台</Link></Menu.Item>

            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{backgroundColor: '#fff', textAlign: 'center', padding: 0}}>
            <Search 
              placeholder="搜索" 
              onSearch={value=> console.log(value)} 
              style={{width: 200, marginLeft: '60%'}} 
            />
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{padding: '24px', backgroundColor: 'white', minHeight: '360px'}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>@2019 ❤ WHT</Footer>
        </Layout>
        

      </Layout>
    )
  }
}