import { Collapse } from 'antd';
import React from 'react';
// import { Link } from 'react-router-dom';
// const { Panel } = Collapse;
import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'


const Home = () => {
  return (
    // <Collapse>
    //   <Panel header="Home Page Control" key="1">
    //     <Link to='/mainSliderControl'>Main slider Control</Link><br />
    //     <Link to='/mainLists'>Main Lists Control</Link><br />
    //     <Link to='/mainListsProducts'>Main Lists (products) Control</Link>
    //   </Panel>
    // </Collapse>
    <Result
    style={{backgroundColor:'white'}}
    icon={<SmileOutlined style={{ color:'green' }} />}
    title="Welcome to Nisbaty dashboard"
  />
  );
};

export default Home