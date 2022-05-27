import BackButton from "./components/BackButton";

function Master() {
	return (
		<div class="container py-4 center a4">
			<div class="row">
                <div class="col-auto my-auto">
                    <BackButton href="/" />
                </div>
                <div class="col text-center">
                    <h1 class="display-6">Game Master</h1>
                </div>
				<div class="col-auto my-auto">
					<button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-game">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
			<p>Here goes some stuff</p>
		</div>
	);
}

export default Master;