async function myFunction() {
    console.log("avant");
  
    // Utilisation de la fonction setTimeout avec une promesse
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    console.log("pendant");
}


// Appel de la fonction asynchrone
myFunction();
  
console.log("apres");