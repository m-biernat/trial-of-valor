import { characterName, setCharacterName } from '../../Character'

function InputName() {
    setCharacterName('Theoden II')

    return (
        <div class="form-floating list-group">
            <input type="text" class="form-control" id="characterNameInput" value={characterName()} onChange={e => setCharacterName(e.target.value)} />
            <label for="characterNameInput">Character name</label>
        </div>
    );
}

export default InputName;
