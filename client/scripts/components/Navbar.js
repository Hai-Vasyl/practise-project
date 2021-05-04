import { store } from "../store/main.js";

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
  // : [
  //     { title: "Discover", href: "/" },
  //     { title: "Users", href: "/users" },
  //     {
  //       title: "Favourites",
  //       href: `/favourites/${store.auth}`,
  //       icon: `<span class="material-icons-outlined">
  //       favorite_border
  //       </span>`,
  //     },
  //     {
  //       title: "Profile",
  //       href: `/profile/${store.auth}`,
  //       icon: `<span class="material-icons-outlined">
  //       account_circle
  //       </span>`,
  //     },
  //   ];

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

  // ${links}
  // <button id="btn-change" >Change</button>

  return `
    <nav class="nav">
      <div class="nav__links">
      <a class="nav__logo" href="/" data-link>Bookify</a>
      <div class="nav__navbar">${links}</div>
      ${
        isAuth
          ? `
        <div>
          <div>kjkj</div>
        </div>
      `
          : `<button class="nav__login" data-toggle-auth-form>Login</button>`
      }
      </div>
    </nav>
  `;
}
