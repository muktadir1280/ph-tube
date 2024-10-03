//categoris fetech
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// video categories fetch
const videoCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// for categories videos
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

// for categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button onclick="loadCategoryVideo(${item.category_id})" class= "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
     ${item.category}
    </button>`;
    categoriesContainer.append(buttonContainer);
  });
};

// time function
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

// videos Categories
const displayVideos = (videos) => {
  const videoConatiner = document.getElementById("videos");
  videoConatiner.innerHTML = "";
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact flex-col";
    card.innerHTML = `
    <figure class=" h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover "/>
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="right-2 bottom-2 bg-black text-white absolute">
            ${getTimeString(video.others.posted_date)}
          </span>`
      }
      
  </figure>


  <div class="flex px-0 py-2 gap-4">
    <div>
      <img class="h-10 w-10 rounded-full object-cover" src=${
        video.authors[0].profile_picture
      }/>
  </div>
  <div>
      <h2 class="card-title">${video.title}</h2>
      <div class="flex gap-2 items-center">
        <p>${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified === true
            ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000">`
            : " "
        }
      </div>
    </div>

  `;
    videoConatiner.append(card);
  });
};
loadCategories();
videoCategories();
