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
    <div class="bg" id="bg" >
      <span class="material-icons-outlined btn-close">
      close
      </span>
    </div>
    <div class="bg-clear" id="bg-clear" >
    </div>
    ${navbar}
    ${auth}
    ${body}
  `;
};

const moveTo = (path) => {
  history.pushState(null, null, path);
  setPage();
};

export const setPage = () => {
  const routes = [
    { path: "/", title: "Home", component: Home },
    { path: "/users", title: "All users", component: Users },
    { path: "/about", title: "About", component: About },
    { path: "/volume/:bookid", title: "Book", component: Book },
    { path: "/favourites/:userid", title: "Favourites", component: Favourites },
    { path: "/user/:userid", title: "My profile", component: Profile },
  ];

  let path = location.pathname;
  let route;

  if (path.includes("?")) {
    const queryIndex = path.indexOf("?");
    path = path.slice(0, queryIndex);
  }

  const locationParts = path.split("/");
  routes.forEach((item) => {
    const routeParts = item.path.split("/");
    if (routeParts.length === locationParts.length) {
      if (
        item.path === path ||
        (item.path.includes(":") &&
          routeParts.slice(0, -1).join("/") ===
            locationParts.slice(0, -1).join("/"))
      ) {
        route = item;
      }
    }
  });

  if (!route) {
    route = routes[0];
  }

  render(route.component);
};

document.addEventListener("DOMContentLoaded", async () => {
  setPage();

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
    } else if (event.target.matches("#bg")) {
      document
        .getElementById("auth-form")
        .classList.remove("form-auth--active");
      event.target.classList.remove("bg--active");
    } else if (event.target.matches("#bg-clear")) {
      document
        .getElementById("menu_dropdown")
        .classList.remove("menu__dropdown--active");
      document.getElementById("btn-menu").classList.remove("btn-menu--active");
      event.target.classList.remove("bg-clear--active");
    } else if (event.target.matches("#btn-menu")) {
      event.target.classList.toggle("btn-menu--active");
      document
        .getElementById("menu_dropdown")
        .classList.toggle("menu__dropdown--active");
      document.getElementById("bg-clear").classList.toggle("bg-clear--active");
    } else if (event.target.matches("[data-toggle-auth-form]")) {
      document.getElementById("auth-form").classList.add("form-auth--active");
      document.getElementById("bg").classList.add("bg--active");
    } else if (event.target.matches("#btn-logout")) {
      setStore(null, "", true);
    }
  });
});

window.addEventListener("popstate", setPage);
