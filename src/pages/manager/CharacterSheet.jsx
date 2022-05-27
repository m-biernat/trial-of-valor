import BackButton from "../components/BackButton";
import { character, removeCharacter } from "../../Character";

import { createEffect } from "solid-js";

import CharacterName from "../components/CharacterName";
import CharacterAttributes from "../components/CharacterAttributes";

import CharacterControls from "../components/CharacterControls";

import Inventory from "../components/Inventory";
import QuestLog from "../components/QuestLog";


import { AddItem } from "../components/ItemManagement";

function CharacterSheet() {
    createEffect(() => {
        if (character.attributes.hp == 0)
            console.log("zgon");
    });

    return (
        <div class="center">
            <div class="row">
                <div class="col-auto my-auto">
                    <BackButton href="/" />
                </div>
                <div class="col-auto ms-auto">
                    <h1 class="display-6">Character Sheet</h1>
                </div>
                <div class="col-auto ms-auto my-auto">
                    <button type="button" class="btn btn-outline-danger" onClick={() => removeCharacter()}>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <br />
            <CharacterName />
            <CharacterAttributes />
            <br />
            <CharacterControls />
            <br />
            <AddItem name="effect" title="Status" categoryName="effects" symbol="bi bi-person-lines-fill" />
            <br />
            <Inventory />
            <br />
            <QuestLog />
            <br />
        </div>
	);
}

export default CharacterSheet;
