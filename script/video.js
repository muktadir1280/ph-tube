const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-xs",
      "sm:btn-sm",
      "md:btn-md",
      "lg:btn-lg"
    );
    button.innerText = item.category;
    categoriesContainer.append(button);
  });
};
loadCategories();
