import React, {useState} from "react";
import {
    Button,
    FormInput,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    FormCheckbox,
    FormRadio,
    Badge
} from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import style from "../../../pages/userProfil/_userprofile.module.css";
import {Multiselect} from "react-widgets";
import {APIEditUser} from "../../../api/userFetch";
import {toast} from 'react-toastify';
import DeleteUser from "./DeleteUser";

toast.configure();


export default function User(props) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toggleViewGroup, setToggleViewGroup] = useState(false);
    const [toggleEditGroup, setToggleEditGroup] = useState(false);
    const [toggleViewModule, setToggleViewModule] = useState(false);
    const [toggleEditModule, setToggleEditModule] = useState(false);
    const [allGroups, setAllGroups] = useState(props.groups);
    const [allModules, setAllModules] = useState(props.modules);

    props = props.user;

    const [username , setUsername]  = useState(props.username);
    const [firstname, setFirstname] = useState(props.firstname);
    const [lastname , setLastname]  = useState(props.lastname);
    const [groups   , setGroups]    = useState(props.groups);
    const [modules  , setModules]   = useState(props.modules);
    const [roles    , setRoles]     = useState((props.roles.includes("ROLE_TEACHER")?"ROLE_TEACHER":(props.roles.includes("ROLE_TUTOR")?"ROLE_TUTOR":"")));

    const [admin, setAdmin] = useState(props.roles.includes("ROLE_ADMIN"));

    const handleValidate = () => {

        let tmpGroups = [];
        groups.map(e => {
            tmpGroups.push(e.name)
        })
        let tmpModules = [];
        modules.map(e => {
            tmpModules.push(e.code)
        })

        const req = {
            "firstname": firstname,
            "lastname": lastname,
            "module": tmpModules,
            "groupes": tmpGroups,
            "roles": (admin)?[roles, "ROLE_ADMIN"]:[roles]
        }

        APIEditUser(props.id, req)
            .then(data => {
                toast.success("Modification effectué !")
            })
            .catch(err => {
                toast.error("Le nom et le prénom doivent être remplis !")
                setUsername(props.username)
                setLastname(props.lastname)
                setFirstname(props.firstname)
                setModules(props.modules)
                setGroups(props.groups)
                setRoles((props.roles.includes("ROLE_TEACHER")?"ROLE_TEACHER":(props.roles.includes("ROLE_TUTOR")?"ROLE_TUTOR":"")))
            })
        setEditing(false);
    };

    const handleCancel = () => {
        //when cancel editing
        setUsername(props.username)
        setLastname(props.lastname)
        setFirstname(props.firstname)
        setModules(props.modules)
        setGroups(props.groups)
        setRoles((props.roles.includes("ROLE_TEACHER")?"ROLE_TEACHER":(props.roles.includes("ROLE_TUTOR")?"ROLE_TUTOR":"")))
        setEditing(false);
    };

    const handleRole = (event, name) => {

    }


    let TagItem = ({ item }) => (
        <Badge style={{backgroundColor: item.color}}>
            {item.name}
        </Badge>
    );

    let ListItem = ({ item }) => (
        <Badge style={{backgroundColor: item.color}}>
            {item.name}
        </Badge>
    );
    return (
        <tr>
            <th scope="row">{username}</th>
            <td>
                {editing ? <FormInput invalid={lastname==""} value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Nom ..." /> : lastname}
            </td>
            <td>
                {editing ? (
                  <FormInput invalid={firstname==""} value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Prénom ..." />
                ) : (
                  firstname
                )}
            </td>
            <td>
                {editing ? (
                    <a href="javascript:void(0)" onClick={() => setToggleEditGroup(!toggleEditGroup)}>
                        Gérer groupes
                    </a>
                ) : (
                    <a href="javascript:void(0)" onClick={() => setToggleViewGroup(!toggleViewGroup)}>
                        Voir groupe
                    </a>
                )}
            </td>
          <td>
              {editing ? (
                  <a href="javascript:void(0)" onClick = { ()=> setToggleEditModule(!toggleEditModule)}>Gérer modules</a>
              ) :(
                  <a href="javascript:void(0)" onClick = { ()=> setToggleViewModule(!toggleViewModule)}>Voir modules</a>)
              }
          </td>

        <td>
            {editing ? (
                <>
                    <FormCheckbox checked={admin} onChange={() => setAdmin(!admin)} >Admin</FormCheckbox>
                    <FormRadio name={"role" + props.id} checked={(roles === "ROLE_TEACHER")} onChange={() => setRoles("ROLE_TEACHER")} >Professeur</FormRadio>
                    <FormRadio name={"role" + props.id} checked={(roles === "ROLE_TUTOR")}   onChange={() => setRoles("ROLE_TUTOR")}   >Tuteur    </FormRadio>
                </>
            ):(
                <>
                    {(admin)?<span style={{color: "red", fontWeight: "bold"}}>Admin, </span>:""}
                    {(roles.includes("ROLE_TEACHER")?"Professeur":"")}
                    {(roles.includes("ROLE_TUTOR"  )?"Tuteur"    :"")}
                </>
            )}
        </td>
          <td>
            {editing ? (
              <ButtonGroup>
                <Button disabled={lastname=="" || firstname==""} onClick={() => handleValidate()} theme="success">
                  <FaCheck />
                </Button>
                <Button onClick={() => handleCancel()} theme="danger">
                  <FaTimes />
                </Button>
              </ButtonGroup>
            ) : (
                <React.Fragment>
                    <Button onClick={() => setEditing(true)}>Edition</Button>
                    <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                </React.Fragment>
            )}
          </td>

          {/* Modals */}
          <Modal
            open={toggleViewGroup}
            toggle={() => setToggleViewGroup(!toggleViewGroup)}
          >
            <ModalHeader>
              Groupes de {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>
                {groups ? groups.map(group => (<h5 className={style.Group} style={{ backgroundColor: group.color } } key={group.name} >{group.name}</h5>)) : <div></div>}
            </ModalBody>
          </Modal>

          <Modal
            open={toggleEditGroup}
            toggle={() => setToggleEditGroup(!toggleEditGroup)}
          >
            <ModalHeader>
              Edition des groupes de {props.firstname} {props.lastname}
            </ModalHeader>
              <ModalBody>
                  <>
                      <Multiselect
                          tagComponent={TagItem}
                          itemComponent={ListItem}
                          value={groups}
                          data={allGroups}
                          onChange={e => setGroups(e)}
                          textField="name"
                      />
                  </>
              </ModalBody>
          </Modal>

          <Modal
            open={toggleViewModule}
            toggle={() => setToggleViewModule(!setToggleViewModule)}
          >
            <ModalHeader>
              Modules de {props.firstname} {props.lastname}
            </ModalHeader>
              <ModalBody>
                  {modules ? modules.map(module => (
                      <Badge
                          className={style.Module}
                          style={{ backgroundColor: module.color, margin:"5px" }}
                      >{module.name}</Badge>
                  )) : <div></div>}
              </ModalBody>
          </Modal>

            <Modal
                size="lg"
                open={toggleEditModule}
                toggle={() => setToggleEditModule(!toggleEditModule)}
            >
                <ModalHeader>
                    Edition des modules de {props.firstname} {props.lastname}
                </ModalHeader>
                <ModalBody>
                    <>
                        <Multiselect
                            tagComponent={TagItem}
                            itemComponent={ListItem}
                            value={modules}
                            data={allModules}
                            onChange={e => setModules(e)}
                            textField="name"
                        />
                    </>
                </ModalBody>
            </Modal>

            {(props != null)? (
                <DeleteUser open={deleting} setOpen={setDeleting} user={props} />
            ):(<React.Fragment />)}
        </tr>
    );
}
