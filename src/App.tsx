import './App.css'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import NavBar from './components/Navbar';

const { Header, Content } = Layout;

function App() {

  return (
    <>
      <Header >
        <div className="demo-logo" />
        <NavBar />
      </Header>
      <Content > <Outlet /></Content>

    </>
  )
}

export default App
