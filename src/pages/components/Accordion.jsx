export function AccordionHeader(props) {
    return (
        <div class="accordion-item">
            <div class="row">
                <div class="col-auto ms-1 me-auto my-auto">
                    <button class="btn" disabled>
                        <i class={props.symbol}></i>
                    </button>
                </div>
                <h5 class="col-auto ms-auto me-auto my-3">{props.title}</h5>
                <div class="col-auto ms-auto me-2 my-auto">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={props.target} onClick={props.action}>
                        <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function AccordionItem(props) {
    return (
        <div class="accordion-item">
            <h2 class="accordion-header" id={`heading-${props.id}`}>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${props.id}`} aria-expanded="true" aria-controls={`collapse-${props.id}`} onClick={props.onClick}>
                {props.index}
                <div class="vr ms-3 me-3"></div>
                {props.title}
            </button>
            </h2>
            <div id={`collapse-${props.id}`} class="accordion-collapse collapse" aria-labelledby={`heading-${props.id}`} data-bs-parent={props.parent}>
            <div class="accordion-body">
                <div class="row">
                    <div class="col-auto">
                        {props.description}
                        {props.behaviour}
                    </div>
                </div>
                {props.buttons}
            </div>
            </div>
        </div>
    );
}

export function AccordionEmpty(props) {
    return(
        <div class="accordion-item">
            <div class="text-muted text-center py-2">
                <em>Add some new {props.name}s to this empty list</em>
            </div>
        </div>
    );
}
