import { categories } from "../../Data";
import { parseHTML } from "../../Utils";

export function Face(props) {
    const card = categories[props.category][props.id];
    return(
        <div class="card border-secondary playing-card ms-1 my-1">
            <h5 class="my-2">{props.id}</h5>
            <div class="pe-2 ps-2">
                <h5 class="card-title text-center mb-2">{card.name}</h5>
                <p class="card-text justify-text">{parseHTML(card.description)}</p>
                <p class="card-text text-center my-2">{parseHTML(card.behaviour)}</p>
            </div>
            <h6 class="card-subtitle text-muted text-center my-auto mb-3">{props.category.toUpperCase()}</h6>
        </div>
    );
}

export function Reverse() {
    return(
        <div class="card border-secondary playing-card ms-1 my-1">
            
        </div>
    );
}
