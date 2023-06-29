function validateData(data) {
  return new Promise(function (resolve, reject) {
    if (isValid(data)) {
      resolve("Data is valid");
    } else {
      reject(new Error("Invalid data"));
    }
  });
}

// Example usage
const data = "Valid data";

validateData(data)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });
