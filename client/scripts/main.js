import Home from "./pages/Home.js";
import Favourites from "./pages/Favourites.js";
import Profile from "./pages/Profile.js";
import Users from "./pages/Users.js";
import Book from "./pages/Book.js";
import About from "./pages/About.js";
import Navbar from "./components/Navbar.js";
import FormAuth from "./components/FormAuth.js";
import { store, setStore } from "./store/main.js";
import { getColor } from "./helpers/randomColor.js";

const render = async (content) => {
  const navbar = await Navbar();
  const body = await content();
  const auth = await FormAuth();

  document.getElementById("root").innerHTML = `
    ${navbar}
    ${auth}
    ${body}
  `;
};

const moveTo = (path) => {
  history.pushState(null, null, path);
  setPage();
};

export const setPage = async () => {
  const routes = [
    { path: "/", title: "Home", component: Home },
    { path: "/users", title: "All users", component: Users },
    { path: "/about", title: "About", component: About },
    { path: "/volume/:bookid", title: "Book", component: Book },
    { path: "/favourites/:userid", title: "Favourites", component: Favourites },
    { path: "/user/:userid", title: "My profile", component: Profile },
  ];

  let route = routes.find((route) => route.path === location.pathname);

  if (!route) {
    route = routes[0];
  }

  render(route.component);
};

document.addEventListener("DOMContentLoaded", async () => {
  await setPage();

  document.body.addEventListener("input", (event) => {
    if (event.target.matches("[data-input]")) {
      const inputId = event.target.getAttribute("name");
      document.getElementById(`${inputId}-error`).innerHTML = "";
    }
  });

  document.body.addEventListener("submit", (event) => {
    if (event.target.matches("#auth-form")) {
      event.preventDefault();

      const authForm = document.getElementById("auth-form");
      const fields = {
        firstname: document.getElementById("firstname-input").value,
        lastname: document.getElementById("lastname-input").value,
        email: document.getElementById("email-input").value,
        password: document.getElementById("password-input").value,
      };

      const isLogin = authForm.getAttribute("data-login");
      let isError = false;

      Object.keys(fields).forEach((key) => {
        if (isLogin && (key === "firstname" || key === "lastname")) {
          return;
        } else if (!fields[key]) {
          isError = true;
          document.getElementById(`${key}-error`).innerHTML =
            "This field cannot be empty!";
        }
      });

      if (isError) {
        return;
      }

      let user = store.db.users.find((user) => user.email === fields.email);
      if (isLogin) {
        if (!user) {
          document.getElementById(`email-error`).innerHTML =
            "This email is not exists, choose another one!";
          return;
        }
        user = store.db.users.find(
          (user) =>
            user.email === fields.email && user.password === fields.password,
        );
        if (!user) {
          document.getElementById(`password-error`).innerHTML =
            "Password is wrong, please try again!";
          return;
        }

        setStore(null, user.id, true);
      } else {
        if (user) {
          document.getElementById(`email-error`).innerHTML =
            "This email already exists, choose another one!";
          return;
        }

        const { firstname, lastname, email, password } = fields;
        const newUser = {
          id: Date.now(),
          firstname,
          lastname,
          email,
          password,
          color: getColor(),
          ava: "",
          date: new Date(),
        };

        setStore(
          { ...store.db, users: [...store.db.users, { ...newUser }] },
          newUser.id,
          true,
        );
      }
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      moveTo(event.target.href);
    } else if (event.target.matches("#btn-flip-auth-form")) {
      document.getElementById("firstname-error").innerHTML = "";
      document.getElementById("lastname-error").innerHTML = "";
      document.getElementById("email-error").innerHTML = "";
      document.getElementById("password-error").innerHTML = "";

      document.getElementById("firstname").classList.toggle("field--hide");
      document.getElementById("lastname").classList.toggle("field--hide");

      const btnSubmit = document.getElementById("btn-submit-auth-form");
      const authForm = document.getElementById("auth-form");
      const authTitle = document.getElementById("auth-title");

      if (authForm.getAttribute("data-login")) {
        authForm.removeAttribute("data-login");
        authTitle.innerHTML = "Register";
        btnSubmit.innerHTML = "Register";
        event.target.innerHTML = "Sign In";
      } else {
        authForm.setAttribute("data-login", true);
        authTitle.innerHTML = "Login";
        btnSubmit.innerHTML = "Login";
        event.target.innerHTML = "Sign Up";
      }
    } else if (event.target.matches("#btn-change")) {
      console.log("-----");
      let newAuth = store.auth;

      if (!store.auth) {
        newAuth = 1;
      } else {
        newAuth++;
      }

      setStore(null, newAuth);
      console.log("Update");
    } else if (event.target.matches("[data-toggle-auth-form]")) {
      console.log("toggle auth");
    }
  });
});

window.addEventListener("popstate", setPage);
