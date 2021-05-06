import { setPage } from "../main.js";

let auth = localStorage.getItem("auth");
let db = localStorage.getItem("db");

export const store = {
  auth,
  db: {
    users: [],
  },
  user: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    color: "#ff482f",
    ava: "",
  },
};

if (db) {
  store.db = JSON.parse(db);
}
if (auth) {
  store.user = store.db.users.find((user) => user.id === Number(auth));
}

export const setStore = (db, auth, isAuthChanged) => {
  if (!!db) {
    store.db = db;
    localStorage.setItem("db", JSON.stringify(db));
  }
  if (auth !== null) {
    store.auth = auth;
    localStorage.setItem("auth", auth);
  }
  if (isAuthChanged) {
    store.user = store.auth
      ? store.db.users.find((user) => user.id === Number(store.auth))
      : {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          color: "#ff482f",
          ava: "",
        };
  }

  setPage();
};
