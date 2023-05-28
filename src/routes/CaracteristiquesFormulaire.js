// Ce fichier est une ébauche de la construction du fichier JSON par le client
// Il est inachevé mais peut toujours être intéressant

import React, { useState } from "react";
let newt = [];

export default function Caracteristique() {
    const [nomChamp, SetNomChamp] = useState("");
    const [liste, Setliste] = useState([]);
    const [listBloc, SetListBloc] = useState([]);
    const [texte, setTexte] = useState(false);
    const [nombre, setNombre] = useState(false);
    const [listeDeroulante, SetListeDeroulante] = useState(false);
    const [caseCocher, setCaseCocher] = useState(false);
    const [radio, SetRadio] = useState(false);
    const [textarea, SetTextarea] = useState(false);


    function test(nombre) {
        let newListBloc = [];
        for (let i = 0; i < nombre; i++) {
            newListBloc.push(listBloc[i]);

        }

        SetListBloc(newListBloc);
    }

    function ajout(recup) {

        if (recup !== "") {
            newt.push(recup)
            SetListBloc(newt)
        }
        console.log(newt)
    }


    return (
        <>
            <p>Bonjour, quel type de formulaire allez-vous creer aujourd'hui?</p>

            <div>
                <h3>Nom des champs : </h3>
                <textarea id="nomChamp" name="nomChamp" placeholder="Entrez les noms des champs. Ils doivent être séparer par virgules et ne pas contenir d'espaces..." onChange={({ target: { value } }) => { SetNomChamp(value); value !== "" ? Setliste(value.split(',')) : Setliste([]) }} />
            </div>

            <br />

            <div>
                <h3>Type des champs : </h3>

                {liste.map((element, i) => (
                    <div key={i}>
                        <label >{element}</label>
                        <select>
                            <option value="T">Texte</option>
                            <option value="N">Nombre</option>
                            <option value="L">Liste déroulante</option>
                            <option value="CC">Case à cocher</option>
                            <option value="R">Radio</option>
                            <option value="TA">Textarea</option>
                        </select>

                        {texte && <input type="text" placeholder="Valeur par défaut"></input>}
                        {nombre && <input type="nombre" placeholder="Valeur par défaut"></input>}
                        {listeDeroulante && <input type="text" placeholder="Les valeurs de la liste doivent être séparer par des virgules"></input>}
                        {(caseCocher || radio) && <input type="text" placeholder="Mettre oui si cocher"></input>}
                        {textarea && <input type="textarea" placeholder="Valeur par défaut"></input>}

                        <br />
                    </div>
                ))}


            </div>

            <br />

            <div>

                <h3>Champ obligatoire : </h3>
                {liste.map((element, i) => (
                    <div key={i}>
                        <label>{element}</label>
                        <select >
                            <option value="NO">Non obligatoire</option>
                            <option value="O">Obligatoire</option>
                        </select>
                        <br />
                    </div>
                ))}
            </div>

            <div>

                <h3>Répartitions par bloc : </h3>

                <label>Nombre de bloc :</label>
                <input type="number" min="0" max={liste.length} onChange={({ target: { value } }) => { test(value) }} />

                <br /><br />

                <label>Nom bloc :</label>

                <br /><br />
                {Object.entries(listBloc).map((bloc, i) => (
                    <div key={i}>
                        <input placeholder="Entrez le nom du bloc." onBlur={({ target: { value } }) => ajout(value)}></input>
                        <br />
                    </div>
                ))}

                <br /><br />

                <label>Liaison des champs avec les bloc : </label>
                <br /><br />
                <p>Attention, un champ ne peut pas apparaître dans 2 blocs différents.</p>
                {liste.map((element, i) => {
                    return (
                        <div key={i}>
                            <label>{element}</label>
                            <select key={"liste" + i}>
                                <option>Appartiens à aucun bloc</option>
                                {listBloc.map((bloc, i) => {
                                    return (
                                        console.log(bloc),
                                        <option key={i} value={i}>{listBloc[i]}</option>

                                    )
                                })}
                            </select>
                        </div>
                    )
                })}



            </div >

            <button>Valider</button>

            <br /><br />

        </>
    );
}
