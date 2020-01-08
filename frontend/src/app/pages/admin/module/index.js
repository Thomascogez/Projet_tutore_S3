import React, {useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Module from '../../../components/administration_components/module/Module'
import {useDispatch, useSelector} from "react-redux";
import {getModules} from "../../../providers/actions/moduleAction";
import PageLoader from "../../../components/layouts/loader";
import style from './module.module.css'
import {Container} from 'shards-react'

export default function Modules()
{
    function tri(a,b)
    {
        if (a.code < b.code) return -1;
        else return 1;
    }
    const dispatch    = useDispatch();
    const moduleState = useSelector(state => state.module);

    useEffect( () => {
        dispatch(getModules());
    }, []);

    return (
        <Container fluid >
            <h1 className={style.Titre}>Gestion des modules</h1>   
            {<BarreRecherche />}

            <div className={`${style.AdminModuleDiv} table-responsive`}>
                <table  className={adminStyle.Scroll}>
                    <thead>
                        <tr>
                            <th>Code</th>   
                            <th>Module</th>
                            <th>Couleur</th>
                            <th style={{width:'5%'}}>Edition</th>
                        </tr>
                    </thead>
                    <tbody >
                        { (moduleState.modules.length > 0) ? (
                            <React.Fragment>
                                <Module key={-1} module={null} />
                                {moduleState.modules.map(m =>
                                    <Module key={m.id} module={m} />
                                ) }
                            </React.Fragment>
                        ):(<React.Fragment />
                        )}
                    </tbody>
                </table>
            </div>
            { (moduleState.modules.length > 0 ) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </Container>
    )

}