import { createEffect } from "solid-js";
import { game, endTurn, lastManStanding } from "../../Game";
import CharacterList from "../components/CharacterList";
import { EncounterList } from "../components/EncounterManagement";
import { getModal, ModalOk } from "../components/Modals";

function MainView() {
    createEffect(() => {
        if (lastManStanding())
            getModal("last-man-standing").show();
    });

    createEffect(() => {
        if (game.round == game.maxRounds)
            getModal("round-limit").show();
    });

    return (
        <>
        <div class="row">
            <div class="col">
                <CharacterList showKillButton={true} />
                <div class="row my-3">
                    <div class="col-auto my-auto ms-auto me-auto">
                        <h4 class="my-auto">Round: <span class="badge bg-secondary my-auto">{game.round}</span></h4>
                    </div>
                    <div class="col-auto me-auto">
                        <button type="button" class="btn btn-primary btn-lg my-auto" disabled={lastManStanding()} onClick={() => endTurn()}>
                            End turn
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <EncounterList />
            </div>
        </div>
        <ModalOk id="last-man-standing" title="Last man standing" body={
            <div class="text-center">
                <h5><strong>{game.characters[game.turn].name}</strong> is the last man standing!</h5>
            </div>
        } />
        <ModalOk id="round-limit" title="Round limit" body={
            <div class="text-center">
                <h5>Game has reached its round limit (<strong>{game.maxRounds}</strong>)</h5>
            </div>
        } />
        </>
    );
}

export default MainView;
