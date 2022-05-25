import { addNew, modify, remove, character, mark } from "../../Character";
import { categories } from "../../Data";

import { AccordionEmpty, AccordionHeader, AccordionItem } from "./Accordion";
import { ModalAccept } from "./Modals";

import { createSignal, Show } from "solid-js";
import { parseHTML } from "../../Utils";

export function ItemList(props) {
    const category = categories[props.categoryName];
    const firstKey = Object.keys(category)[0];

    const [active, setActive] = createSignal({id: firstKey, index: 0});
    const [value, setValue] = createSignal(firstKey);

    return (
        <>
            <div class="accordion" id={`${props.name}-list`}>
                <AccordionHeader title={props.title} symbol={props.symbol} target={`#add-new-${props.name}`} />
                <Show when={character[props.categoryName].length > 0} fallback={<AccordionEmpty name={props.name} />}>
                    <For each={character[props.categoryName]} fallback={<div>Loading...</div>}>
                        {(item, index) => (
                            <AccordionItem 
                                parent={`#${props.name}-list`} 
                                id={`${props.name}-${index()}`} 
                                index={props.index({quantity: item.quantity})} 
                                title={<Label id={item.id} category={category} />}
                                body={parseHTML(category[item.id].description)}
                                buttons={props.button({name: props.name, category: category, active: active(), status: item.quantity})}
                                onClick={() => setActive({id: item.id, index: index()})}
                            />
                        )}
                    </For>
                </Show>
            </div>
            <ModalAccept 
                id={`add-new-${props.name}`} 
                title={`Add new ${props.name}`} 
                action={() => addNew(value(), props.categoryName)} 
                body={
                    <select class="form-select" value={value()} onChange={(event) => setValue(event.target.value)}>
                        <For each={Object.keys(category)} fallback={<div>Loading...</div>}>
                            {(item) => (
                                <option value={item}>({item}) {category[item].name}</option>
                            )}
                        </For>
                    </select>
            }/>
            {props.modal({name: props.name, category: category, categoryName: props.categoryName, active: active()})}
        </>
    );
}

function Label(props) {
    return(
        <div class="text-center">
            <span class="badge rounded-pill bg-secondary me-1">{props.id}</span>
            {props.category[props.id].name}
        </div>
    );
}

export function ModalARD(props) {
    return (
        <>
            <ModalAccept id={`add-${props.name}`} title={`Add ${props.name}`} action={() => modify(props.active.index, props.categoryName, 1)} body={
                <div>
                    <p class="text-center">Do you want to add one more:</p>
                    <Label id={props.active.id} category={props.category} />
                </div>
            }/>
            <ModalAccept id={`remove-${props.name}`} title={`Remove ${props.name}`} action={() => modify(props.active.index, props.categoryName, -1)} body={
                <div>
                    <p class="text-center">Do you really want to remove one of:</p>
                    <Label id={props.active.id} category={props.category} />
                </div>
            }/>
            <ModalAccept id={`delete-${props.name}`} title={`Delete ${props.name}`} action={() => remove(props.active.index, props.categoryName)} body={
                <div>
                    <p class="text-center">Do you really want to remove:</p>
                    <Label id={props.active.id} category={props.category} />
                </div>
            }/>
        </>
    );
}

export function ButtonARD(props) {
    return (
        <div class="row">
            <div class="col-auto ms-auto me-auto mt-3">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={`#add-${props.name}`}><i class="bi bi-journal-plus"></i></button>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={`#remove-${props.name}`}><i class="bi bi-journal-minus"></i></button>
                </div>
                    <button type="button" class="btn btn-outline-danger ms-2" data-bs-toggle="modal" data-bs-target={`#delete-${props.name}`}><i class="bi bi-trash3"></i></button>
            </div>
        </div>
    );
}

export function ModalMAC(props) {
    return (
        <>
            <ModalAccept id={`mark-${props.name}-as-complete`} title={`Mark ${props.name} as complete`} action={() => mark(props.active.index, props.categoryName)} body={
                <div>
                    <p class="text-center">Do you want to mark this {props.name} as complete:</p>
                    <Label id={props.active.id} category={props.category} />
                </div>
            }/>
        </>
    );
}

export function ButtonMAC(props) {
    return (
        <Show when={props.status > 0}>
            <div class="row">
                <div class="col-auto ms-auto me-auto mt-3">
                    <button type="button" class="btn btn-outline-success ms-2" data-bs-toggle="modal" data-bs-target={`#mark-${props.name}-as-complete`}><i class="bi bi-check-lg"></i></button>
                </div>
            </div>
        </Show>
    );
}

export function IndexNumber(props) {
    return (
        <strong>{props.quantity}</strong>
    );
}

export function IndexMark(props) {
    return (
        <Show when={props.quantity > 0} fallback={
            <strong class="mark-index">✓</strong>
        }>
            <strong class="mark-index">?</strong>
        </Show>
    );
}
