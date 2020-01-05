import React, {useState, useEffect} from "react";
import {
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput, Row
} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import { FaSearch } from "react-icons/fa";

import User from "../../../components/administration_components/utilisateurs/User";
import style from "./users.module.css";
import {getUsers, login} from "../../../providers/actions/userActions";
import PageLoader from "../../../components/layouts/loader";

export default function UserPage() {

    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const userState = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <Container fluid className={style.AdmnUtilisateurContainer}>
            <h1 className={style.AdmnUtilisateurTitle}>Gestion des utilisateurs</h1>
            <div className={style.AdmnActions}>
                <InputGroup className={style.AdmnActionsInpt} seamless>
                    <InputGroupAddon type="append">
                        <InputGroupText>
                            <FaSearch />
                        </InputGroupText>
                    </InputGroupAddon>
                    <FormInput placeholder="Rechercher un utilisateur ...." />
                </InputGroup>
            </div>
            <div class="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Identifiant</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Groupes</th>
                        <th scope="col">Modules</th>
                        <th scope="col">Rôles</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    { (userState.allUsers.length > 0) ? (
                        <React.Fragment>
                            {userState.allUsers.map((m) =>
                                <User key={m.id} user={m} />
                            ) }
                        </React.Fragment>
                    ):(<React.Fragment />
                    )}
                    </tbody>
                </table>
            </div>
            { (userState.allUsers.length > 0) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </Container>
    );
}
