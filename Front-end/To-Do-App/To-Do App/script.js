let listArea = document.getElementById('list-area');
let inputBox = document.getElementById('input-box');

inputBox.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && inputBox.value.trim() != "") {
        // console.log(inputBox.value);
        let inputValue = inputBox.value.trim();
        let li = document.createElement('li');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let insideSpan = document.createElement('span');

        span1.innerHTML = inputValue;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        let span3 = document.createElement('span');
        span3.innerHTML = "🖉";
        li.appendChild(span1);
        insideSpan.innerHTML = "&#10005;";
        span2.appendChild(checkbox);
        span2.appendChild(span3);
        span2.appendChild(insideSpan);
        li.appendChild(span1);
        li.appendChild(span2);
        listArea.appendChild(li);
        inputBox.value = '';
    }
    saveData();
});

document.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "input" && e.target.type === 'checkbox') {
        e.target.parentElement.parentElement.children[0].classList.toggle("cut-line");
    }

    if (e.target.tagName.toLowerCase() === "span" && e.target.innerHTML === "✕") {
        e.target.parentElement.parentElement.remove();
    }
    if (e.target.tagName.toLowerCase() === "span" && e.target.innerHTML === "🖉") {
        let edit = prompt("Change task!");
        // console.log(edit);
        if (edit != '' && edit!=null) {
            e.target.parentElement.parentElement.children[0].innerHTML = edit;
        }
    }
    saveData();
});

let saveData = () => {
    let listItems = [];

    listArea.querySelectorAll('li').forEach(item => {
        let text = item.children[0].innerHTML;
        let isChecked = item.querySelector('input[type="checkbox"]').checked;

        listItems.push({ text, isChecked });
    });

    localStorage.setItem("listData", JSON.stringify(listItems));
};

let showData = () => {
    let listData = JSON.parse(localStorage.getItem("listData"));

    if (listData) {
        listArea.innerHTML = '';

        listData.forEach(item => {
            let li = document.createElement('li');
            let span1 = document.createElement('span');
            let span2 = document.createElement('span');
            let insideSpan = document.createElement('span');
            
            span1.innerHTML = item.text;
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.isChecked;
            
            if (item.isChecked) {
                span1.classList.add("cut-line");
            }

            insideSpan.innerHTML = "&#10005;";
            span2.appendChild(checkbox);
            let span3 = document.createElement('span');
            span3.innerHTML = "🖉";
            span2.appendChild(span3);
            span2.appendChild(insideSpan);
            li.appendChild(span1);
            li.appendChild(span2);
            listArea.appendChild(li);
        });
    }
};

showData();


// localStorage.clear();