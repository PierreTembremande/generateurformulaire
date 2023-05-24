import React, { useState } from "react";
let contientToutChamp = [];
let recup = [];
let tableauErreur = [];
const regex = /[123456789]/
let erreurAlpha = false;
let erreurChampRequis = false;

export default function CreationFormulaire(information) {

    const [erreur, SetErreur] = useState(false);
    const [affichageErreur, SetAffichageErreur] = useState([]);

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

    function gestionChamp(donnee, i) {

        let contientChamp = [];

        if (donnee.type === "text" || donnee.type === "number" || donnee.type === "radio" || donnee.type === "checkbox") {
            contientChamp.push(<div key={"input" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <input id={donnee.id} type={donnee.type} required={donnee.required} onChange={({ target: { value } }) => { visible2(value, donnee.id) }} ></input>
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>);
        }

        if (donnee.type === "select") {
            contientChamp.push(<div key={"select" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <select id={donnee.id} onChange={({ target: { value } }) => { visible2(value, donnee.id) }}>
                    {donnee.option.map((contenu, i) => {
                        return (
                            <option key={i} value={contenu}>{contenu}</option>
                        )
                    })}
                </ select>
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>)
        }

        if (donnee.type === "textarea") {
            contientChamp.push(<div key={"textarea" & donnee.id} hidden={visible(donnee.visibility, donnee.id + i)} id={donnee.id + i}>
                <label key={"label" + i} id={"label" + donnee.id}>{donnee.label}</label>
                <textarea id={donnee.id} required={donnee.required} onChange={({ target: { value } }) => { visible2(value, donnee.id) }}></textarea>
                <p id={"valeurVide" + donnee.id} hidden={true} >Ce champ est requis</p>
            </div>);
        }

        if (!contientToutChamp.includes(donnee.id)) {
            contientToutChamp.push(donnee.id + "," + donnee.required);
        }

        contientToutChamp = contientToutChamp.filter((x, i) => contientToutChamp.indexOf(x) === i);

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
        for (let i = 0; i < contientToutChamp.length; i++) {
            let id = contientToutChamp[i].split(",");
            console.log(document.getElementById(id[0]).length);
            if (document.getElementById(id[0]).type === "number" && !regex.test(document.getElementById(id[0]).value) && document.getElementById(id[0]).innerHTML.length !== 0) {
                tableauErreur.push(<p key={i}>{"Le champ " + document.getElementById("label" + id[0]).textContent + " contient des caractères alphanumériques. Veillez y remédier"}</p>);
                erreurAlpha = true;
            }

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

        SetAffichageErreur(tableauErreur);
        erreurAlpha = false;
        erreurChampRequis = false;
    }

    function regroupe() {
        donneeRequise();
        verificationErreur();
    }

    return (
        <>
            {erreur && <div>
                <h3>Résumé des erreurs</h3>
                {affichageErreur.map((uneErreur) => (uneErreur))}
            </div>}

            {information.length ?
                (
                    information.map((donnee, i) => (
                        < div key={i} >
                            <h1 id={donnee.id}>{donnee.title}</h1>
                            {
                                donnee.inputs.map((entree, j) => (
                                    <div key={j}>
                                        {gestionChamp(entree, i)}
                                    </div>
                                ))
                            }
                        </div >
                    ))
                ) : (<p>loading...</p>)
            }
            <button onClick={regroupe}>Soumettre</button >
        </>
    );
}
