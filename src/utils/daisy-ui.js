export function closeDropdown(dropdown) {
  dropdown.value.removeAttribute('open')
}

export function closeDrawer(drawer) {
  drawer.classList.remove('drawer-open')
}

export function openDrawer(drawer) {
  drawer.classList.add('drawer-open')
}
