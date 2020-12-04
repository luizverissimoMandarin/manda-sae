const dropFileForm = document.getElementById('dropFileForm');
const fileLabelText = document.getElementById('fileLabelText');
const uploadStatus = document.getElementById('uploadStatus');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.querySelector('.uploadButton');
const spinnerContainer = document.querySelector('.spinner-container')
const download =  document.querySelector('.download')

download.addEventListener('click', onClickDownload)
uploadButton.addEventListener('click', event => uploadFiles(event) )


let droppedFiles;

function onClickDownload() {
  download.style.display = 'none'
  droppedFiles = undefined
  changeStatus('')
  fileLabelText.innerText = 'Escolha ou arraste seu arquivo'
}


function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function fileHover() {
  dropFileForm.classList.add("fileHover");
}

function fileHoverEnd() {
  dropFileForm.classList.remove("fileHover");
}

function addFiles(event) {
  droppedFiles = event.target.files || event.dataTransfer.files;
  if(droppedFiles.length > 1) {
    alert('Adicione somente um arquivo .zip por vez')
    droppedFiles = undefined
    return
  }

  changeStatus("");
  uploadButton.style.backgroundColor = '#F24405'
  uploadButton.style.pointerEvents = 'all'

  showFiles(droppedFiles);
}

function showFiles(files) {
  if (files.length > 1) {
    fileLabelText.innerText = files.length + " files selected";
  } else {
    fileLabelText.innerText = files[0].name;
  }
}


async function uploadFiles(event) {
  changeStatus("");
  event.preventDefault();
  spinnerContainer.style.display = 'unset'

  var formData = new FormData();

  for (var i = 0, file; (file = droppedFiles[i]); i++) {
    formData.append(fileInput.name, file, file.name);
  }

  let reqFormData = new FormData();
  reqFormData.append('zip', droppedFiles[0]);

  axios.post('https://localhost:3333/manda-sae-email', reqFormData).then( () => {
    download.style.display = 'unset'
    spinnerContainer.style.display = 'none'
    uploadButton.style.backgroundColor = '#f3926f'
    uploadButton.style.pointerEvents = 'none'
    changeStatus("Concluído");
  }).catch(err => {
    console.log(err);
    changeStatus("Ocorreu um erro!")
    spinnerContainer.style.display = 'none'
    uploadButton.style.backgroundColor = '#f3926f'
    uploadButton.style.pointerEvents = 'none'
  })
}

function changeStatus(text) {
  uploadStatus.innerText = text;
}