const myForm = document.getElementById('myForm');
const booksPart = document.getElementById('booksPart');
const sampleBook = document.getElementById('sampleBookBox');
let count = 0;
let once = false;
let cloneBook;
let myLibrary = []
let newTitle;
let newAuthor;
let newPage;
function Book(title, author, page, read) {
  this.title = title
  this.author = author
  this.page = page
  this.read = 0
  
  Book.prototype.info = function () {
    console.log(`${this.title}, ${this.author}, ${this.page} pages, ${this.read}`)
  }
}

document.getElementById('myForm').onsubmit = function () {
  newTitle = document.getElementById('title').value;
  newAuthor = document.getElementById('author').value;
  newPage = document.getElementById('page').value;
  //newRead = document.getElementById('read').value;
  count++;
  x = new Book(newTitle, newAuthor, newPage, false);
  console.log(x.info());
  myLibrary.push(x);
  createBox();
  removeFiller();
  showBooks();
  return false;
}

function createBox() {
  cloneBook = sampleBook.cloneNode(true);
  cloneBook.id = `Book${count}`;
  cloneBook.classList.add('bookBox');
  booksPart.appendChild(cloneBook);
  
}

// bunu window.onloadda calistiricam sanirim.
//removeChild ile kaldirabilirim de
function showBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    document.getElementById(`Book${i + 1}`).childNodes[1].addEventListener('click', function () {
      console.log(myLibrary.splice(i))
      // `Book${i + 1}` = null;
    })
    document.getElementById(`Book${i + 1}`).childNodes[3].innerHTML = myLibrary[i].title;
    document.getElementById(`Book${i + 1}`).childNodes[5].innerHTML = `by ${myLibrary[i].author}`;
    document.getElementById(`Book${i + 1}`).childNodes[7].innerHTML = `on page ${myLibrary[i].page}`
    document.getElementById(`Book${i + 1}`).childNodes[9].childNodes[1].addEventListener('click', function () {
      if (!once) {
        myLibrary[i].page--;
        document.getElementById(`Book${i + 1}`).childNodes[7].innerHTML = `on page ${myLibrary[i].page}`
        once = true;
      }
    })
    document.getElementById(`Book${i + 1}`).childNodes[9].childNodes[3].addEventListener('click', function () {
      if (!once) {
        myLibrary[i].page++;
        document.getElementById(`Book${i + 1}`).childNodes[7].innerHTML = `on page ${myLibrary[i].page}`
        once = true;
      }
      // window.addEventListener("load", MyFunction);
    })
    document.getElementById(`Book${i + 1}`).childNodes[9].childNodes[5].addEventListener('click', function () {
      if (myLibrary[i].read === 0) {
        myLibrary[i].read++;
        document.getElementById(`Book${i + 1}`).childNodes[7].innerHTML = `Read!`
      } else if (myLibrary[i].read === 1) {
        myLibrary[i].read--;
        document.getElementById(`Book${i + 1}`).childNodes[7].innerHTML = `on page ${myLibrary[i].page}`
      }

      // window.addEventListener("load", MyFunction);
    })
}
}

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
