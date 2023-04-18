let myLibrary = [];

class Book {
    constructor(title, author, pages, finished){
        this.title = title
        this.author = author
        this.pages = pages
        this.finished = finished 
    }

    toggleFinished() {
        if (this.finished){
            this.finished = false; 
        } else{
            this.finished = true;
        }
    }
}

function addBook(e) {
    e.preventDefault();
    addBookToLibrary();
}

function changeBookStatus(id){
    myLibrary[id].toggleFinished();
    refreshTable();
}

function deleteBook(id){
    myLibrary.splice(id, 1);
    refreshTable();
}

function addBookToLibrary() {
    // do stuff here
    
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let finished = document.getElementById("finished").checked;

    let book = new Book(title, author, pages, finished)
    //console.log(book);

    document.getElementById("form").reset();
    
    myLibrary.push(book);

    displayForm();

    refreshTable();

    }

function refreshTable(){
    let table = document.getElementById("cards");
    table.innerHTML = "";

    for (let book in myLibrary){
        let card = document.createElement("div");
        card.id = book;
        card.classList.add("card")

        //console.log(book)
    
        let titleCell = document.createElement("h2");
        let pagesCell = document.createElement("p");
        let btnContainer = document.createElement("div");
        let finBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        delBtn.innerHTML = "Delete";
        delBtn.classList.add("delete");

    
        titleCell.innerHTML = myLibrary[book].title + " by " + myLibrary[book].author;
        pagesCell.innerHTML = myLibrary[book].pages + " pages.";

        if (myLibrary[book].finished){
            finBtn.innerHTML = "Compeleted!";
            finBtn.className = "complete"
        } 
        else{
            finBtn.innerHTML = "Still reading..";
            finBtn.className = "incomplete"
        }
        finBtn.onclick = function() { 
            changeBookStatus(book);
            finBtn.classList.toggle("incomplete")
            finBtn.classList.toggle("complete")
        }
        delBtn.onclick = function() { deleteBook(book)}

        btnContainer.className = "btn-container";
        btnContainer.appendChild(pagesCell)
        btnContainer.appendChild(finBtn);
        btnContainer.appendChild(delBtn);
    
        card.appendChild(titleCell);
        card.appendChild(btnContainer);

        table.appendChild(card);

      }
    }

function displayForm(){
        let form = document.getElementById("form");
        let bg = document.getElementById("gray-background");
        form.classList.toggle("visible")
        bg.classList.toggle("visible")
    }

let form = document.getElementById("form");
form.onsubmit = addBook;

var date = new Date().getFullYear();
document.getElementById("year").innerHTML = date;