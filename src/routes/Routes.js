import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CadastrarCategorias from '../pages/CadastrarCategoria/Index';
import CadastrarInvestimentos from '../pages/CadastrarInvestimentos/Index';
import ListarInvestimentos from '../pages/ListarInvestimentos/Index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ListarInvestimentos}/>
                <Route exact path="/cadastrar-investimento" component={CadastrarInvestimentos}/>
                <Route exact path="/listar-investimentos" component={ListarInvestimentos}/>
                <Route exact path="/cadastrar-categoria" component={CadastrarCategorias}/>
            </Switch>
        </BrowserRouter>
    );
}