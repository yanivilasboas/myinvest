import { Form, Button, message, DatePicker, Layout, Menu, Input, InputNumber, Select} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Link } from "react-router-dom";
import InvestimentoService from '../../service/investimentoService'
import CategoriaService from '../../service/categoriaService'
import {useState, useEffect} from 'react'
import categoriaService from '../../service/categoriaService';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarInvestimentos(){

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState([]);

    useEffect(() => {
        refreshCategorias();
        return () => {
        }
    },[])

    async function refreshCategorias(){
        CategoriaService.retrieveAllCategorias()
            .then(
                response => {
                    setCategorias(response.data)
                }
        )
    }

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
        values.categoria={
            codigo: categoria
        };
        InvestimentoService.saveInvestimento(values);
        message.success("Investimento salvo com sucesso!")
    }

    const onFinishFailed = (erroInfo) => {
        message.danger("Investimento salvo com sucesso!")
        console.log('Failed:', erroInfo)
    }

    function handleChange(value){
        setCategoria(value);
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
                        <h2>CADASTRAR INVESTIMENTO</h2>
                        <Form {... layout} name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        
                        >
                            <Form.Item
                                label="Código do ativo"
                                name="codigoAtivo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o código do ativo!',
                                    },
                                ]}
                                >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Valor"
                                name="valorCota"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira o valor da cota!",
                                    },
                                ]}
                            >
                               <InputNumber step="0.01"/>
                            </Form.Item>

                            <Form.Item
                                label="Quantidade de cotas"
                                name="quantidadeCota"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a quantidade de cotas!',
                                   },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item
                                label="Data da compra"
                                name="dataCompra"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a data da compra!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Categoria"
                                name="categoria.codigo"
                            >
                                <Select onChange={handleChange} >
                                    {categorias.map((item)=> {
                                        return(
                                            <Option key={item.codigo} value={item.codigo} >
                                                {item.nome}
                                            </Option>
                                        )
                                    })}
                                </Select>
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
