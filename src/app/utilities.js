const reduceParagraph = (paragraph, numWord) => {
    var list_word = paragraph.split(" ");
    var res = "";
    for (var i = 0; i < numWord; i++) {
        res = res + list_word[i] + " ";
    }
    return res + " ...";
};

export { reduceParagraph };