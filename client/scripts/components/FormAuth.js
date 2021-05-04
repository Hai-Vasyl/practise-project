export default async function () {
  const dataFields = [
    { id: "firstname", label: "Firstname", type: "text", hidden: true },
    { id: "lastname", label: "Lastname", type: "text", hidden: true },
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
  ];

  const fields = dataFields.reduce((acumulator, item) => {
    return (
      acumulator +
      `<div id="${item.id}" class="field ${item.hidden ? "field--hide" : ""}">
        <label class="field__label" for="${item.id}">${item.label}</label>
        <input class="field__input" type="${item.type}" name="${item.id}" id="${
        item.id
      }-input"/>
        <span class="field__error" id="${item.id}-error"></span>
      </div>`
    );
  }, "");

  return `
    <form class="form-auth" id="auth-form" data-login="true">
      <h1 class="form-auth__title" id="auth-title">Login</h1>
      <div class="form-auth__fields">${fields}</div>
      <div class="form-auth__btns">
        <button class="btn btn__prime" id="btn-submit-auth-form">Login</button>
        <button class="btn btn__simple" type="button" id="btn-flip-auth-form" >Sign Up</button>
      </div>
    </form>
  `;
}
