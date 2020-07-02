var ptr = 0;
var max_index = 1;
var bg_default: string[] = [];

window.onload = function() {
  ptr = 0;
  max_index = 1;
  const p_tags = document.getElementsByTagName("p");
  const delims = ",.!?:;。！？♪";

  for (let i = 0; i < p_tags.length; i++) {
    const inner_html = p_tags[i].innerHTML;
    let new_html = "";
    let begin = 0;
    let is_in_tag = false;

    for (let j = 0; j < inner_html.length; j++) {
      if (!is_in_tag && inner_html[j] == "<") {
        // < までを, < 自身を含めずにnew_html に入れる
        const sentence = inner_html.slice(begin, j);
        new_html += `<span class="sentence-piece-${max_index}">${sentence}</span>`;
        // <> 内をnew_htmlに入れるための準備
        begin = j;
        is_in_tag = true;
      }

      if (is_in_tag && inner_html[j] == ">") {
        // <> 内をnew_htmlに入れる
        new_html += inner_html.slice(begin, j + 1);
        begin = j + 1;
        is_in_tag = false;
      }

      if (is_in_tag) {
        continue;
      }

      if (delims.includes(inner_html[j]) || j + 1 == inner_html.length) {
        // deliminator自身を含めてspanで囲い new_html に入れる
        const sentence = inner_html.slice(begin, j + 1);
        new_html += `<span class="sentence-piece-${max_index}">${sentence}</span>`;

        max_index++;
        if (j + 1 == inner_html.length && !delims.includes(inner_html[j])) {
          max_index--;
        }

        begin = j + 1;
      }
    }

    p_tags[i].innerHTML = new_html;
  }

  document.body.addEventListener("keydown", event => {
    if (event.key === "n") {
      next();
    } else if (event.key == "b") {
      back();
    }
  });

  reset(-1, 0);
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
  const prev_elems = document.getElementsByClassName(
    `sentence-piece-${prev_i + 1}`
  );

  for (let i = 0; i < prev_elems.length; i++) {
    (prev_elems[i] as HTMLElement).style.backgroundColor = bg_default[i];
  }

  const curr_elems = document.getElementsByClassName(
    `sentence-piece-${cur_i + 1}`
  );

  bg_default = [];

  for (let i = 0; i < curr_elems.length; i++) {
    const curr_elem = curr_elems[i] as HTMLElement;

    let original_color = "transparent";
    if (curr_elem.style.backgroundColor != null) {
      original_color = curr_elem.style.backgroundColor;
    }
    bg_default.push(original_color);

    curr_elem.style.backgroundColor = "#ffff00";
  }
}
