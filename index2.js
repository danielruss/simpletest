import { transform } from "https://episphere.github.io/quest/replace2.js";
import { rbAndCbClick } from "https://episphere.github.io/quest/questionnaire.js";

function buildHTML(soccerResults, question, responseElement) {
  if (responseElement) {
    let tmp = responseElement.cloneNode(false);
    question.replaceChild(tmp, responseElement);
    responseElement = tmp;
  } else {
    responseElement = document.createElement("div");
    responseElement.classList.add("response");
    question.insertBefore(responseElement, question.childNodes[0]);
    let questionText = document.createTextNode("Please identify the occupation category that best describes this job.");
    responseElement.append(questionText);
  }
  soccerResults.forEach((soc, indx) => {
    let resp = document.createElement("input");
    resp.type = "radio";
    resp.id = `${question.id}_${indx}`;
    resp.value = soc.code;
    resp.name = "SOCcerResults";
    resp.onclick = rbAndCbClick;
    let label = document.createElement("label");
    label.setAttribute("for", `${question.id}_${indx}`);
    label.innerText = soc.label;
    responseElement.append(resp, label);
  });
  let resp = document.createElement("input");
  resp.type = "radio";
  resp.id = `${question.id}_NOTA`;
  resp.value = "NONE_OF_THE_ABOVE";
  resp.name = "SOCcerResults";
  resp.onclick = rbAndCbClick;
  let label = document.createElement("label");
  label.setAttribute("for", `${question.id}_NOTA`);
  label.innerText = "NONE OF THE ABOVE";

  responseElement.append(resp, label);
}

let listener = async function (e) {
  e.preventDefault();
  let firstName = e.target.querySelector("#firstName").value;
  let age = e.target.querySelector("#age").value;
  e.target.style.display = "none";

  const response = await transform.render(
    {
      url: "https://jonasalmeida.github.io/privatequest/demo2.txt",
      //url: "https://danielruss.github.io/simpletest/SITFTest.txt",
      activate: true,
    },
    "root",
    { firstName: firstName, age: age }
  );

  if (response) {
    document.getElementById("WORK3").addEventListener("submit", async (e) => {
      e.preventDefault();
      const jobtitle = event.target[0].value;
      const occ = document.getElementById("OCCUPTN1");

      // call soccer...
      let soccerResults = await (await fetch(`https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code?title=${jobtitle}`)).json();
      console.log(soccerResults);

      let responseElement = occ.querySelector("div[class='response']");
      buildHTML(soccerResults, occ, responseElement);
    });

    document.getElementById("WORK7").addEventListener("submit", async (e) => {
      e.preventDefault();
      const jobtitle = event.target[0].value;
      const occ = document.getElementById("OCCUPTN2");

      // call soccer...
      let soccerResults = await (await fetch(`https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code?title=${jobtitle}`)).json();
      console.log(soccerResults);

      let responseElement = occ.querySelector("div[class='response']");
      buildHTML(soccerResults, occ, responseElement);
    });
  }
};

document.getElementById("prevResForm").addEventListener("submit", listener);
