import "antd/dist/antd.css";
import { Table, Button, message, Layout, Menu} from 'antd';
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import{useEffect, useState} from 'react'
import investimentoService from "../../service/investimentoService";

const { Header, Content, Footer } = Layout;
const {Column} = Table;

export default function ListarInvestimentos(){
    const [investimentos, setInvestimentos] = useState([]);

    useEffect(() => {
        refreshInvestimentos();
        return () => {
        }
    },[])

    async function refreshInvestimentos(){
        investimentoService.retrieveAllInvestimentos()
            .then(
                response => {
                    setInvestimentos(response.data)
                }
            
        )
    }

    function remove(record){
        investimentoService.deleteInvestimento(record.codigo)
        message.success('Investimento removido com sucesso!');
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
                        <h2>INVESTIMENTOS</h2>
                        <Table dataSource={investimentos}>
                            <Column title="Código do ativo" dataIndex="codigoAtivo" key="codigoAtivo"/>
                            <Column title="Valor" dataIndex="valorCota" key="valor"/>
                            <Column title="Quantidade de Cotas" dataIndex="quantidadeCota" key="quantidadeCota"/>
                            <Column title="Data da Compra" dataIndex="dataCompra" key="dataCompra"/>
                            <Column title="Categoria" dataIndex="categoria" key="categoria"/>
                            <Column title="Remover" key="atualizar"
                                render={(text, record) => (<Button onClick={() => remove(record)}
                                type="primary">Remover</Button>)}
                            />
                        </Table>
                    </div>
                </Content>
                <Footer style={{textAlign:'center'}}>My Invest 2021</Footer>
            </Layout>
        </div>
    );
}



