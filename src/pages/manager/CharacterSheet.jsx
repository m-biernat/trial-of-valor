import BackButton from "../components/BackButton";
import { character, deleteCharacter } from "../../Character";

import { createEffect } from "solid-js";

import CharacterName from "../components/CharacterName";
import CharacterAttributes from "../components/CharacterAttributes";

import CharacterControls from "../components/CharacterControls";

import { AddItem } from "../components/ItemManagement";
import Inventory from "../components/Inventory";
import QuestLog from "../components/QuestLog";

import { ModalOk, ModalAccept, getModal } from "../components/Modals";

function CharacterSheet() {
    createEffect(() => {
        if (character.attributes.hp == 0)
            getModal("you-dead").show();
    });

    createEffect(() => {
        if (character.attributes.mp == character.goal)
            getModal("you-won").show();
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
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-character">
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
            <br  />
            <ModalOk id="you-dead" title="You are dead" body={
                <div class="text-center">
                    <h5>Oh no... You've lost all of your <strong>HP</strong>!</h5>
                </div>
            } />
            <ModalOk id="you-won" title="You have won" body={
                <div class="text-center">
                    <h5>You've reached the goal of 5 <strong>MP</strong>!</h5>
                </div>
            } />
            <ModalAccept id="delete-character" title="Delete character" action={() => deleteCharacter()} body={
                <div class="text-center">
                    <h5>Do you really want to <strong>delete</strong> your character?</h5>
                </div>
            } />
        </div>
	);
}

export default CharacterSheet;
