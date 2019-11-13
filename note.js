const Note = {
    IdCounter: 8,
    dragged: null,
    
    process(noteElement) {
        noteElement.addEventListener('dblclick', function(event) {
            noteElement.setAttribute('contenteditable','true')
            noteElement.removeAttribute('draggable') // при ркдактировании нельзя перемещать
            noteElement.closest('.column').removeAttribute('draggable') // и родителя тоже
            noteElement.focus()
        })

        noteElement.addEventListener('blur', function(event) {
            noteElement.removeAttribute('contenteditable')
            noteElement.setAttribute('draggable', 'true') // возвращаем
            noteElement.closest('.column').setAttribute('draggable','true') // и родитель тоже

            if (!noteElement.textContent.trim().length) {
                noteElement.remove()
            }
        })

        noteElement.addEventListener('dragstart', dragstart_noteHandler) 
        noteElement.addEventListener('dragend', dragend_noteHandler) 
        noteElement.addEventListener('dragenter', dragenter_noteHandler) 
        noteElement.addEventListener('dragover', dragover_noteHandler) 
        noteElement.addEventListener('dragleave', dragleave_noteHandler) 
        noteElement.addEventListener('drop', drop_noteHandler) 
    }
}    
   
function dragstart_noteHandler (event) {
    Note.dragged = this
    this.classList.add('dragged')
    
    event.stopPropagation()
}

        function dragend_noteHandler (event) {
            Note.dragged = null
            this.classList.remove('dragged')
    
            document
                .querySelectorAll('.note')
                .forEach(x => x.classList.remove('under'))
        }
        function dragenter_noteHandler (event) {
            if (this === Note.dragged) {
                return
            }
            this.classList.add('under')
        }
        function dragover_noteHandler (event) {
            event.preventDefault()
    
            if (this === Note.dragged) {
                return
            }
        }
        function dragleave_noteHandler (event) {
            event.stopPropagation()
            if (this === Note.dragged) {
                return
            }
            this.classList.remove('under')
        }
        function drop_noteHandler (event) {
            if (this === Note.dragged) {
                return
            }
    
            /* перетаскивание в одной колонке */
            if (this.parentElement === Note.dragged.parentElement) {
                const note = Array.from(this.parentElement.querySelectorAll('.note'))
                const indexA = note.indexOf(this)
                const indexB = note.indexOf(Note.dragged)
                
                //console.log(indexA, indexB)
                if (indexA < indexB) {
                    this.parentElement.insertBefore(Note.dragged, this)
                } 
                else {
                    this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
                }
    
            }  /* перетаскивание из разных колонок */
            else {
                this.parentElement.insertBefore(Note.dragged, this)
            }
    
        }





