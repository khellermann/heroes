import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';
export default function Profile(){

    const [incidents, setIncidents] = useState([]); 
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res=>{
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !==id));
        }catch(err){
            alert("Erro ao excluir");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo,  {ongName}</span>
                <Link className="button" to="incidents/new ">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                    <strong>CASOS: </strong>
                        <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                    <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={()=> handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                </li>
                ))}
            </ul>
        </div>
    );
}