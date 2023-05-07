import React, { useState } from "react";

export default function Root() {

    const [nom, SetNom] = useState(0);
    const [prenom, SetPrenom] = useState(0);
    const [mail, setMail] = useState(0);
    const [mdp1, setMdp1] = useState(0);
    const [mdp2, setMdp2] = useState(0);
    const [naissance, setNaissance] = useState(0);
    const [sexe, setSexe] = useState(0);
    const [pasIdentique, setPasIdentique] = useState(false);
    const [naissanceImpossible, SetNaissanceImpossible] = useState(false);

    return (
        <>
            <p>Bonjour, quel type de formulaire allez vous creer aujourd'hui?</p>

            <div>
                <h3>Nom des champs : </h3>
                <input type="textarea" id="nomChamp" name="nomChamp" placeholder="Entrez votre Nom..." />
            </div>

            <br />

            <div>
                <h3>Type de champs : </h3>

                <input type="text" id="prenom" name="prenom" placeholder="Entrez votre prenom..." />

            </div>

            <br />

            <div>

                <h3>Champ obligatoire : </h3>
                <input type="text" id="prenom" name="prenom" placeholder="Entrez votre prenom..." />

            </div>


            <br />

            <label for="sexe">Sexe</label>
            <select name="sex">
                <option value="G">Homme ou Femme ?</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
            </select>

            <br /><br />

            <button>Valider</button>

            <br /><br />

        </>
    );
}
