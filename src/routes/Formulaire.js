import React, { useState } from "react";

export default function creationFormulaire(information) {

    information = [{
        "id": "customer",
        "title": "Infos client",
        "inputs": [
            {
                "id": "firstname",
                "required": true,
                "label": "Prénom",
                "type": "text"
            },
            {
                "id": "age",
                "required": false,
                "label": "Age",
                "type": "number",
                "visibility": "firstname=John"
            }
        ]
    }];

    return (
        <>
            {information.map((donne, i) => (
                <div key={i}>
                    <h1 id={donne.id}>{donne.title}</h1>
                    {donne.inputs.map((entree, j) => (
                        <div key={j}>
                            <label key={"label" + i}>{entree.label}</label>
                            <input key={"input" + i} id={entree.id} type={entree.type} required={entree.required} visibility={entree.visibility}></input>
                        </div>
                    ))}
                </div>
            ))}


        </>
    );
}
