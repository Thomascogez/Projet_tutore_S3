import { navigate } from 'hookrouter'
import React from 'react'
import { Button } from "shards-react"
import style from './err.module.css'

export default () => {

    return (
        <>
            <section className={style.page_404} >
                <div className="container" >
                    <div className="row" >
                        <div className="col-sm-12 " >
                            <div className="col-sm-10 col-sm-offset-1  text-center" >
                                <div className={style.fourzerofourbg} >
                                    <h1 className="text-center">404</h1>
                                </div>

                                <div className={style.contantbox404} >
                                    <h3 className="h2" >
                                        Cette page est introuvable
                                    </h3>

                                    <p>La page que vous essayez de charger n'éxiste pas ou plus !</p>

                                    <Button onClick={() => navigate('/')} className={style.link404} >Retour a l'accueil</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}