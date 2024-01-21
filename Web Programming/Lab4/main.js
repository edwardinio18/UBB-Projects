const submenusItems = ["Submenu 1", "Submenu 2", "Submenu 3"]

const menuItems = [
  {
    title: "Menu 1",
    submenus: submenusItems,
  },
  {
    title: "Menu 2",
    submenus: submenusItems,
  },
  {
    title: "Menu 3",
    submenus: submenusItems,
  },
  {
    title: "Menu 4",
    submenus: submenusItems,
  },
  {
    title: "Menu 5",
    submenus: submenusItems,
  },
]

const menuDiv = document.getElementById("menu")
const ulElement = document.createElement("ul")

menuItems.forEach((menuItem) => {
  const liElement = document.createElement("li")
  const aElement = document.createElement("a")
  aElement.href = "#"
  aElement.textContent = menuItem.title
  liElement.appendChild(aElement)

  const submenuUlElement = document.createElement("ul")
  menuItem.submenus.forEach((submenuItem) => {
    const submenuLiElement = document.createElement("li")
    const submenuAElement = document.createElement("a")
    submenuAElement.href = "#"
    submenuAElement.textContent = submenuItem
    submenuLiElement.appendChild(submenuAElement)
    submenuUlElement.appendChild(submenuLiElement)
  })
  liElement.appendChild(submenuUlElement)

  ulElement.appendChild(liElement)
})

menuDiv.appendChild(ulElement)

var menu = document.getElementById("menu")
menu.style.display = "none"

var main_menu = document.getElementById("main_menu")
main_menu.addEventListener("mouseover", function () {
  menu.style.display = "block"
})

main_menu.addEventListener("mouseout", function () {
  menu.style.display = "none"
})

var submenus = document.querySelectorAll("#menu li ul")
for (var i = 0; i < submenus.length; i++) {
  submenus[i].style.display = "none"
}

var menu_items = document.querySelectorAll("#menu li")
for (var i = 0; i < menu_items.length; i++) {
  menu_items[i].addEventListener("mouseover", function () {
    this.children[1].style.display = "block"
  })

  menu_items[i].addEventListener("mouseout", function () {
    this.children[1].style.display = "none"
  })
}

var submenu_items = document.querySelectorAll("#menu li ul li")
for (var i = 0; i < submenu_items.length; i++) {
  submenu_items[i].addEventListener("mouseover", function () {
    this.children[1].style.display = "block"
  })

  submenu_items[i].addEventListener("mouseout", function () {
    this.children[1].style.display = "none"
  })
}