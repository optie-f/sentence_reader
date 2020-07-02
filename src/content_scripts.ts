var ptr = 0;
var max_index = 1;
var bg_default: string | null = "transparent";

window.onload = function() {
  ptr = 0;
  max_index = 1;
  const p_tags = document.getElementsByTagName("p");
  const delims = ",.!?:;。！？";

  for (let i = 0; i < p_tags.length; i++) {
    const text = p_tags[i].innerText;
    p_tags[i].innerText = "";

    let begin = 0;
    for (let j = 0; j < text.length; j++) {
      if (delims.includes(text[j]) || j + 1 == text.length) {
        const span = document.createElement("span");
        const sentence = text.slice(begin, j + 1);
        span.appendChild(document.createTextNode(sentence));
        span.id = `sentence-piece-${max_index}`;
        max_index++;
        p_tags[i].appendChild(span);
        begin = j + 1;
      }
    }
  }

  document.body.addEventListener("keydown", event => {
    if (event.key === "n") {
      next();
    } else if (event.key == "b") {
      back();
    }
  });

  reset(0, -1);
};

function next() {
  let prev_i = ptr;
  ptr++;
  ptr %= max_index;
  reset(prev_i, ptr);
}

function back() {
  let prev_i = ptr;
  ptr--;
  ptr += max_index;
  ptr %= max_index;
  reset(prev_i, ptr);
}

function reset(prev_i: number, cur_i: number) {
  const prev_elem = document.getElementById(`sentence-piece-${prev_i + 1}`);
  if (prev_elem) {
    prev_elem.style.backgroundColor = bg_default;
  }
  const curr_elem = document.getElementById(`sentence-piece-${cur_i + 1}`);
  if (curr_elem) {
    bg_default = curr_elem.style.backgroundColor;
    curr_elem.style.backgroundColor = "#ffff00";
  }
}
