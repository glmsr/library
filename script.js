let d = document;
const myForm = d.getElementById('myForm');
const booksPart = d.getElementById('booksPart');
const sampleBook = d.getElementById('sampleBookBox');
let cloneWastebucket;
let count = -1;
let deleteThis;
let testVari;//sil
let targetId;
let testVariable;//sil
let cloneRemBtn;
let cloneTitle;
let cloneAuthor;
let clonePage;
let cloneBtnContainer;
let cloneDecBtn;
let cloneIncBtn;
let cloneReadBtn;
let once = false;
let cloneBook;
let testVar;
let myLibrary = [];
let newName;
let newAuthor;
let newPage;

// VVVV CONSTRUCTOR VVVV

class Book {
  constructor(name, author, page, read) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.read = read;
    this.incBtn = function (n) {
      this.page++;
      eval(`page${n}`).textContent = `On page ${this.page}`;
    };
    this.decBtn = function (n) {
      this.page--;
      eval(`page${n}`).textContent = `On page ${this.page}`;
    };
    this.readBtn = function (n) {
      if (!this.read) {
        this.read = true;
        eval(`page${n}`).textContent = `On page ${this.page}`;
      } else if (this.read) {
        eval(`page${n}`).textContent = `Read!`;
        this.read = false;
      }
    };
    

    this.remBtn = function (n) {
      myLibrary.splice(n, 1);
      deleteThis = document.getElementById(`book${n}`);
      deleteThis.parentNode.removeChild(deleteThis);
      // console.log(deleteThis)
    };


    Book.prototype.info = function () {
      console.log(`${this.name}, ${this.author}, ${this.page} pages, ${this.read}`);
    };

    Book.prototype.create = function () {

      cloneRemBtn = d.createElement('button');
      cloneRemBtn.id = `${count}`;
      cloneRemBtn.classList.add('remBtn');
      cloneRemBtn.onclick = function () {
        targetId = event.currentTarget.id;
        myLibrary[targetId].remBtn(targetId);
        count--;
      };

      cloneWastebucket = d.createElement('img');
      cloneWastebucket.classList.add('wastebucket');
      cloneWastebucket.src = "resources/wastebucket.png";

      cloneBook = d.createElement('div');
      cloneBook.id = `book${count}`;
      cloneBook.classList.add('bookBox');

      cloneTitle = d.createElement('p');
      cloneTitle.id = `title${count}`;
      cloneTitle.textContent = this.name;
      cloneTitle.classList.add('title');

      cloneAuthor = d.createElement('p');
      cloneAuthor.id = `author${count}`;
      cloneAuthor.textContent = `By ${this.author}`;
      cloneAuthor.classList.add('author');

      clonePage = d.createElement('p');
      clonePage.id = `page${count}`;
      clonePage.textContent = `On page ${this.page}`;
      clonePage.classList.add('page');

      cloneBtnContainer = d.createElement('div');
      cloneBtnContainer.id = `btnContainer${count}`;
      cloneBtnContainer.classList.add('buttonContainer');

      cloneDecBtn = d.createElement('button');
      cloneDecBtn.id = `${count}`;
      cloneDecBtn.classList.add('decreasePage');
      cloneDecBtn.innerHTML = `-`;
      cloneDecBtn.onclick = function () {
        targetId = event.target.id;
        myLibrary[targetId].decBtn(targetId);
      };

      cloneIncBtn = d.createElement('button');
      cloneIncBtn.id = `${count}`;
      cloneIncBtn.classList.add('increasePage');
      cloneIncBtn.innerHTML = `+`;
      cloneIncBtn.onclick = function () {
        targetId = event.target.id;
        myLibrary[targetId].incBtn(targetId);
      };

      cloneReadBtn = d.createElement('button');
      cloneReadBtn.id = `${count}`;
      cloneReadBtn.classList.add('readBtn');
      cloneReadBtn.innerHTML = `Read`;
      cloneReadBtn.onclick = function () {
        targetId = event.target.id;
        myLibrary[targetId].readBtn(targetId);
      };

      booksPart.appendChild(cloneBook);
      cloneRemBtn.appendChild(cloneWastebucket);
      cloneBook.append(cloneRemBtn, cloneTitle, cloneAuthor, clonePage, cloneBtnContainer);
      cloneBtnContainer.append(cloneDecBtn, cloneIncBtn, cloneReadBtn);

    };

  }
}


document.getElementById('myForm').onsubmit = function () {
  newName = d.getElementById('Name').value;
  newAuthor = d.getElementById('Author').value;
  newPage = d.getElementById('Page').value;
  newRead = document.getElementById('read');
  count++;
  x = new Book(newName, newAuthor, newPage, true);
  //localStorage.setItem('book', x);
  console.log(x.info());
  myLibrary.push(x);
  x.create();
  removeFiller();
  return false;
  //createBox();
  //showBooks();
}

//  VVVV FUNCTIONS VVVV
      
// function showBooks() {
//   for (let i = 0; i < myLibrary.length; i++) {
//     let k = i + 1;
//     d.getElementById(`title${k}`).innerHTML = myLibrary[i].name;
//     d.getElementById(`author${k}`).innerHTML = `by ${myLibrary[i].author}`;
//     d.getElementById(`page${k}`).innerHTML = `on page ${myLibrary[i].page}`;
//     d.getElementById(`readBtn${k}`).addEventListener('click', function() {
//       readFunction(i);
//         // if (myLibrary[i].read === 0) {
//         //   myLibrary[i].read++;
//         //   d.getElementById(`page${i + 1}`).innerHTML = `Read!`
//         // } else if (myLibrary[i].read === 1) {
//         //   myLibrary[i].read--;
//         //   d.getElementById(`page${i + 1}`).innerHTML = `on page ${myLibrary[i].page}`
//         // }
//       })
//       }
//     }
  
// add book menu popup function
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function removeFiller() {
  if (myLibrary.length > 0) {
    document.getElementById('blankFiller').style.display = 'none';
  }
  else if (myLibrary.length <= 0) {
    document.getElementById('blankFiller').style.display = 'flex';
  }
}


// window.addEventListener('load', function () { createBox(), showBooks() })