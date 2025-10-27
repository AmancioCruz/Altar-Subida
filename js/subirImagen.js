import { storage } from "./firebaseconfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";


function seleccionarImagen(event) {
  const input = event.target;
  const vista = document.querySelector("#vistaPrevia");

  if (input.files && input.files[0]) {
    const lector = new FileReader();

    lector.onload = (e) => {
      vista.src = e.target.result;
    };

    lector.readAsDataURL(input.files[0]);
  } else {
    vista.src = "../recursos/default.png";
  }
}


const inputArchivo = document.querySelector("#archivo");
const btnSubir = document.querySelector("#btnSubir");

inputArchivo.addEventListener("change", seleccionarImagen);
btnSubir.addEventListener("click", subirImagen);


async function subirImagen() {
  const inputClave = document.querySelector("#clave");
  const vista = document.querySelector("#vistaPrevia");

  const clave = inputClave.value.trim();
  const file = inputArchivo.files[0];
  const CLAVE_CORRECTA = "altartelcel2025";

  if (clave !== CLAVE_CORRECTA) {
    alert("Clave incorrecta");
    return;
  }

  if (!file) {
    alert("Selecciona una imagen antes de subir");
    return;
  }

  try {
    const nombreArchivo = "Imagenes/fotografia.png";
    const referencia = ref(storage, nombreArchivo);

    await deleteObject(referencia)
      .then(() => console.log("Imagen anterior eliminada"))
      .catch(() => console.warn("No había una imagen anterior"));

    await uploadBytes(referencia, file);

    const url = await getDownloadURL(referencia);
    console.log("Imagen subida con éxito:", url);

    inputArchivo.value = "";
    inputClave.value = "";
    vista.src = "../recursos/default.png";
  } catch (error) {
    console.error("Error al subir la imagen:", error);
  }
}
