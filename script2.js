"use strict";

const allStudents = [];

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("Init");
  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  console.log("Prepare data");
  const Student = {
    firstname: "",
    middlename: "",
    lastname: "",
    nickname: "",
    gender: "",
    house: "",
  };

  jsonData.forEach((jsonObject) => {
    const student = Object.create(Student);

    // Create variables first and last space
    const firstSpace = jsonObject.fullname.trim().indexOf(" ");
    const lastSpace = jsonObject.fullname.trim().lastIndexOf(" ");

    // Divide the fullname into three names:
    // FIRSTNAME
    student.firstName = jsonObject.fullname.trim().substring(0, firstSpace);
    student.firstName =
      student.firstName.substring(0, 1).toUpperCase() +
      student.firstName.substring(1).toLowerCase();

    // MIDDLENAME
    student.middleName = jsonObject.fullname
      .substring(firstSpace, lastSpace)
      .trim();
    student.middleName =
      student.middleName.substring(0, 1).toUpperCase() +
      student.middleName.substring(1).toLowerCase();

    if (student.middleName.includes('"')) {
      student.nickName = student.middleName;
      student.middleName = "";
    }

    // LASTNAME
    student.lastName = jsonObject.fullname.trim().substring(lastSpace).trim();
    student.lastName =
      student.lastName.substring(0, 1).toUpperCase() +
      student.lastName.substring(1).toLowerCase();

    // House
    student.house = jsonObject.house.trim();
    student.house =
      student.house.substring(0, 1).toUpperCase() +
      student.house.substring(1).toLowerCase();

    // Gender
    student.gender = jsonObject.gender.trim();
    student.gender =
      student.gender.substring(0, 1).toUpperCase() +
      student.gender.substring(1).toLowerCase();
    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  console.log("Display list");
  document.querySelector("#list tbody").innerHTML = "";

  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  console.log("Display student");
  // create clone
  const clone = document
    .querySelector("template#studenttemplate")
    .content.cloneNode(true);

  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=middlename]").textContent =
    student.middleName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=nickname]").textContent = student.nickName;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  document.querySelector("#list tbody").appendChild(clone);
}
