const dropFileForm = document.getElementById('dropFileForm');
const fileLabelText = document.getElementById('fileLabelText');
const uploadStatus = document.getElementById('uploadStatus');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.querySelector('.uploadButton');
const spinnerContainer = document.querySelector('.spinner-container')
const download =  document.querySelector('.download')
const selectOptions = document.querySelector('.options')
const columns = document.querySelector('.colunas')

download.addEventListener('click', onClickDownload)
uploadButton.addEventListener('click', event => uploadFiles(event) )

let droppedFiles;
let droppedFilesArr
let columnsSelected = 2
let selectedSaeOption = 'Multi'

columns.addEventListener('change', (event) => {
  columnsSelected = event.target.value
})

selectOptions.addEventListener('change', (event) => {
  selectedSaeOption = event.target.value
  if(event.target.value === 'E-mail') {
    columns.setAttribute('disabled', '')
  }

  if(event.target.value === 'Multi') {
    columns.removeAttribute('disabled')
  }
})

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
  droppedFilesArr = Array.from(droppedFiles)

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

  let formData = new FormData();
  for (var i = 0, file; (file = droppedFiles[i]); i++) {
    formData.append(fileInput.name, file, file.name);
  }

  console.log(droppedFiles)

  let reqFormData = new FormData();
  // for(let i; i < droppedFiles.length; i++) {
  //   reqFormData.append('images', droppedFiles[i]);
  // }
  droppedFilesArr.map(file => {
    reqFormData.append('images', file)
  })

  let requestUrl
  if (selectedSaeOption === 'Multi') {
    requestUrl = 'https://manda-sae.glitch.me/sae'
    reqFormData.append('columns', columnsSelected);
  } 

  if (selectedSaeOption === 'E-mail') requestUrl = 'https://manda-sae.glitch.me/sae-email'
  console.log(requestUrl)
  console.log(reqFormData)

  axios.post(requestUrl, reqFormData).then( () => {
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