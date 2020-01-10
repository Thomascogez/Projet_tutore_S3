import React, {useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Module from '../../../components/administration_components/module/Module'
import {useDispatch, useSelector} from "react-redux";
import {getModules} from "../../../providers/actions/moduleAction";
import PageLoader from "../../../components/layouts/loader";
import style from './module.module.css'
import {Card, CardBody, CardHeader, Container} from 'shards-react'

export default function Modules()
{
    const dispatch    = useDispatch();
    const moduleState = useSelector(state => state.module);

    useEffect( () => {
        dispatch(getModules());
    }, []);

    return (
        <Container fluid >
            <Card style={{marginTop: "20px"}}>
                <CardHeader>
                    <h3>Gestion des modules</h3>
                </CardHeader>
                <CardBody>
                    <div className={`table-responsive`}>
                        <table className="table">
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
                </CardBody>
            </Card>
            { (moduleState.modules.length > 0 ) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </Container>
    )

}