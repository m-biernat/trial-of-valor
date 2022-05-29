import { completeSetup, backStage, game, checked, setChecked, newPlacement} from "../../Game"
import { tokens, placements, setup } from "../../Data";
import { For } from "solid-js";
import { ModalOk, getModal, ModalAccept } from "../components/Modals";

function TokenPlacement() {    
    function onNext() {
        if (checked.every((el) => el === true))
            getModal("all-checked").show();
        else 
            getModal("not-checked").show();
    }

    return (
        <div class="center">
            <h5>Place tokens and check:</h5>
            <div class="list-group">
                <For each={Object.keys(setup)} fallback={
                    <label class="list-group-item py-3">
                        <em>Placement list is empty</em>
                    </label>
                }>
                {(item, index) => (
                    <label class="list-group-item d-flex align-items-center py-3">
                        <input class="form-check-input me-2 my-auto" type="checkbox" checked={checked[index()]} onChange={e => setChecked(index(), e.target.checked)} />
                        <span class="badge rounded-pill bg-secondary me-1">{placements[item].token}</span>
                        {tokens[placements[item].token].name}
                        <span class="ms-auto fw-bold">{placements[item].values[game.placement]}</span>
                    </label>
                )}
                </For>
            </div>
            
            <div class="row ms-auto me-auto">
                <button type="button" class="btn btn-outline-primary my-3" onClick={() => newPlacement()}>Get different placement list ({game.placement + 1})</button>
            </div>
            
            <div class="row justify-content-md-center py-2">
                <button type="button" class="btn btn-primary btn-lg col col-lg-3 mx-2" onClick={() => onNext()}>Complete</button>
                <button type="button" class="btn btn-outline-secondary btn-lg col col-lg-3 mx-2" onClick={() => backStage()}>Back</button>
            </div>

            <ModalOk id="not-checked" title="Checklist is not complete" body={
                <div class="text-center">
                    <h5>You have to <strong>check all</strong> points to proceed!</h5>
                </div>
            } />

            <ModalAccept id="all-checked" title="Setup complete" action={() => completeSetup()} body={
                <div class="text-center">
                    <h5>Are you sure you want to proceed?</h5>
                </div>
            } />
        </div>
    );
}

export default TokenPlacement;
