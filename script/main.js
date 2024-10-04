// for categories button (pair no-1)
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// for time function
function totalTimes(time) {
  const hour = parseInt(time / 3600);
  let remaingingSec = time % 3600;
  const minute = parseInt(remaingingSec / 60);
  remaingingSec = remaingingSec % 60;
  return `${hour} hours ${minute} minutes ${remaingingSec} second ago`;
}

// remove active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("all-btn")
  for (let btn of buttons) {
    btn.classList.remove("active")
  }
}
// clicking inside button id
const clicked = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`)
      removeActiveClass();
      activeBtn.classList.add("active");
      displayVideos(data.category)
    })
    .catch((error) => console.log(error))
};

//video details
const phoneDetails = (videoID) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`)
    .then(res => res.json())
    .then(data => displayDetails(data.video))
    .catch(error => console.log(error))

}

// modal
const displayDetails = (video) => {
  const modalDetails = document.getElementById("modal-container");
  modalDetails.innerHTML = `
  <img src = ${video.thumbnail} />
  <p>${video.description}</p>
  `
  document.getElementById("showModalData").click();
}

// for all videos fetch (pair no-2)
const loadVideos = (search = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// for all videos display (pair no-2)
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="flex flex-col gap-3 justify-center items-center">
    <img src = "./assets/Icon.png"/>
    <p class= "text-xl font-bold">No Content Here
    <p>
    </div>
    
    `;
    return
  } else {
    videoContainer.classList.add("grid")
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    
  <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail} />
      ${video.others.posted_date?.length === 0
        ? ""
        : `<span class="absolute right-2 bottom-2 bg-black text-white">${totalTimes(
          video.others.posted_date
        )}
      </span>`
      }
      
  </figure>
  <div class="flex gap-3 py-4">
  <img class="h-10 w-10 rounded-full" src =${video.authors[0].profile_picture
      } />

  <div>
  <h2 class="card-title">${video.title}</h2>
  <div class="flex gap-3">
    <p>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true
        ? `<p> <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" /></p>`
        : ""
      }
    </div>
  </div>
  </div>
  <button class="btn" onclick="phoneDetails('${video.video_id}')">Details</button>
  </button>
`;
    videoContainer.append(card);
  });
};

// for display categories button (pair no-1)
const displayCategories = (btnCategories) => {
  const categoriesContainer = document.getElementById("categories-container");
  btnCategories.forEach((item) => {
    const btn = document.createElement("div");
    btn.innerHTML = `
    <button id="btn-${item.category_id}" onclick="clicked(${item.category_id})" class ="btn btn-lg all-btn">
${item.category}
    </button >
  `;
    categoriesContainer.append(btn);
  });
};
document.getElementById("searchInput").addEventListener('keyup', (e) => {
  loadVideos(e.target.value);

})

loadCategories();
loadVideos();