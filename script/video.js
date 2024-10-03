//categoris fetech
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// video categories fetch
const videoCategories = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// for categories videos
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetailts = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const detailsContainer = document.getElementById("modal-content");
  document.getElementById("showModalData").click();
  detailsContainer.innerHTML = `
  <img src=${video.thumbnail} />
  <p>${video.description}
  </p>
  `;
};
// for categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id=btn-${item.category_id} onclick="loadCategoryVideo(${item.category_id})" class= "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg category-btn">
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
  if (videos.length === 0) {
    videoConatiner.classList.remove("grid");
    videoConatiner.innerHTML = `
    <div class= "min-h-[300px] flex flex-col gap-5 items-center justify-center">
    <img src="./assets/Icon.png"/>
    <p class="text-xl font-bold">No Content Here</p>
    </div>`;
    return;
  } else {
    videoConatiner.classList.add("grid");
  }

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
        <p> <button onclick="loadDetailts('${
          video.video_id
        }')" class="btn btn-sm btn-error">Details</button>
        </p>
    </div>
  `;
    videoConatiner.append(card);
  });
};
document.getElementById("search-Input").addEventListener("keyup", (e) => {
  videoCategories(e.target.value);
});
loadCategories();
videoCategories();
