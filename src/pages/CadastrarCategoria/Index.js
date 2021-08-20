import { Form, Button, message, DatePicker, Layout, Menu, Input, InputNumber, Select} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Link } from "react-router-dom";
import InvestimentoService from '../../service/investimentoService'
import CategoriaService from '../../service/categoriaService'
import {useState, useEffect} from 'react'
import categoriaService from '../../service/categoriaService';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarCategorias(){

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 3,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
        },
    };

    const onFinish = (values) => {
        CategoriaService.saveCategoria(values)
        message.success("Categoria salva com sucesso!")
    }

    const onFinishFailed = (erroInfo) => {
        message.danger("Categoria não foi salva!")
        console.log('Failed:', erroInfo)
    }

    return(
        <div className="container">
            <Layout className="layout">
                <Header>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimento">
                                Cadastrar Investimento
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/cadastrar-categoria">
                                Cadastrar Categoria
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/listar-investimentos">
                                Listar Investimentos
                            </Link>
                        </Menu.Item>
                    </Menu>               
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
                        <h2>CADASTRAR CATEGORIA</h2>
                        <Form {... layout} name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        
                        >
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o nome da categoria!',
                                    },
                                ]}
                                >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Descrição"
                                name="descricao"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Insira a descrição da categoria!',
                                    },
                                ]}
                                >
                                <Input />
                            </Form.Item>
                            <Form.Item {... tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{textAlign:'center'}}>My Invest 2021</Footer>
            </Layout>
        </div>
    );
}
