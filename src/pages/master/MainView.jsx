import { game, endTurn } from "../../Game";
import CharacterList from "../components/CharacterList";

function MainView() {
    return (
        <div class="row">
            <div class="col">
                <CharacterList showKillButton={true} />
                <div class="row my-3">
                    <div class="col-auto my-auto ms-auto me-auto">
                        <h4 class="my-auto">Round: <span class="badge bg-secondary my-auto">{game.round}</span></h4>
                    </div>
                    <div class="col-auto me-auto">
                        <button type="button" class="btn btn-primary btn-lg my-auto" onClick={() => endTurn()}>
                            End turn
                        </button>
                    </div>
                </div>
            </div>

            <div class="col">
                This is temporary
                <CharacterList showKillButton={true} />
                Here will be a list with monsters etc.
            </div>
        </div>
    );
}

export default MainView;
