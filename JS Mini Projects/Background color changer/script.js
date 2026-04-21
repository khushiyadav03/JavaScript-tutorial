const parent = document.getElementById("parent");
const colorName = document.getElementById("colorName");
const colorValue = document.getElementById("colorValue");
const root = document.documentElement;

parent.addEventListener("click", (event) => {
    const button = event.target.closest(".color-btn");

    if (!button) {
        return;
    }

    const { color, name } = button.dataset;

    root.style.setProperty("--bg-color", color);
    colorName.textContent = name;
    colorValue.textContent = color;

    document.querySelectorAll(".color-btn").forEach((item) => {
        item.classList.toggle("is-active", item === button);
    });
});
