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
      moreThanOneTrait(filterTraits);
      app(people);
     // search by traits
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
  app(people);
}
//finds person by there full name
function searchByName(people){

  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let filteredPeople = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName) {
      return true;
    }
  });
    return filteredPeople;
  // 

}
//finds any children of person
function checkForSpouse(person, people){
    let spouseFound = people.filter(function(el){
    for(var i = 0; i < el.currentSpouse.length; ++i){
      if(el.currentSpouse[i] === person.id){
       return true;
      }
    }
  });
  return kidsFound;
}
//finds children
function checkForKids(person, people){
  let kidsFound = people.filter(function(el){
    for(var i = 0; i < el.parents.length; ++i){
      if(el.parents[i] === person.id){
       return true;
      }
    }
  });
  return kidsFound;
}
function checkForDescendant(person, people, arrayPassed){
    for(var i = 0; i < person.length; ++i){
      if (people.parents == person.id || person.parents == people.id){

        arrayPassed.push(person);
        checkForDescendant(person, people, arrayPassed); 
      }
    } 
     return;
}//finds trait inputed then searches for each person with that trait
function checkTraits(people){
  var traitKnows = prompt("Enter trait you know of this person (Options: firstName, lastName, gender, dob, height, weight, eyeColor, occupation, or parents)");
  var traitInformationEntered = prompt ("Please enter this person's " + traitKnows + ".");
  let filterTraits = people.filter(function(el){

    if(el[traitKnows].toLowerCase() === traitInformationEntered.toLowerCase()){

      return true;
    }
  });
    if(filterTraits.length > 1){
      moreThanOneTrait(filterTraits);
    }

   return filterTraits;
}
function checkForParents(person, people){
  let parentsFound = people.filter(function(el){
    for(var i = 0; i < el.parents.length; ++i){
      if(el.id === person.parents[i]){
       return true;
      }
    }
  });
  return parentsFound;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  var arrayTwo=[];
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  let foundKids;
  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
      foundKids = checkForKids(person, people);//finds if person has kids
      let foundParents = checkForParents(person, people);//finds if person has parents
      let spouseFound = checkForSpouse(person, people);
      displayPeople(foundKids, foundParents, checkForSpouse);
      break;
    case "descendants":
      checkForDescendant(person, people, arrayTwo);
      displayPeople(arrayTwo);
      //get person's descendants
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
function moreThanOneTrait(peopleListed){
    alert("Here are all the people with the same trait." + "\n" + peopleListed.map(function(peopleListed){
    return peopleListed.firstName + " " + peopleListed.lastName;
    }).join("\n"));
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(people){
    return people.firstName + " " + people.lastName;
  }).join("\n"));
}
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Age: " + calcAge(person) + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyecolor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  alert(personInfo);
  return;
}
// function calcAge(people){
//  let date = new Date();
//  let month = date.getMonth() + 1;
//  let day = date.getDate();
//  let year = date.getFullYear();
//  people.map(function(el){
//    let dobSplit = el.dob.split("/");
//    let age = year - dobSplit[2];
//    if(dobSplit[0] < month){
//      age--;
//      el.age = age;
//      console.log(age);
//    }
//    else if(dobSplit[0] == month && dobSplit[1] < day)
//    {
//      age--;
//      el.age = age;
//      console.log(age);
//    }
//    else
//    {
//      el.age = age;
//      console.log(age);
//    }
//  });

// }

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