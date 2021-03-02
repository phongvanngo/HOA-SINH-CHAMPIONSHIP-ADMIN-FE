const reduceParagraph = (paragraph, numWord) => {
    var list_word = paragraph.split(" ");
    var res = "";
    for (var i = 0; i < Math.min(numWord, list_word.length); i++) {
        res = res + list_word[i] + " ";
    }
    return res + " ...";
};

export { reduceParagraph };