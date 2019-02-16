let outputMessage = "";
let numberButtons = document.getElementsByClassName("btn");
let output = document.getElementById("output");
let steps = document.getElementById("step");
let count = 0;
let history = [];
let errorMessage = "";
let errMess = document.getElementById("errMess");

const numberButtonClick = value => {
  switch (true) {
    case value === "C": //For the clear button
      value = "";
      outputMessage = "";
      errorMessage = "";
      break;

    case value == "+" ||
      value == "-" ||
      value == "*" ||
      value == "/" ||
      outputMessage == "" ||
      value == ".": // For the sign button
      let outputLastDigit = ""
        .concat(outputMessage)
        .split("")
        .slice(-1);

      if ((value === ".") & outputMessage.split("").includes(".")) {
        //if output is 10.2 => do not allow .
        value = "";
        errorMessage = "Error: Operation Not Allowed";
      }
      if (
        //Disallow case of ++ or +*
        outputLastDigit == "+" ||
        outputLastDigit == "-" ||
        outputLastDigit == "*" ||
        outputLastDigit == "/" ||
        outputLastDigit == "."
      ) {
        value = "";
        errorMessage = "Error: Operation Not Allowed";
      }
      break;

    case value === "=": //For the = button
      history = history.concat(outputMessage);
      renderStep(count, history);
      count++;
      value = eval(outputMessage);
      outputMessage = "";
      errorMessage = "";
      break;

    default:
      value = value;
      errorMessage = "";
  }
  outputMessage += value;
  output.innerHTML = outputMessage;
  errMess.innerHTML = errorMessage;
};

const toStep = step => {
  output.innerHTML = history[step];
  history = [].concat(history).slice(0, step + 1);
  renderStep(step, history);
};

const renderStep = (count, history) => {
  let renderMessage = "";
  for (let i = 0; i < count + 1; i++) {
    renderMessage += `<li>${history[i]} 
                    <button onClick='toStep(${i})'>Step ${i}</button></li> `;
  }
  steps.innerHTML = renderMessage;
};

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", e =>
    numberButtonClick(e.target.innerHTML)
  );
}
