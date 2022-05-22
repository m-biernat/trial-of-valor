import InputName from '../components/InputName';
import ClassSelection from '../components/ClassSelection'
import CharacterPreview from '../components/CharacterPreview';
import { Link } from "solid-app-router"
import { setCharacter } from '../../Character';

function CharacterCreator() {

    return (
        <div class="center">
            <h1 class="display-6">Character Creator</h1>
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
