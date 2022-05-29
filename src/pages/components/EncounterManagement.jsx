import { encounters, placements, tokens } from "../../Data";

import { AccordionEmpty, AccordionHeader, AccordionItem } from "./Accordion";
import { ModalOk, ModalNext, ModalAccept } from "./Modals";

import { createSignal, Show } from "solid-js";
import { roll, parseHTML } from "../../Utils";
import { game, addEncounter, removeEncounter } from "../../Game";

export function EncounterList() {
    const firstKey = Object.keys(encounters)[0];
    
    const [active, setActive] = createSignal({id: firstKey, index: 0});
    const [value, setValue] = createSignal(firstKey);

    function placement(id) {
        return placements[encounters[id].placement];
    }

    function token(id) {
        return tokens[placement(id).token];
    }

    return (
        <>
            <div class="accordion" id="encounter-list">
                <AccordionHeader title="Encounters" symbol="bi bi-geo-alt ms-1" target="#add-new-encounter" />
                <Show when={game.encounters.length > 0} fallback={<AccordionEmpty name="encounter" />}>
                    <For each={game.encounters} fallback={<div>Loading...</div>}>
                        {(item, index) => (
                            <AccordionItem 
                                parent="#encounter-list" 
                                id={`encounter-${index()}`} 
                                index={<strong>{placement(item).values[game.placement]}</strong>} 
                                title={<Label id={item} name={token(item).name} />}
                                description={parseHTML(encounters[item].description)}
                                behaviour={<Details id={item} />}
                                buttons={<ButtonsAttackDefenceRemove />}
                                onClick={() => setActive({id: item, index: index()})}
                            />
                        )}
                    </For>
                </Show>
            </div>
            <ModalAccept 
                id="add-new-encounter" 
                title="Add new encounter" 
                action={() => addEncounter(value())}
                body={
                    <select class="form-select" value={value()} onChange={(event) => setValue(event.target.value)}>
                        <For each={Object.keys(encounters)} fallback={<div>Loading...</div>}>
                            {(item) => (
                                <option value={item}>({item}) {token(item).name}</option>
                            )}
                        </For>
                    </select>
            }/>
            <ModalAttackDefenceRemove id={active().id} name={token(active().id).name} index={active().index} />
        </>
    );
}

function Label(props) {
    return(
        <div class="text-center">
            <span class="badge rounded-pill bg-secondary me-1">{props.id}</span>
            {props.name}
        </div>
    );
}

function Details(props) {
    return(
        <div class="my-2">
            <strong>AP</strong>: {encounters[props.id].ap}
            <strong class="ms-3">DP</strong>: {encounters[props.id].dp}
        </div>
    );
}

export function ModalAttackDefenceRemove(props) {
    const [rollValue, setRollValue] = createSignal(0);

    function rollDice() {
        let value = roll(1, 6);
        if (value == rollValue()) {
            if (value < 6)  value++;
            else            value--;
        }
        setRollValue(value);
    }

    return (
        <>
            <ModalNext id="encounter-attack" title={`Roll ${props.name}'s attack`} target="#encounter-attack-result" action={rollDice} body={
                <div>
                    <p class="text-center">Proceed to roll attack for:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
            <ModalOk id="encounter-attack-result" title={`${props.name}'s attack value`} body={
                <div class="row">
                    <h1 class="col-auto ms-auto me-1">
                        <i class={`bi bi-dice-${rollValue()}`}></i>
                    </h1>
                    <h1 class="col-auto">+</h1>
                    <h1 class="col-auto">{encounters[props.id].ap}</h1>
                    <h1 class="col-auto">=</h1>
                    <h1 class="col-auto ms-2 me-auto">
                        <strong>{encounters[props.id].ap + rollValue()}</strong>
                    </h1>
                </div>
            }/>

            <ModalNext id="encounter-defence" title={`Roll ${props.name}'s defence`} target="#encounter-defence-result" action={rollDice} body={
                <div>
                    <p class="text-center">Proceed to roll defence for:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
            <ModalAccept id="encounter-defence-result" title={`${props.name}'s defence value`} action={() => removeEncounter(props.index)} body={
                <div>
                    <div class="row">
                        <h1 class="col-auto ms-auto me-1">
                            <i class={`bi bi-dice-${rollValue()}`}></i>
                        </h1>
                        <h1 class="col-auto">+</h1>
                        <h1 class="col-auto">{encounters[props.id].dp}</h1>
                        <h1 class="col-auto">=</h1>
                        <h1 class="col-auto ms-2 me-auto">
                            <strong>{encounters[props.id].dp + rollValue()}</strong>
                        </h1>
                    </div>
                    <div class="row">
                        <h5 class="col-auto ms-auto me-auto pt-2">Is your attack higher?</h5>
                    </div>
                </div>
            }/>

            <ModalAccept id="encounter-remove" title="Remove encounter" action={() => removeEncounter(props.index)} body={
                <div>
                    <p class="text-center">Do you really want to remove:</p>
                    <Label id={props.id} name={props.name} />
                </div>
            }/>
        </>
    );
}

export function ButtonsAttackDefenceRemove() {
    return (
        <div class="row">
            <div class="col-auto ms-auto me-auto">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#encounter-attack"><i class="bi bi-dice-5"></i> Attack</button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#encounter-defence"><i class="bi bi-dice-5"></i> Defence</button>
                </div>
                    <button type="button" class="btn btn-outline-danger ms-2" data-bs-toggle="modal" data-bs-target="#encounter-remove"><i class="bi bi-trash3"></i></button>
            </div>
        </div>
    );
}
