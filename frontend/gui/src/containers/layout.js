import React from 'react';
import BaseRouter from "../routes"
import { Layout } from 'antd';


const { Header, Footer,Content } = Layout;

class AppLayout extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <BaseRouter />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </div>)
    }
}

export default AppLayout;