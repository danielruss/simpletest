window.onload = (event) => {
  console.log("calling window.onload");
  document.getElementById("myform").addEventListener("submit", gridParseListener);
};

gridParseListener = function (event) {
  event.preventDefault();
  let text = document.getElementById("txt").value;
  parseGrid(text);
};

// note the text should contain the entirity of ONE grid!
// the regex for a grid is /\|grid\|([^|]*?)\|([^|]*?)\|([^|]*?)\|
// you  can use the /g and then pass it to the function one at a time...
parseGrid = function (text) {
  console.log("in parseGrid ", text);

  let grid_obj = {};
  //  look for key element of the text
  grid_regex = /\|grid\|([^|]*?)\|([^|]*?)\|([^|]*?)\|/;
  let grid_match = text.match(grid_regex);
  if (grid_match) {
    // match[1] should be "shared text ; [Q1] question text ; [Q2] question text; shared responses"
    // dont use string split -- it is possible that shared text OR question text contains a ;
    console.log(grid_match);
    grid_obj = {
      original: grid_match[0],
      shared_text: grid_match[1],
      question_text: grid_match[2],
      shared_response: grid_match[3],
      questions: [],
      responses: [],
    };
    let question_regex = /\[([A-Z][A-Z0-9_]*)\](.*?);\s*(?=[\[\]])/g;
    let question_matches = grid_obj.question_text.matchAll(question_regex);
    for (const match of question_matches) {
      let question_obj = { id: match[1], question_text: match[2] };
      grid_obj.questions.push(question_obj);
    }

    let rb_cb_regex = /([\[\(])(\w+):([^\]\)]+)[\]\)]/g;
    let response_matches = grid_obj.shared_response.matchAll(rb_cb_regex);
    if (response_matches) {
      for (const match of response_matches) {
        grid_obj.responses.push({
          is_radio: match[1] == "(",
          type: match[1] == "(" ? "radio" : "checkbox",
          value: match[2],
          text: match[3],
        });
      }
    }
  }
  document.getElementById("mydiv").innerHTML = buildHtml(grid_obj);
};

buildHtml = function (grid_obj) {
  let grid_head = '<div class="d-flex align-items-center border"><div class="col">Select an answer for each row below:</div>';
  grid_obj.responses.forEach((resp) => {
    grid_head += `<div class="col-1">${resp.text}</div>`;
  });
  grid_head += "</div>";
  let grid_table_body = "";
  grid_obj.questions.forEach((question) => {
    grid_table_body += `<div class="d-flex align-items-stretch"><div class="col d-flex align-items-center justify-content-center border">${question.question_text}</div>`;
    grid_obj.responses.forEach((resp, resp_indx) => {
      grid_table_body += `<div class="col-1 d-flex align-items-center justify-content-center border"><input type="${resp.type}" name="${question.question_text}" id="${question.id}_${resp_indx}" onclick="toggle(this)"/></div>`;
    });
    grid_table_body += "</div>";
  });

  let small_format = "";
  grid_obj.questions.forEach((question) => {
    small_format += `<div class="py-4">${question.question_text}</div>`;
    grid_obj.responses.forEach((resp, resp_indx) => {
      small_format += `<div class="text-center"><input type="${resp.type}" class="d-none" name="${question.id}_sm" id="${question.id}_sm_${resp_indx}" onclick="toggle(this)" /><label class="w-100" for="${question.id}_sm_${resp_indx}">${resp.text}</label></div>`;
    });
  });

  let html_text = `<form class="container question" hardedit="false" softedit="false">
    ${grid_obj.shared_text}
    <div class="d-none d-lg-block" style="background-color: beige;">
       ${grid_head}
       ${grid_table_body}
    </div>
    <div class="d-lg-none">
    ${small_format}
    </div>
    <div><input type='submit' class='previous' value='BACK'></input><input type='submit' class='next' value='NEXT'></input></div>
    </form>`;

  return html_text;
};

toggle = function (element) {
  let id_regex = /(^.*?)(_sm)?(_.*$)/;
  let tmp = element.id.match(id_regex);
  // tmp MUST match!!!
  if (!tmp) {
    console.error("ERROR in [grid] toggle!!!  Bad element id!");
  }
  let otherid = tmp[2] ? tmp[1] + tmp[3] : tmp[1] + "_sm" + tmp[3];
  document.getElementById(otherid).checked = element.checked;
};
