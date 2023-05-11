import React, { useState } from "react";
let recup = [];

export default function CreationFormulaire(information) {

    information = [{
        "id": "customer",
        "title": "Infos client",
        "inputs": [
            {
                "id": "firstname",
                "required": true,
                "label": "Prénom",
                "type": "text",
                "visibility": null
            },
            {
                "id": "age",
                "required": false,
                "label": "Age",
                "type": "number",
                "visibility": "firstname=John"
            }
        ]
    },
    {
        "id": "dev",
        "title": "Chanceux?",
        "inputs": [
            {
                "id": "listeDeroulanteTest",
                "required": true,
                "label": "Choisi ton destin",
                "type": "select",
                "option": ["Noé", "Théo", "Allan", "Philippe"],
                "visibility": null
            },
            {
                "id": "check",
                "required": true,
                "label": "vie",
                "type": "checkbox",
                "visibility": null
            },
            {
                "id": "ecouteça",
                "required": true,
                "label": "mort",
                "type": "radio",
                "visibility": null
            },
            {
                "id": "comment",
                "required": true,
                "label": "explication",
                "type": "textarea",
                "visibility": null
            }
        ]
    }]

    function gestionChamp(donnee) {

        let contientChamp = [];

        if (donnee.type == "text" || donnee.type == "number" || donnee.type == "radio" || donnee.type == "checkbox") {
            contientChamp.push(<input hidden={visible(donnee.visibility, donnee.id)} key={"input" & donnee.id} id={donnee.id} type={donnee.type} required={false} onChange={({ target: { value, id } }) => { visible2(value, id) }} ></input>);
        }

        if (donnee.type == "select") {
            contientChamp.push(<select hidden={visible(donnee.visibility, donnee.id)} key={"select" & donnee.id} id={donnee.id} onChange={({ target: { value, id } }) => { visible2(value, id) }}>
                {donnee.option.map((contenu, i) => {
                    return (
                        <option key={i} value={contenu}>{contenu}</option>
                    )
                })}
            </ select>)
        }

        if (donnee.type == "textarea") {
            contientChamp.push(<textarea hidden={visible(donnee.visibility, donnee.id)} key={"textarea" & donnee.id} id={donnee.id} required={false} onChange={({ target: { value, id } }) => { visible2(value, id) }}></textarea>);
        }

        return contientChamp;
    }

    function visible(visibility, id) {

        if (visibility === null) {
            return
        }

        if (!recup.includes(visibility + "/" + id)) {
            recup.push(visibility + "/" + id);
        }

        let v = true;
        return v;

    }

    function visible2(valeur, id) {
        let verif;
        for (let i = 0; i < recup.length; i++) {
            let sansId = recup[i].split("/");
            if (sansId[i].includes("=") && !sansId[i].includes("!") && sansId[i].includes(id)) {
                verif = id + "=" + valeur;
                if (String(sansId[i]) === String(verif)) {
                    document.getElementById(sansId[i + 1]).hidden = false;
                    break;
                } else {
                    document.getElementById(sansId[i + 1]).hidden = true;
                }
            } else if (sansId[i].includes("!=") && sansId[i].includes(id)) {
                verif = id + "!=" + valeur;
                for (let i = 0; i < recup.length; i++) {
                    let sansId = recup[i].split("/");
                    if (String(sansId[i]) !== String(verif)) {
                        document.getElementById(sansId[i + 1]).hidden = false;
                        break;
                    } else {
                        document.getElementById(sansId[i + 1]).hidden = true;
                    }
                }
            } else if (sansId[i].includes("<") && sansId[i].includes(id)) {
                verif = id + "<" + valeur;
                for (let i = 0; i < recup.length; i++) {
                    let sansId = recup[i].split("/");
                    if (String(sansId[i]) < String(verif)) {
                        document.getElementById(sansId[i + 1]).hidden = false;
                        break;
                    } else {
                        document.getElementById(sansId[i + 1]).hidden = true;
                    }
                }
            } else if (sansId[i].includes(">") && sansId[i].includes(id)) {
                verif = id + ">" + valeur;
                for (let i = 0; i < recup.length; i++) {
                    let sansId = recup[i].split("/");
                    if (String(sansId[i]) > String(verif)) {
                        document.getElementById(sansId[i + 1]).hidden = false;
                        break;
                    } else {
                        document.getElementById(sansId[i + 1]).hidden = true;
                    }
                }
            }
        }

    }


    return (
        <>
            {information.length ?
                (
                    information.map((donnee, i) => (
                        <div key={i}>
                            <div>
                                <h1 id={donnee.id}>{donnee.title}</h1>
                                {donnee.inputs.map((entree, j) => (
                                    <div key={j}>
                                        <label key={"label" + i}>{entree.label}</label>
                                        {gestionChamp(entree)}
                                    </div>

                                ))}
                            </div>
                            <button> Soumettre</button>
                        </div>

                    ))
                ) : (<p>loading...</p>)
            }
        </>
    );
}
