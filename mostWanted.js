/*
Build all of your functions for displaying and gathering information below (GUI).
*/

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let filteredPeople = searchByName(people);// search by name
       mainMenu(filteredPeople[0], people);
      break;
    case 'no':
      let filterTraits = checkTraits(people);
      mainMenu(filterTraits[0],people);
     // search by traits
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}
function searchByName(people){

  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let filteredPeople = people.filter(function(el) {
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName) {
      return el;
    }
  });
    return filteredPeople;
  // 

}
function checkTraits(people){
  var traitKnows = prompt("Enter trait you know of this person(id , firstName, ")
  var traitInformationEntered = prompt ("Please enter this person's " + traitKnows + ".");
  let filterTraits = people.filter(function(el){
    if(el[traitKnows].toLowerCase() === traitInformationEntered.toLowerCase()){

      return el;
}
   
});
   return filterTraits;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }

  return mainMenu(person, people);//ask again after breaks

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
}
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  // dob =01/18/2019 = 0/1/2

function calcAge(people){
 let date = new Date();
 let month = date.getMonth() + 1;
 let day = date.getDate();
 let year = date.getFullYear();
 people.map(function(el){
   let dobSplit = el.dob.split("/");
   let age = year - dobSplit[2];
   if(dobSplit[0] < month){
     age--;
     el.age = age;
     console.log(age);
   }
   else if(dobSplit[0] == month && dobSplit[1] < day)
   {
     age--;
     el.age = age;
     console.log(age);
   }
   else
   {
     el.age = age;
     console.log(age);
   }
 });

}


  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += promptFor("Last Name: " + person.lastName + "\n");
  personInfo += promptFor("Age: " + person.age + "\n");
  personInfo += promptFor("Height: " + person.height + "\n");
  personInfo += promptFor("Weight: " + person.weight + "\n");
  personInfo += promptFor("Eye Color: " + person.eyecolor + "\n");
  personInfo += promptFor("occupation: " + person.occupation + "\n");
  // TODO: finish getting the rest of the information to display
  
  alert(personInfo);
  return age 
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}