import axios from 'axios';

const API_URL = "http://localhost:8080"

class CategoriaService{

    retrieveAllCategorias(){
        return axios.get(`${API_URL}/categorias`)
    }

    saveCategoria(categoria){
        return axios.post(`${API_URL}/categorias`, categoria)
    }
}

export default new CategoriaService();