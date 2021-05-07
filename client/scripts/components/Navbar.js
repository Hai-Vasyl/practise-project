import { store } from "../store/main.js";
import Avatar from "./Avatar.js";

export default async function () {
  const isAuth = !!store.auth;

  const dataLinks = [
    {
      title: "Explore",
      href: "/",
      icon: `<span class="material-icons-outlined nav__icon hidden">
          explore
          </span>`,
    },
    {
      title: "About",
      href: "/about",
      icon: `<span class="material-icons-outlined nav__icon hidden">
          info
          </span>`,
    },
    {
      title: "Users",
      href: "/users",
      icon: `<span class="material-icons-outlined nav__icon hidden">
          people
          </span>`,
    },
    {
      title: "Favourites",
      isBtn: !isAuth,
      href: isAuth ? `/favourites/${store.auth}` : "",
      icon: `<span class="material-icons-outlined nav__icon hidden">
          favorite_border
          </span>`,
    },
  ];

  const links = dataLinks.reduce((acumulator, item) => {
    if (item.isBtn) {
      return (
        acumulator +
        `<button class="nav__link" data-toggle-auth-form>
        ${item.icon}
        <span class="hidden">${item.title}</span>
      </button>`
      );
    }
    return (
      acumulator +
      `<a class="nav__link ${
        item.href === location.pathname ? "nav__link--active" : ""
      }" href="${item.href}" data-link>
        ${item.icon}
        <span class="hidden">${item.title}</span>
      </a>`
    );
  }, "");

  const userAvatar = await Avatar(store.user);
  return `
    <nav class="nav">
      <div class="nav__border"><span></span><span></span></div>
      <div class="nav__links">
      <a class="nav__logo" href="/" data-link>Bookify</a>
      <div class="nav__navbar">${links}</div>
      ${
        isAuth
          ? `
        <div class="menu">
          <button class="btn-menu" id="btn-menu">
            <span class="btn-menu__title hidden">
              ${store.user.firstname[0] + store.user.lastname[0]}
            </span>
            <span class="btn-menu__avatar hidden">${userAvatar}</span>
          </button>
          <div class="menu__dropdown" id="menu_dropdown" >
            <span class="menu__triangle"></span>
            <a class="nav__link menu__link ${
              location.pathname === `/user/${store.auth}`
                ? "nav__link--active"
                : ""
            }" href="${`/user/${store.auth}`}" data-link> 
              <span class="material-icons-outlined nav__icon hidden">
                  account_circle
              </span>
              <span class="hidden">My profile</span>
            </a>
            <button class="nav__link menu__link" id="btn-logout">
              <span class="material-icons-outlined nav__icon hidden" >
                logout
              </span>
              <span class="hidden">Log out</span>
            </button>
          </div>
        </div>
      `
          : `<button class="nav__login" data-toggle-auth-form>Login</button>`
      }
      </div>
    </nav>
  `;
}
