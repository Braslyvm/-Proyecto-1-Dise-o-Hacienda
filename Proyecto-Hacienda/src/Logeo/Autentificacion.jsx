import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Inicialización de Firebase
export const app = firebase.initializeApp({
  projectId: "fb-authentication-549f5",
  appId: "1:51010532888:web:71b6d9df0cf632bb58f56d",
  storageBucket: "fb-authentication-549f5.firebasestorage.app",
  apiKey: "AIzaSyCzSBR6H4upvesPbsKhNQ90nUig9D0-Yws",
  authDomain: "fb-authentication-549f5.firebaseapp.com",
  messagingSenderId: "51010532888",
});

const db = firebase.firestore();

/**
 * Función para eliminar un documento por correo y código.
 */
export const deleteByEmailAndCode = async (correo, codigo) => {
  try {
    const querySnapshot = await db
      .collection("Favoritos")
      .where("Correo", "==", correo)
      .where("Codigo", "==", codigo)
      .get();

    if (querySnapshot.empty) {
      console.log("No se encontró ningún documento con los datos proporcionados.");
      return;
    }

    querySnapshot.forEach(async (doc) => {
      await db.collection("Favoritos").doc(doc.id).delete();
      console.log(`Documento con ID ${doc.id} eliminado correctamente.`);
    });
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};

/**
 * Función para obtener todos los documentos asociados con un correo.
 */
export const getDocumentsByEmail = async (correo) => {
  const db = firebase.firestore(); 
  const favoritos = [];
  const querySnapshot = await db.collection("Favoritos").where("Correo", "==", correo).get();
  querySnapshot.forEach((doc) => {
    console.log(doc.data()); 
    favoritos.push(doc.data());
  });
  return favoritos;
};

/**
 * Funcion para agregar productos a la base de datos 
 */

export const setData = async (correo,descripcion,categoria,impusto,codigo) =>{
  const db = firebase.firestore(); 
  const docRef = await db.collection("productos").add({
      Correo: correo,
      Descripcion: descripcion,
      Categoria: categoria,
      Impuesto: impuesto,
      Codigo: codigo,
  });

};