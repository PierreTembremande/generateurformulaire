import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import './Visuel/MisEnForme.css'

let contientToutChamp = [];
let recup = [];
let tableauErreur = [];
let tableauErreurNumber = [];
let erreurAlpha = false;
let erreurChampRequis = false;

export default function CreationFormulaire(information) {

    const [erreur, SetErreur] = useState(false);
    const [affichageErreur, SetAffichageErreur] = useState([]);

    // Ici formation est initialisé du au manque de temps.
    // Autrement, information est l'objet JSON passé par le client

    information = [{
        "id": "customer",
        "title": "Infos client",
        "inputs": [
            {
                "id": "firstname",
                "required": true,
                "label": "Prénom",
                "type": "text",
                "visibility": null,
                "defaultValue": ""
            },
            {
                "id": "age",
                "required": false,
                "label": "Age",
                "type": "number",
                "visibility": "firstname=John",
                "defaultValue": 18
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
                "label": "Choix accompagnant",
                "type": "select",
                "option": ["Noé", "Théo", "Allan", "Geoffrey"],
                "visibility": null,
                "defaultValue": ""
            },
            {
                "id": "check",
                "required": true,
                "label": "je valide",
                "type": "checkbox",
                "visibility": null,
                "defaultValue": ""
            },
            {
                "id": "ecouteça",
                "required": true,
                "label": "j'approuve",
                "type": "radio",
                "visibility": null,
                "defaultValue": ""
            },
            {
                "id": "comment",
                "required": true,
                "label": "commentaire",
                "type": "textarea",
                "visibility": null,
                "defaultValue": ""
            }
        ]
    }]

    function gestionChamp(donnee, i) {

        let contientChamp = [];

        if (donnee.type === "text" || donnee.type === "radio" || donnee.type === "checkbox") {
            contientChamp.push(<div key={"input" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <input id={donnee.id} type={donnee.type} required={donnee.required} onChange={({ target: { value } }) => { EtatVisibiliteChamp(value, donnee.id) }}></input>
                {donnee.required && <span>*</span>}
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>);
        }

        if (donnee.type === "number") {
            contientChamp.push(<div key={"input" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <input id={donnee.id} type={donnee.type} required={donnee.required} onChange={({ target: { value } }) => { EtatVisibiliteChamp(value, donnee.id) }} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { tableauErreurNumber.push(<p key={i}>{"Le champ " + document.getElementById("label" + donnee.id).textContent + " contient des caractères alphanumériques. Veillez y remédier"}</p>); } }}></input>
                {donnee.required && <span>*</span>}
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>);
        }

        if (donnee.type === "select") {
            contientChamp.push(<div key={"select" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <select id={donnee.id} onChange={({ target: { value } }) => { EtatVisibiliteChamp(value, donnee.id) }}>
                    {donnee.option.map((contenu, i) => {
                        return (
                            <option key={i} value={contenu}>{contenu}</option>
                        )
                    })}
                </ select>
                {donnee.required && <span>*</span>}
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>)
        }

        if (donnee.type === "textarea") {
            contientChamp.push(<div key={"textarea" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <textarea id={donnee.id} required={donnee.required} onChange={({ target: { value } }) => { EtatVisibiliteChamp(value, donnee.id) }}></textarea>
                {donnee.required && <span>*</span>}
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>);
        }

        if (!contientToutChamp.includes(donnee.id)) {
            contientToutChamp.push(donnee.id + "," + donnee.required);
        }

        contientToutChamp = contientToutChamp.filter((x, i) => contientToutChamp.indexOf(x) === i);

        return contientChamp;
    }

    // Tentative d'implémentation de la valeur par défaut
    // function attributionValeurDefaut(entree) {
    //     for (let i = 0; i < contientToutChamp.length; i++) {
    //         try {
    //             if (entree.defaultValue !== "") {
    //                 console.log(entree.defaultValue)
    //                 document.getElementById(entree.id).value = entree.defaultValue;
    //             }
    //         } catch (error) {

    //         }

    //     }

    // }

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

    function EtatVisibiliteChamp(valeur, id) {
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

    function donneeRequise() {
        let champRequis = [];

        for (let i = 0; i < contientToutChamp.length; i++) {
            champRequis.push(contientToutChamp[i].split(","));
            if (champRequis[i][1] === "true") {
                if (document.getElementById(champRequis[i][0]).type === "checkbox" || document.getElementById(champRequis[i][0]).type === "radio") {
                    if (!document.getElementById(champRequis[i][0]).checked) {
                        document.getElementById("valeurVide" + champRequis[i][0]).hidden = false;
                    } else {
                        document.getElementById("valeurVide" + champRequis[i][0]).hidden = true;
                    }
                } else {
                    if (document.getElementById(champRequis[i][0]).value === "") {
                        document.getElementById("valeurVide" + champRequis[i][0]).hidden = false;
                    } else {
                        document.getElementById("valeurVide" + champRequis[i][0]).hidden = true;
                    }
                }
            }
        }
    }

    function verificationErreur() {

        tableauErreur = [];

        if (tableauErreurNumber.length > 0) {
            tableauErreur = tableauErreurNumber;
        }

        for (let i = 0; i < contientToutChamp.length; i++) {
            let id = contientToutChamp[i].split(",");

            if (!document.getElementById("valeurVide" + id[0]).hidden) {
                if (document.getElementById(id[0]).type === "checkbox" || document.getElementById(id[0]).type === "radio") {
                    tableauErreur.push(<p key={i}>{"Le champ " + document.getElementById("label" + id[0]).textContent + " n'est pas coché. Veillez y remédier"}</p>);
                } else {
                    tableauErreur.push(<p key={i}>{"Le champ " + document.getElementById("label" + id[0]).textContent + " ne contient aucun critére. Veillez y remédier"}</p>);
                }
                erreurChampRequis = true;
            }
        }

        if (erreurAlpha || erreurChampRequis) {
            SetErreur(true);
        } else {
            SetErreur(false);
        }

        if (tableauErreur.length === 0) {

            let logResultat = {};

            for (let i = 0; i < contientToutChamp.length; i++) {

                let id = contientToutChamp[i].split(",");
                let cles = document.getElementById("label" + id[0]).textContent
                logResultat[cles] = document.getElementById(id[0]).value;

            }

            console.log((logResultat));

        }

        SetAffichageErreur(tableauErreur);
        erreurAlpha = false;
        erreurChampRequis = false;
        tableauErreurNumber = [];
    }

    function regroupe() {
        donneeRequise();
        verificationErreur();
    }

    return (
        <>
            {erreur && <div className="DivErreur">
                <h3>Résumé des erreurs</h3>
                {affichageErreur.map((uneErreur) => (uneErreur))}
            </div>}

            {information.length ?
                (
                    information.map((donnee, i) => (
                        < div key={i} className="corp">
                            <h1 id={donnee.id}>{donnee.title}</h1>
                            {
                                donnee.inputs.map((entree, j) => (
                                    <div key={j}>
                                        {gestionChamp(entree, i)}
                                        {/* {attributionValeurDefaut(entree)} */}
                                    </div>
                                ))
                            }
                        </div >
                    ))
                ) : (<p>loading...</p>)
            }
            <Button onClick={regroupe}>Soumettre</Button >
        </>
    );
}
