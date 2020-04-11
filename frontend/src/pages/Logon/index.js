import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import heroesImgs from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
 
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const res = await api.post('session', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);
            console.log(res.data.name);
            history.push('/profile')
        }catch(err){    
            alert("Não foi possivel logar");
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                    placeholder="Sua ID..."
                    value={id}
                    onChange={e=> setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>
                        
                    <Link to="/register" className="back-link"> 
                    <FiLogIn size={16} color="#E02041"/> 
                    Não tenho cadastrado
                    </Link>
                </form>
            </section>
            <img src={heroesImgs} alt="Logo Hero"/>
        </div>
    );
}