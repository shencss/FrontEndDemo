//初始化函数
function init() {
    var takeNoteButton = document.getElementById('take-note');
    takeNoteButton.onclick = createNote;
    var notesArray = getNotesArray();
    for (var i = 0, len = notesArray.length; i < len; i++) {
        var key = notesArray[i];
        console.log(notesArray)
        var value = JSON.parse(localStorage.getItem(key));
        console.log(localStorage.getItem(key))
        addNoteToDOM(key, value);
    }
}

//添加note到DOM上面
function addNoteToDOM(key, noteObj) {
    var notes = document.getElementById('note-list');
    var note = document.createElement('li');
    note.setAttribute('id', key);
    note.onclick = deleteNote;
    var value = noteObj.value;
    note.innerHTML = value;
    var level = noteObj.level;
    note.setAttribute('class', level);
    notes.appendChild(note);
}

//删除n一条note
function deleteNote(e) { 
    var key = e.target.id;
    localStorage.removeItem(key);
    var notesArray = getNotesArray();
    for (var i = 0, len = notesArray.length; i < len; i++) {
        if (notesArray[i] === key) {
            notesArray.splice(i, 1);
        }
    }
    localStorage.setItem('notesArray', JSON.stringify(notesArray));
    deleteNoteFromDOM(key);
}

//将note从DOM上删除
function deleteNoteFromDOM(key) {
    var note = document.getElementById(key);
    note.parentNode.removeChild(note);
}

//创建一条note
function createNote() { 
    var noteElement = document.getElementById('note');
    var noteValue = noteElement.value;
    noteElement.value = '';
    var levelObj = document.getElementById('note-level');
    //放回select中被选中的那一项的index
    var index = levelObj.selectedIndex;
    var level = levelObj[index].value;
    var noteObj = {
        'level': level,
        'value': noteValue
    }
    var date = new Date();
    var key = 'note_' + date.getTime();
    localStorage.setItem(key, JSON.stringify(noteObj));
    var notesArray = getNotesArray();
    notesArray.push(key);
    localStorage.setItem('notesArray', JSON.stringify(notesArray));
    addNoteToDOM(key, noteObj);
}

//获得所有note
function getNotesArray() {
    var notesArray = localStorage.getItem('notesArray');
    if (!notesArray) {
        notesArray = [];
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
    } else {
        notesArray = JSON.parse(notesArray);
    }
    return notesArray;
}

window.onload = init;