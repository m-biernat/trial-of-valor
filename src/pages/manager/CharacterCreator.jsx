import InputName from '../components/InputName';
import ClassSelection from '../components/ClassSelection'
import CharacterPreview from '../components/CharacterPreview';

import { Link } from "solid-app-router";

import { setCharacter, rollPreset } from '../../Character';

function CharacterCreator() {
    rollPreset();

    return (
        <div class="center">
            <div class="row">
                <div class="col-md-auto">
                    <h1 class="display-6">Character Creator</h1>
                </div>
                <div class="col-md-auto ms-auto my-auto">
                    <button type="button" class="btn btn-outline-secondary" onClick={() => rollPreset()}>
                        <i class="bi bi-dice-5-fill"></i>
                    </button>
                </div>
            </div>
            <br />
            <InputName />
            <br />
            <ClassSelection />
            <br />
            <CharacterPreview />
            <br />
            <div class="row justify-content-md-center py-4">
                <button type="button" class="btn btn-primary btn-lg col col col-lg-3 mx-2" onClick={setCharacter}>Create</button>
                <Link href="/" class="btn btn-outline-danger btn-lg col col col-lg-3 mx-2">Cancel</Link>
            </div>
        </div>
    );
}

export default CharacterCreator;
