const btnNext = document.querySelector(".btn-next");
const steps = document.querySelector(".steps");
const containerForm = document.querySelector(".co");
const forms = document.getElementsByClassName("form");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const message = document.querySelector(".alert");
const tabs = document.querySelector(".tabs");
const summaryTopics = document.querySelector(".summary-topics");
const summaryName = document.querySelector(".summary-name");
const summaryEmail = document.querySelector(".summary-email");

console.log(inputName, inputEmail);

let indexForm = 0;
let listTabs = [];
let name = "";
let email = "";
let patternEmail =
	/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

let patternName =
	/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;

window.addEventListener("load", () => {
	btnNext.innerText = "Continue";
	forms[indexForm].classList.add("form-show");
});

const validation = () => {
	switch (indexForm) {
		case 0:
			if (inputEmail.value && inputName.value) {
				name = inputName.value;
				email = inputEmail.value;
				forms[indexForm].classList.remove("form-show");
				steps.children[indexForm].classList.remove("step-active");
				forms[++indexForm].classList.add("form-show");
				steps.children[indexForm].classList.add("step-active");
				message.innerText = "";
			} else {
				message.innerText = "completar formulario";
			}
			break;

		case 1:
			if (tabs.getElementsByClassName("tab-select").length > 0) {
				summaryName.innerText = name;
				summaryEmail.innerText = email;
				for (let i = 0; i < listTabs.length; i++) {
					let itemTopic = document.createElement("li");
					itemTopic.innerText = listTabs[i];
					summaryTopics.appendChild(itemTopic);
				}
				forms[indexForm].classList.remove("form-show");
				steps.children[indexForm].classList.remove("step-active");
				forms[++indexForm].classList.add("form-show");
				steps.children[indexForm].classList.add("step-active");
				btnNext.innerText = "Confirm";
			} else {
				message.innerText = "seleccione al menos un topic";
			}
			break;

		case 2:
			forms[indexForm].classList.remove("form-show");
			steps.children[indexForm].classList.remove("step-active");
			indexForm = 0;
			forms[indexForm].classList.add("form-show");
			steps.children[indexForm].classList.add("step-active");
			alert("Formulario enviado");
			location.reload();
			break;
	}
};

const previous = () => {
	if (indexForm > 0) {
		forms[indexForm].classList.remove("form-show");
		steps.children[indexForm].classList.remove("step-active");
		forms[--indexForm].classList.add("form-show");
		steps.children[indexForm].classList.add("step-active");
		message.innerText = "";
	}
};

btnNext.addEventListener("click", () => validation());

inputName.addEventListener("input", (e) => {
	if (patternName.test(e.target.value)) {
		inputName.classList.remove("error-validation");
		message.innerText = "";
	} else {
		inputName.classList.add("error-validation");
	}
});

inputEmail.addEventListener("input", (e) => {
	if (patternEmail.test(e.target.value)) {
		inputEmail.classList.remove("error-validation");
		message.innerText = "";
	} else {
		inputEmail.classList.add("error-validation");
	}
});

tabs.addEventListener("click", (e) => {
	e.target.classList.toggle("tab-select");
	if (!listTabs.includes(e.target.textContent)) {
		listTabs.push(e.target.textContent);
	} else {
		listTabs.splice(listTabs.indexOf(e.target.textContent), 1);
	}

	if (tabs.getElementsByClassName("tab-select").length > 0) {
		message.innerText = "";
	}
});
