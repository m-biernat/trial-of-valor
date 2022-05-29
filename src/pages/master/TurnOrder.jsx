import { nextStage, backStage, game, setGame } from "../../Game"
import { shuffle } from "../../Utils";
import CharacterList from "../components/CharacterList";

function TurnOrder() {
    function changeOrder() {
        const arr = JSON.parse(JSON.stringify(game.characters));
        setGame('characters', shuffle(arr));
    }

    return (
        <div class="center">
            <CharacterList showKillButton={false} />
            <div class="row ms-auto me-auto">
                <button type="button" class="btn btn-outline-primary my-3" onClick={() => changeOrder()}>Change player turn order</button>
            </div>
            <div class="row justify-content-md-center py-2">
                <button type="button" class="btn btn-primary btn-lg col col-lg-3 mx-2" onClick={() => nextStage()}>Next</button>
                <button type="button" class="btn btn-outline-secondary btn-lg col col-lg-3 mx-2" onClick={() => backStage()}>Back</button>
            </div>
        </div>
    );
}

export default TurnOrder;