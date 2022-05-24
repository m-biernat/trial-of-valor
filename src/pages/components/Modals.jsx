export function Modal(props) {
    return (
        <div class="modal fade" id={props.id} tabindex="-1" aria-labelledby={`${props.id}Label`} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id={`${props.id}Label`}>{props.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {props.body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export function ModalAccept(props) {
    return (
        <div class="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`${props.id}Label`} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id={`${props.id}Label`}>{props.title}</h5>
                </div>
                <div class="modal-body">
                    {props.body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={props.action}>Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export function ModalNext(props) {
    return (
        <div class="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`${props.id}Label`} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id={`${props.id}Label`}>{props.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {props.body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={props.target} data-bs-dismiss="modal" onClick={props.action}>Next</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
        </div>
    );
}
