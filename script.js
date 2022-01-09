let d = document;
const myForm = d.getElementById('myForm');
const booksPart = d.getElementById('booksPart');
const sampleBook = d.getElementById('sampleBookBox');
let deleteThis;
let targetId;
let index;
let localToRemove;//galiba bu da silinecek
let localToInc;
let localToDec;
let localToBoolean;
let localToLoop;
let localBook;
let loBookToObj;
let localBookId;
let theBookId = Math.floor(Math.random() * 9999);
let someData;
let toLocal
let cloneRemBtn;
let cloneWastebucket;
let cloneTitle;
let cloneAuthor;
let clonePage;
let cloneBtnContainer;
let cloneDecBtn;
let cloneIncBtn;
let cloneReadBtn;
let cloneBook;
let myLibrary = [];
let newName;
let newAuthor;
let newPage;
let localName;
let localAuthor;
let localPage;
let localRead;
let myArr = [];
let myArrVar;


  // VVVV CONSTRUCTOR VVVV

class Book {
  constructor(name, author, page, read, bookId) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.read = read;
    this.bookId = bookId;

    

    this.createFunc = function () {
      
      
      
      console.log(this.bookId);
      this.bookId = bookId;
      
      cloneRemBtn = d.createElement('button');
      cloneRemBtn.id = `remBtn${bookId}`;
      cloneRemBtn.dataset.btnId = bookId;
      cloneRemBtn.classList.add('remBtn');
      cloneRemBtn.onclick = function () {
        
        deleteThis = document.getElementById(`book${this.dataset.btnId}`);
        deleteThis.parentNode.removeChild(deleteThis);

        index = myLibrary.findIndex(y => y.bookId == this.dataset.btnId);
        myLibrary.splice(index, 1);
        
        
        localStorage.remBtn(this.dataset.btnId);
        removeFiller();
      };

      cloneWastebucket = d.createElement('img');
      cloneWastebucket.classList.add('wastebucket');
      cloneWastebucket.src = "resources/wastebucket.png";

      cloneBook = d.createElement('div');
      cloneBook.id = `book${bookId}`;
      cloneBook.classList.add('bookBox');
      cloneBook.dataset.daBookId = theBookId;
      
      
      cloneTitle = d.createElement('p');
      cloneTitle.id = `title${theBookId}`;
      cloneTitle.textContent = this.name;
      cloneTitle.classList.add('title');

      cloneAuthor = d.createElement('p');
      cloneAuthor.id = `author${theBookId}`;
      cloneAuthor.textContent = `By ${this.author}`;
      cloneAuthor.classList.add('author');

      clonePage = d.createElement('p');
      clonePage.id = `page${bookId}`;
      clonePage.textContent = `On page ${this.page}`;
      //sorun tam olarak burada iste
      clonePage.classList.add('page');

      cloneBtnContainer = d.createElement('div');
      cloneBtnContainer.id = `btnContainer${bookId}`;
      cloneBtnContainer.classList.add('buttonContainer');

      cloneDecBtn = d.createElement('button');
      cloneDecBtn.id = `decBtn${bookId}`;
      cloneDecBtn.classList.add('decreasePage');
      cloneDecBtn.dataset.btnId = bookId;
      cloneDecBtn.innerHTML = `-`;
      cloneDecBtn.onclick = function (e) {
        index = myLibrary.findIndex(y => y.bookId == bookId);
        targetId = e.target.id;
        myLibrary[index].decBtn(index, this.dataset.btnId);

        localStorage.decBtn(this.dataset.btnId, localBookId);
      };
    
  

      cloneIncBtn = d.createElement('button');
      cloneIncBtn.id = `incBtn${bookId}`;
      cloneIncBtn.classList.add('increasePage');
      cloneIncBtn.dataset.btnId = bookId;
      cloneIncBtn.innerHTML = `+`;
      cloneIncBtn.onclick = function (e) {
        // console.log(this.dataset.btnId)
        index = myLibrary.findIndex(y => y.bookId == this.dataset.btnId);
        targetId = e.target.id;
        myLibrary[index].incBtn(index, this.dataset.btnId);
        localStorage.incBtn(this.dataset.btnId, localBookId)
      }

      cloneReadBtn = d.createElement('button');
      cloneReadBtn.id = `readBtn${bookId}`;
      cloneReadBtn.classList.add('readBtn');
      cloneReadBtn.innerHTML = `Read`;
      cloneReadBtn.dataset.btnId = bookId;
      cloneReadBtn.onclick = function someName(e) {
        index = myLibrary.findIndex(y => y.bookId == this.dataset.btnId);
        targetId = e.target.id;
        myLibrary[index].readBtn(bookId);
        
        localStorage.readBtn(this.dataset.btnId);
      }
      booksPart.appendChild(cloneBook);
      cloneRemBtn.appendChild(cloneWastebucket);
      cloneBook.append(cloneRemBtn, cloneTitle, cloneAuthor, clonePage, cloneBtnContainer);
      cloneBtnContainer.append(cloneDecBtn, cloneIncBtn, cloneReadBtn);
      this.readBtn(bookId)
    };

    this.incBtn = function (n, m) {
      //this.page++;
      myLibrary[n].page++;
      eval(`page${m}`).textContent = `On page ${this.page}`;
    };
    this.decBtn = function (n, m) {
      // this.page--;
      myLibrary[n].page--;
      eval(`page${m}`).textContent = `On page ${this.page}`;
    };
    this.readBtn = function (m) {
      if (this.read) {
        this.read = false;
        d.getElementById(`incBtn${m}`).disabled = false;
        d.getElementById(`decBtn${m}`).disabled = false;
        eval(`page${m}`).textContent = `On page ${this.page}`;

      } else if (!this.read) {
        eval(`page${m}`).textContent = `Read!`;
        d.getElementById(`incBtn${m}`).disabled = true;
        d.getElementById(`decBtn${m}`).disabled = true;
        this.read = true;
        
      };
      
    }
    theBookId = Math.floor(Math.random() * 9999);
    
    Book.prototype.info = function () {
      console.log(`${this.name}, ${this.author}, ${this.page} pages, ${this.read}`);
    };
    
  }
}
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
}


Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

Storage.prototype.allObjects = function (h) {
 
  var value = this.getItem(h);
  return JSON.parse(value).bookId;
    // theBookId = JSON.parse(value).bookId
    //JSON.parse(value).bookId = myLibrary[h].bookId;
    //return JSON.parse(value).bookId
  
}

Storage.prototype.remBtn = function(e){
  for (let i = 0; i < localStorage.length; i++){
    localToLoop = JSON.parse(this.getItem(this.key(i)));
    if (localToLoop.bookId == e) {
      this.removeItem(this.key(i));
    }
  }
  // localToRemove = JSON.parse(localStorage.getItem(localStorage.key(e)))
  // console.log(localToRemove)
  // console.log(e);
}

Storage.prototype.decBtn = function (e,g) {
  for (let i = 0; i < localStorage.length; i++) {
    localToLoop = JSON.parse(this.getItem(this.key(i)));
    if (localToLoop.bookId == e) { 
      localToDec = JSON.parse(this.getItem(this.key(i)))
      localToDec.page--;
      this.setObject(this.key(i), localToDec);
      //degisikligi burada yapmaliyiz. silmek icin kolaydi ama setItem yaparken key isimize yaramayacak
    }
  }
}
Storage.prototype.incBtn = function (e,g) {
  for (let i = 0; i < localStorage.length; i++) {
    localToLoop = JSON.parse(this.getItem(this.key(i)));
    if (localToLoop.bookId == e) { 
      localToInc = JSON.parse(this.getItem(this.key(i)))
      localToInc.page++;
      this.setObject(this.key(i), localToInc);
      //degisikligi burada yapmaliyiz. silmek icin kolaydi ama setItem yaparken key isimize yaramayacak
    }
  }
}
Storage.prototype.readBtn = function (e) {
  for (let i = 0; i < localStorage.length; i++) {
    localToLoop = JSON.parse(this.getItem(this.key(i)));
    if (localToLoop.bookId == e) {
      localToBoolean = JSON.parse(this.getItem(this.key(i)));
      if (localToBoolean.read) {
        localToBoolean.read = false;
        this.setObject(this.key(i), localToBoolean);
      }
      else if (!localToBoolean.read) {
        localToBoolean.read = true;
        this.setObject(this.key(i), localToBoolean);
      }
    }
  }
}
Storage.prototype.allLocalObjects = function (h) {
 
  var value = this.getItem(localStorage.key(h));
  return JSON.parse(value).bookId;

}

d.getElementById('myForm').onsubmit = function () {
  newName = d.getElementById('Name').value;
  newAuthor = d.getElementById('Author').value;
  newPage = d.getElementById('Page').value;
  newRead = document.getElementById('read');
  x = new Book(newName, newAuthor, newPage, true, theBookId);
  localBookId = Math.floor(Math.random() * 99999);
  localStorage.setObject(`${localBookId}`, x);
  console.log(localStorage.getObject(`${theBookId}`));

  myLibrary.push(x);
  x.createFunc();//bunu localStorage'dan verecegiz. surekli calisacak.
  removeFiller();
  return false;
}

//  VVVV FUNCTIONS VVVV
      


// add book menu popup function
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function removeFiller() {
  if (myLibrary.length <= 0) {
    document.getElementById('blankFiller').style.display = 'flex';
  }
  else if (myLibrary.length > 0) {
    document.getElementById('blankFiller').style.display = 'none';
  }
}


function pushLocals() {
  for (let j = 0; j < localStorage.length; j++){
    localBook = localStorage.getItem(localStorage.key(j));
    loBookToObj = JSON.parse(localBook);
    localName = loBookToObj.name;
    localAuthor = loBookToObj.author;
    localPage = loBookToObj.page;
    localRead = loBookToObj.read;
    console.log(loBookToObj.read)
    //localBookId = localStorage.allObjects(theBookId)
    //buraya loBookToObj.bookId ile ilgili bisey girmem lazim.
    loBookToObj = new Book(localName, localAuthor, localPage, localRead, loBookToObj.bookId);
    myLibrary.push(loBookToObj);
    localStorage.allLocalObjects(j);
    // localStorage.removeItem(loBookToObj);
    // localStorage.setItem(`${theBookId}`, loBookToObj)
    console.log(loBookToObj.bookId);
    loBookToObj.createFunc();
  }
}


function rngGenerate() {
  theBookId = Math.floor(Math.random() * 9999);
}

window.onload = pushLocals();




window.addEventListener('load', function () {removeFiller()})