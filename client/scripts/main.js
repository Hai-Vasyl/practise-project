import Home from "./pages/Home.js";
import Favourites from "./pages/Favourites.js";
import Profile from "./pages/Profile.js";
import Users from "./pages/Users.js";
import Book from "./pages/Book.js";
import About from "./pages/About.js";
import Navbar from "./components/Navbar.js";
import FormAuth from "./components/FormAuth.js";
import { store, setStore } from "./store/main.js";

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

  document.body.addEventListener("submit", (event) => {
    if (event.target.matches("#auth-form")) {
      event.preventDefault();
      console.log("Submited");
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      moveTo(event.target.href);
    } else if (event.target.matches("#btn-flip-auth-form")) {
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
      console.log("dsf===");
      let newAuth = store.auth;

      if (!store.auth) {
        newAuth = 1;
      } else {
        newAuth++;
      }

      setStore(null, newAuth);
      console.log("Update");
    } else if (event.target.matches("#btn-output")) {
      console.log({ dataO: store });
    } else if (event.target.matches("[data-toggle-auth-form]")) {
      console.log("toggle auth");
    }
  });
});

window.addEventListener("popstate", setPage);
