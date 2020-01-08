import React, {useState, useEffect} from "react";
import {Container,Card, CardBody, CardHeader} from "shards-react";
import { FaMinus, FaPlus} from "react-icons/fa";
import {IoMdPersonAdd} from "react-icons/io"
import {useDispatch, useSelector} from "react-redux";
import { navigate } from "hookrouter"

import User from "../../../components/administration_components/users/User";
import style from "./users.module.css";
import {getUsers} from "../../../providers/actions/userActions";
import PageLoader from "../../../components/layouts/loader";
import {APIgetAllGroups} from "../../../api/groups";
import {APIgetAllModule} from "../../../api/modules";
import {ChildButton, FloatingMenu, MainButton} from "react-floating-button-menu";

export default function UserPage() {

    const [groups, setGroups]   = useState([]);
    const [modules, setModules] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    const userState = useSelector(state => state.user);

    useEffect(() => {
        APIgetAllGroups().then(data => setGroups (data.data))
        APIgetAllModule().then(data => setModules(data.data))
        dispatch(getUsers());
    }, []);

    return (
        <Container fluid className={style.AdmnUtilisateurContainer}>

            <Card style={{marginTop: "20px"}}>
                <CardHeader>
                    <h3>Gestion des utilisateurs</h3>
                </CardHeader>
                <CardBody>

                    <div className="table-responsive">
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


                            {(userState.allUsers.length > 0) ? (
                                <React.Fragment>
                                    {(groups.length > 0 && modules.length > 0) ? userState.allUsers.map((m) =>
                                        <User key={m.id} user={m} groups={groups} modules={modules}/>
                                    ) : ""}
                                </React.Fragment>
                            ) : (<React.Fragment/>
                            )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            <FloatingMenu
                className="floating-button"
                slideSpeed={500}
                direction="up"
                spacing={8}
                spacing={8}
                isOpen={openMenu}
            >
                <MainButton
                    iconResting={<FaPlus style={{ fontSize: 20, color: "white"}} />}
                    iconActive={<FaMinus style={{ fontSize: 20, color: "white" }} />}
                    backgroundColor="black"
                    onClick={() => setOpenMenu(!openMenu)}
                    size={56}
                    style={{backgroundColor: "green"}}
                />
                <ChildButton
                    icon={<IoMdPersonAdd style={{ fontSize: 20, color: "black" }} />}
                    backgroundColor="white"
                    size={70}
                    onClick={() => navigate("/administration/utilisateurs/ajout")}
                />
            </FloatingMenu>
            { (userState.allUsers.length > 0) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </Container>
    );
}
