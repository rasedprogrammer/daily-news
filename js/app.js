const loadCategory = async () => {
	try {
		const url = `https://openapi.programming-hero.com/api/news/categories`;
		const res = await fetch(url);
		const data = await res.json();
		displayCategory(data.data.news_category);
	} catch (err) {
		alert(err);
	}
};
// New Categories
const displayCategory = (categories) => {
	const categoryDiv = document.getElementById("category-div");
	categories.forEach((category) => {
		const categoryUl = document.createElement("ul");
		categoryUl.classList.add("nav");
		categoryUl.innerHTML = `
		<li class="nav-item">
		<a onclick="showNewsCategory('${category.category_id}')" class="nav-link text-body fs-5" href="#">${category.category_name}</a>
		</li>
    `;
		categoryDiv.appendChild(categoryUl);
	});
};

const showNewsCategory = async (id) => {
	//Spinner Start
	toggleSpinner(true);
	try {
		const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		const categoryData = data.data;

		const newsCount = document.getElementById("news-count");
		newsCount.innerText = ``;
		const viewCategoryCount = document.createElement("h3");
		viewCategoryCount.innerText = `${
			categoryData.length ? categoryData.length : "No"
		} news item found`;
		newsCount.appendChild(viewCategoryCount);
		const newsCard = document.getElementById("news-card");
		newsCard.innerText = ``;

		// Question And Answer Code
		document.getElementById("question-answer").addEventListener("click", () => {
			const noNewsFound = document.getElementById("no-found-message");
			if (categoryData.length === 0) {
				noNewsFound.classList.add("d-none");
			}
			newsCount.innerText = ``;
			newsCard.innerText = ``;
			const questionAnswer = document.getElementById("blog-question");
			questionAnswer.classList.remove("d-none");
		});

		// No News Found Code
		const noNewsFound = document.getElementById("no-found-message");
		if (categoryData.length === 0) {
			noNewsFound.classList.remove("d-none");
		} else {
			noNewsFound.classList.add("d-none");
		}
		const questionAnswer = document.getElementById("blog-question");
		questionAnswer.classList.add("d-none");

		categoryData.forEach((category) => {
			const questionAnswer = document.getElementById("blog-question");
			questionAnswer.classList.add("d-none");
			const categoryNewListDiv = document.createElement("div");
			const newsDetails = category.details;
			const newsDetailsString = newsDetails.substring(0, 300);
			categoryNewListDiv.classList.add("row", "g-0");
			categoryNewListDiv.innerHTML = `
			<div class="col-md-4 w-auto me-5 mt-5">
					<img src="${category.thumbnail_url}" class="img-auto rounded-start" alt="..." />
			</div>
			<div class="col-md-8 px-0 mt-5">
				<div class="card-body">
					<h5 class="card-title">${category.title}</h5>
					<p class="card-text mt-4">${newsDetailsString}....</p>
					<div class="d-flex">
						<div class="d-flex me-5">
							<img style="width: 30px; height: 30px; margin-right: 20px;" src="${
								category.author.img
							}" class="img-fluid rounded mt-3" alt=""/>
							<p class="pt-3">${
								category.author.name
									? category.author.name
									: "No Author Name Found"
							}</p>
						</div>
						<div class="d-flex ms-5">
							<p class="pt-3">Total View: ${category.total_view ? category.total_view : 0}</p>
						</div>
						<div class="d-flex ms-5">
							<p onclick="newsDetails('${
								category._id
							}')" class="btn btn-primary ms-5 mt-3" data-bs-toggle="modal" data-bs-target="#newsDetailslModal")">Read More</p>
						</div>
					</div>
				</div>
			</div>
	`;
			newsCard.appendChild(categoryNewListDiv);
		});
	} catch (err) {
		alert(err);
	}
	//Spinner Stop
	toggleSpinner(false);
};
// Spinner Code
const toggleSpinner = (isLoading) => {
	const loaderSection = document.getElementById("loader");
	if (isLoading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};

// News Details Code
const newsDetails = async (id) => {
	try {
		const url = `https://openapi.programming-hero.com/api/news/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		displayNewsDetails(data.data[0]);
	} catch (err) {
		alert(err);
	}
};
// Model Function
const displayNewsDetails = (news) => {
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
		<div class="d-flex justify-content-around">
		<p><b>Total View: </b>${news.total_view ? news.total_view : "No Total View"}</p>
		<p><b>News Rating: </b>${news.rating.number ? news.rating.number : 0}</p>
		<p><b>Review: </b>${
			news.rating.badge ? news.rating.badge : "No Review Found"
		}</p>
		</div>

	`;
};
loadCategory();
