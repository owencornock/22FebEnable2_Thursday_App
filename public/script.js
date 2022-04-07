`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  axios.post(`/create`, {
    name: DOM.inputName.value,
    description: DOM.inputDescription.value,
    price: DOM.inputPrice.value
  })
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
}

const getNew = (id) => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read/${id}`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}
const deleteId = (id) => {
  axios.delete(`/delete/${id}`, { id: DOM.inputDeleteId.value })
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
}
const put = (id) => {
  axios.put(`/update/${id}`, {
    id: DOM.inputUpdateId.value,
    name: DOM.inputUpdateName.value,
    description: DOM.inputUpdateDescription.value,
    price: DOM.inputUpdatePrice.value
  })
    .then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
}



// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonRead.onclick = () => getNew(DOM.inputId.value);
DOM.buttonReadAll.onclick = () => get();
DOM.buttonDelete.onclick = () => deleteId(DOM.inputDeleteId.value);
DOM.buttonUpdate.onclick = () => put(DOM.inputUpdateId.value);
// run the get function on page load
