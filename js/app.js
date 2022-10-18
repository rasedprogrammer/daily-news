const loadCategory = async () => {
	const url = `https://openapi.programming-hero.com/api/news/categories`;
	const res = await fetch(url);
	const data = await res.json();
	displayCategory(data.data.news_category);
};
const displayCategory = (categories) => {
	console.log(categories);
	const categoryDiv = document.getElementById("category-div");
	categories.forEach((category) => {
		const categoryUl = document.createElement("ul");
		categoryUl.classList.add("nav");
		categoryUl.innerHTML = `
      <li class="nav-item">
	       <a onclick="showNewsCategory('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
	    </li>
    `;
		categoryDiv.appendChild(categoryUl);
	});
};
const showNewsCategory = async (id) => {
	const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
	const res = await fetch(url);
	const data = await res.json();

	const categoryData = data.data;
	console.log(categoryData);
	const newsCard = document.getElementById("news-card");
	newsCard.innerText = ``;

	const noNewsFound = document.getElementById("no-found-message");
	if (categoryData.length === 0) {
		noNewsFound.classList.remove("d-none");
	} else {
		noNewsFound.classList.add("d-none");
	}

	categoryData.forEach((category) => {
		console.log(category);
		const categoryNewListDiv = document.createElement("div");
		const newsDetails = category.details;
		const newsDetailsString = newsDetails.substring(0, 200);
		categoryNewListDiv.classList.add("row", "g-0");
		categoryNewListDiv.innerHTML = `
			<div class="col-md-4 mt-5">
					<img src="${
						category.thumbnail_url
					}" class="img-fluid rounded-start" alt="..." />
			</div>
			<div class="col-md-8 mt-4">
				<div class="card-body">
					<h5 class="card-title">${category.title}</h5>
					<p class="card-text">${newsDetailsString}</p>
					<div class="d-flex">
						<div class="d-flex me-5">
							<img style="max-width: 50px; margin-right: 20px;" src="${
								category.author.img
							}" class="img-fluid rounded" alt=""/>
							<p class="pt-3">${
								category.author.name
									? category.author.name
									: "No Author Name Found"
							}</p>
						</div>
						<div class="d-flex ms-5">
							<p class="pt-3">Total View: ${category.total_view}</p>
						</div>
						<div class="d-flex ms-5">
							<p onclick="newsDetails('${
								category._id
							}')" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#newsDetailslModal")">Read More</p>
						</div>
					</div>
				</div>
			</div>
	`;
		newsCard.appendChild(categoryNewListDiv);
	});
};
const newsDetails = async (id) => {
	const url = `https://openapi.programming-hero.com/api/news/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	displayNewsDetails(data.data[0]);
};
const displayNewsDetails = (news) => {
	console.log(news);
	const NewsDetail = document.getElementById("newsDetailsModalLabel");
	NewsDetail.innerText = news.title;
	const newsDetailsBody = document.getElementById("news-details-body");
	newsDetailsBody.innerHTML = `
		<img src="${news.image_url}" class="img-fluid" alt="">
		<p class="mt-2"><b>Author Name:</b> ${
			news.author.name ? news.author.name : "No Author Name Found"
		}, <b>Published Date: ${
		news.author.published_date
			? news.author.published_date
			: "No Published Date Found"
	}</b> </p>
		<p>${news.details}</p>

	`;
};
loadCategory();

/**
 * API Links
All News Category
url: https://openapi.programming-hero.com/api/news/categories

All news in a Category
URL Format: https://openapi.programming-hero.com/api/news/category/{category_id}

Example: https://openapi.programming-hero.com/api/news/category/01

News detail url:
URL Format: https://openapi.programming-hero.com/api/news/{news_id}

Example: https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a

Missing Data:
Here total view and author name is null https://openapi.programming-hero.com/api/news/2e78e5e0310c2e9adbb6efb1a263e745
 */
