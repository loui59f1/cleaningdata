"use strict";

document.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const Student = {
  firstname: "",
  middlename: "",
  lastname: "",
  nickname: "",
  gender: "",
  house: "",
};

function start() {
  console.log("ready");
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
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    //Splitting the string
    const student = Object.create(Student);
    let studentData = jsonObject.fullname.split(" ");
    console.log(studentData);

    //Firstname
    let firstName = studentData[0];
    console.log(firstName);
    student.firstName = firstName;

    //Lastname
    let lastName = studentData[2];
    console.log(lastName);
    student.lastName = lastName;

    // //Type
    // let animalType = animalData[3];
    // console.log(animalType);
    // animal.type = animalType;

    // //Age
    // let animalAge = jsonObject.age;
    // console.log(animalAge);
    // animal.age = animalAge;

    // TODO: MISSING CODE HERE !!
    //Adding all the objects into the array
    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  document.querySelector("#list tbody").innerHTML = "";

  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document
    .querySelector("template#studenttemplate")
    .content.cloneNode(true);

  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  //   clone.querySelector("[data-field=type]").textContent = animal.type;
  //   clone.querySelector("[data-field=age]").textContent = animal.age;

  document.querySelector("#list tbody").appendChild(clone);
}
