"use strict";

const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const repassword = document.getElementById("repassword");
const regex = {
  name: /^[a-z0-9_-]{3,15}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
};

// ======================= open and close side menu ============

function openSideMenu() {
  $("aside").animate({ left: "0" }, 500);
  for (let i = 0; i < 5; i++) {
    $(".list li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
  $(".open-menu").addClass("d-none");
  $(".close-menu").removeClass("d-none");
}
function closeSideMenu() {
  $("aside").animate({ left: "-250px" }, 500);
  $(".list li").animate(
    {
      top: "400px",
    },
    500
  );
  $(".close-menu").addClass("d-none");
  $(".open-menu").removeClass("d-none");
}
$(".open-menu").on("click", function () {
  openSideMenu();
});
$(".close-menu").on("click", function () {
  closeSideMenu();
});

// ============ changing between pages and showing items ==============
// ! ========== getting site ready ================
$(document).ready(function () {
  searchByName("").then(function () {
    $(".loader").fadeOut(500);
    $(".load").addClass("d-none");
    $("main").fadeIn(500);
    $(".inner-loader").fadeOut(10);
  });
});

// ! ================ fetch by name ==============
async function searchByName(name) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
}
// !================ fetch by F Letter ============
async function searchByFLetter(name) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
    );
    let data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
}
// ! =============== fetch Categories ==========
async function searchCategories() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.log(error);
  }
}
// ! ============== fetch categories meals ================
async function searchCategoriesMeals(name) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    );
    let data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
}

// ! ============ fetch area  ===================
async function searchArea() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let data = await response.json();
    displayArea(data.meals);
  } catch (error) {
    console.log(error);
  }
}

// ! ============= fetch area meal list ============
async function searchAreaMeals(name) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
    );
    let data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
}
// ! ================ fetch ingredents ===========
async function searchIngredents() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let data = await response.json();
    displayIngredents(data.meals);
  } catch (error) {
    console.log(error);
  }
}
// ! ============ fetch ingredent meal list ==============
async function searchIngredentMeals(name) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    );
    let data = await response.json();

    displayMeals(data.meals);
  } catch (error) {
    console.log(error);
  }
}

// !============== fetch meal details===========
async function searchMealDetails(ID) {
  settingPage();
  $(".inner-loader").fadeIn(300);
  closeSideMenu();
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`
    );
    let data = await response.json();
    displayMealDetails(data.meals[0]);
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  } catch (error) {
    console.log(error);
  }
}

// ^ ========= setting up page for another section =======
function settingPage() {
  $("section").not("#main").fadeOut(50);
  $("#main .row").html("");
  $("#main .row").fadeOut(100);
}

// & display meal details ================
function displayMealDetails(arr) {
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        arr[`strMeasure${i}`]
      } ${arr[`strIngredient${i}`]}</li>`;
    }
  }
  let tagsList = ` <li class="alert alert-danger m-2 p-1">No Tags Available</li>`;
  if (arr.strTags) {
    let tags = arr.strTags.split(",");
    tagsList = "";
    for (let i = 0; i < tags.length; i++) {
      tagsList += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }
  }
  let mealDetails = `   <div class="col-md-4 text-white">
            <img
              class="img-fluid rounded-3"
              src="${arr.strMealThumb}"
              alt=""
            />
            <h2>${arr.strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>
            ${arr.strInstructions}
            </p>
            <h3>Area: <span>${arr.strArea}</span></h3>
            <h3>Category: <span>${arr.strCategory}</span></h3>
            <h3>Recieps</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
            </ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap"> 
            ${tagsList}       
            </ul>
            <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
            <a
              target="_blank"
              href="${arr.strYoutube}"
              class="btn btn-danger"
              >Youtube</a
            >
          </div>`;
  $("#main .row").html(mealDetails);
}

// &============= display meals  ============
function displayMeals(arr) {
  let mealsList = "";
  for (let i = 0; i < Math.min(arr.length, 20); i++) {
    mealsList += `<div onclick="searchMealDetails(${arr[i].idMeal})" class="col-md-3">
              <div class="item rounded-4 overflow-hidden position-relative">
                <img class="img-fluid" src="${arr[i].strMealThumb}" alt="" />
                <div class="overlay">
                  <h3>${arr[i].strMeal}</h3>
                </div>
              </div>
            </div>`;
  }
  $("#main .row").html(mealsList);
}
// ^ ============ search input ============
$("#nameSearch").on("input", function () {
  $(".inner-loader").fadeIn(300);
  searchByName(this.value).then(function () {
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  });
});
$("#firstLetterSearch").on("input", function () {
  $(".inner-loader").fadeIn(300);
  searchByFLetter(this.value).then(function () {
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  });
});
// ^ ============ display search inputs =========
$("#search-nav").on("click", function () {
  document.getElementById("nameSearch").value = "";
  document.getElementById("firstLetterSearch").value = "";
  settingPage();
  $("#Search").fadeIn(500);
  closeSideMenu();
});

// ^ ========== display categories section =========
$("#categories-nav").on("click", function () {
  settingPage();
  $(".inner-loader").fadeIn(300);
  searchCategories().then(function () {
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  });
  closeSideMenu();
});

// & ============== display categories items =======
function displayCategories(arr) {
  let cateList = "";
  for (let i = 0; i < Math.min(arr.length, 20); i++) {
    cateList += `<div class="col-md-3">
              <div class="item  position-relative overflow-hidden rounded-4 cate-item">
                <img class="img-fluid" src="${
                  arr[i].strCategoryThumb
                }" alt="" />
                <div class="overlay rounded-4">
                  <h3 class="d-block">${arr[i].strCategory}</h3>
                  <p>
                   ${arr[i].strCategoryDescription
                     .split(" ")
                     .slice(0, 20)
                     .join(" ")}
                  </p>
                </div>
              </div>
            </div>`;
  }
  $("#main .row").html(cateList);
  $(".cate-item .overlay").on("click", function () {
    let cateName = $(this).find("h3").text();
    $(".inner-loader").fadeIn(300);
    searchCategoriesMeals(cateName).then(function () {
      $(".inner-loader").fadeOut(500);
      $("#main .row").fadeIn(500);
    });
  });
}
// ^ ============= display area section =============
$("#area-nav").on("click", function () {
  settingPage();
  $(".inner-loader").fadeIn(300);
  closeSideMenu();
  searchArea().then(function () {
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  });
});

// & ======= display area list ============
function displayArea(arr) {
  let areaList = "";
  for (let i = 0; i < arr.length; i++) {
    areaList += `<div class="col-md-3">
              <div
                class="text-white d-flex justify-content-center align-items-center flex-column area"
              >
                <i class="fa-solid fa-house-laptop fa-5x"></i>
                <h3>${arr[i].strArea}</h3>
              </div>
            </div>`;
  }
  $("#main .row").html(areaList);
  $(".area").on("click", function () {
    let areaName = $(this).find("h3").text();
    $(".inner-loader").fadeIn(300);
    searchAreaMeals(areaName).then(function () {
      $(".inner-loader").fadeOut(500);
      $("#main .row").fadeIn(500);
    });
  });
}

// ^ ========= display ingredents section ========
$("#ingredents-nav").on("click", function () {
  settingPage();
  closeSideMenu();
  $(".inner-loader").fadeIn(300);
  searchIngredents().then(function () {
    $(".inner-loader").fadeOut(500);
    $("#main .row").fadeIn(500);
  });
});
// & =========== display ingredents list =============
function displayIngredents(arr) {
  let ingredentsList = "";
  for (let i = 0; i < Math.min(arr.length, 20); i++) {
    let description = arr[i].strDescription
      ? arr[i].strDescription.split(" ").slice(0, 20).join(" ")
      : "No description available.";
    ingredentsList += `<div class="col-md-3">
              <div
                class="text-white d-flex justify-content-center align-items-center flex-column text-center ingred"
              >
                <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>
                ${description}
                </p>
              </div>
            </div>`;
  }
  $("#main .row").html(ingredentsList);
  $(".ingred").on("click", function () {
    let ingredName = $(this).find("h3").text();
    $(".inner-loader").fadeIn(300);
    searchIngredentMeals(ingredName).then(function () {
      $(".inner-loader").fadeOut(500);
      $("#main .row").fadeIn(500);
    });
  });
}
// ^ ============ display contact section  ===============
$("#contact-nav").on("click", function () {
  clearContact();
  settingPage();
  closeSideMenu();
  $("#Contact").fadeIn(500);
});

// ===================== contact validate ===============

function validateInput(element) {
  if (regex[element.id].test(element.value) == true) {
    $(element).next().addClass("d-none");

    return true;
  } else {
    $(element).next().removeClass("d-none");
    return false;
  }
}
function passwordCheck(element) {
  if (element.value == document.getElementById("password").value) {
    $(element).next().addClass("d-none");
    return true;
  } else {
    $(element).next().removeClass("d-none");
    return false;
  }
}

$("#Contact input")
  .not("#repassword")
  .on("input", function () {
    validateInput(this);
    submitCheck();
  });

$("#repassword").on("input", function () {
  passwordCheck(this);
  submitCheck();
});

function submitCheck() {
  let nameIsValid = regex.name.test(userName.value);
  let emailIsValid = regex.email.test(email.value);
  let passwordIsValid = regex.password.test(password.value);
  let phoneIsValid = regex.phone.test(phone.value);
  let ageIsvalid = regex.age.test(age.value);
  let repasswordIsValid = passwordCheck(repassword);

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneIsValid &&
    ageIsvalid &&
    repasswordIsValid
  ) {
    $(".submit").removeClass("disabled");
  } else {
    $(".submit").addClass("disabled");
  }
}

function clearContact() {
  for (let i = 0; i < document.querySelectorAll("#Contact input").length; i++) {
    document.querySelectorAll("#Contact input")[i].value = "";
  }
  $("#Contact input").next().addClass("d-none");
}
