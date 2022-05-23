import { Link } from "solid-app-router";

function BackButton(props) {
    return (
        <Link href={props.href} type="button" class="btn btn-outline-primary">
            <i class="bi bi bi-arrow-left"></i>
        </Link>
    );
}

export default BackButton;
