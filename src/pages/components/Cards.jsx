import { categories, reverses } from "../../Data";
import { parseHTML } from "../../Utils";

export function Face(props) {
    const card = categories[props.category][props.id];
    return(
        <div class="card border-secondary playing-card playing-card-front ms-1 my-1">
            <h5 class="my-2">{props.id}</h5>
            <div class="pe-2 ps-2">
                <h5 class="card-title text-center mb-2 my-2" style="font-family: 'Cinzel', serif;">{card.name}</h5>
                <div class="my-4" style="font-family: 'Della Respira', serif;">
                    <p class="card-text justify-text">{parseHTML(card.description)}</p>
                    <p class="card-text text-center my-2">{parseHTML(card.behaviour)}</p>
                </div>
            </div>
            <h6 class="card-subtitle text-muted text-center my-auto mb-3" style="font-family: 'Cinzel', serif;">{props.category.toUpperCase()}</h6>
        </div>
    );
}

export function Reverse(props) {
    const id = props.id.substring(0, props.id.indexOf('.'));
    return(
        <div class="card playing-card playing-card-reverse ms-1 my-1">
            <div class="text-center my-auto ms-1" style="filter: invert(71%) sepia(3%) saturate(22%) hue-rotate(328deg) brightness(101%) contrast(86%); transform: scaleX(-1); -webkit-transform: scaleX(-1);">
                <img src={reverses[id]?.url} width="100" height="100" />
            </div>
        </div>
    );
}
