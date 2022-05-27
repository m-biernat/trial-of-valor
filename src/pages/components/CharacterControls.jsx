import { ModalOk, ModalAccept, ModalNext } from "./Modals";
import { roll } from "../../Utils";
import { createSignal } from "solid-js";
import { character, modifyAttribute } from "../../Character";

function CharacterControls() {
    const [rollValue, setRollValue] = createSignal(0);
    
    function rollDice() {
        let value = roll(1, 6);
        if (value == rollValue()) {
            if (value < 6)  value++;
            else            value--;
        }
        setRollValue(value);
    }

    function pickDice(target) {
        return (
            <div>
                <div class="row">
                    <h5 class="col-auto ms-auto me-auto">Select your IRL roll value:</h5>
                </div>
                <div class="row">
                    <button type="button" class="btn col-auto ms-auto me-4" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(1)}>
                        <i class={`bi bi-dice-1 dice-2`}></i>
                    </button>
                    <button type="button" class="btn col-auto ms-4 me-4" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(3)}>
                        <i class={`bi bi-dice-3 dice-2`}></i>
                    </button>
                    <button type="button" class="btn col-auto ms-4 me-auto" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(5)}>
                        <i class={`bi bi-dice-5 dice-2`}></i>
                    </button>
                </div>
                <div class="row">
                    <button type="button" class="btn col-auto ms-auto me-4" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(2)}>
                        <i class={`bi bi-dice-2 dice-2`}></i>
                    </button>
                    <button type="button" class="btn col-auto ms-4 me-4" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(4)}>
                        <i class={`bi bi-dice-4 dice-2`}></i>
                    </button>
                    <button type="button" class="btn col-auto ms-4 me-auto" data-bs-toggle="modal" data-bs-target={target} onClick={() => setRollValue(6)}>
                        <i class={`bi bi-dice-6 dice-2`}></i>
                    </button>
                </div>
                <div class="row">
                    <h5 class="col-auto ms-auto me-auto py-2">or press 'Next' to <strong>autoroll</strong>!</h5>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div class="row">
                <div class="col-auto ms-auto">
                    <button type="button" class="btn btn-secondary btn-lg" data-bs-toggle="modal" data-bs-target="#roll" onClick={rollDice}>Roll</button>
                </div>
                <div class="col-auto ms-auto">
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#attack">Attack</button>
                </div>
                <div class="col-auto ms-auto me-auto">
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#defend">Defend</button>
                </div>
            </div>
            <ModalOk id="roll" title="Roll the dice!" body={
                <div class="row">
                    <button type="button" class="btn col-auto ms-auto me-auto" onClick={rollDice}>
                        <i class={`bi bi-dice-${rollValue()} dice`}></i>
                    </button>
                </div>
            }/>

            <ModalNext id="attack" title="Roll to attack" target="#attack-result" action={rollDice} body={
                pickDice('#attack-result')
            }/>
            <ModalOk id="attack-result" title="Your attack value" body={
                <div class="row">
                    <h1 class="col-auto ms-auto me-1">
                        <i class={`bi bi-dice-${rollValue()}`}></i>
                    </h1>
                    <h1 class="col-auto">+</h1>
                    <h1 class="col-auto">{character.attributes.ap}</h1>
                    <h1 class="col-auto">=</h1>
                    <h1 class="col-auto ms-2 me-auto">
                        <strong>{character.attributes.ap + rollValue()}</strong>
                    </h1>
                </div>
            }/>

            <ModalNext id="defend" title="Roll to defend" target="#defence-result" action={rollDice} body={
                pickDice('#defence-result')
            }/>
            <ModalAccept id="defence-result" title="Your defence value" action={() => modifyAttribute('hp', -1)} body={
                <div>
                    <div class="row">
                        <h1 class="col-auto ms-auto me-1">
                            <i class={`bi bi-dice-${rollValue()}`}></i>
                        </h1>
                        <h1 class="col-auto">+</h1>
                        <h1 class="col-auto">{character.attributes.dp}</h1>
                        <h1 class="col-auto">=</h1>
                        <h1 class="col-auto ms-2 me-auto">
                            <strong>{character.attributes.dp + rollValue()}</strong>
                        </h1>
                    </div>
                    <div class="row">
                        <h5 class="col-auto ms-auto me-auto py-2">Is your enemy's attack higher?</h5>
                    </div>
                </div>
            }/>
        </div>
    );
}

export default CharacterControls;
