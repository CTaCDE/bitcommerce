
// Source: https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchStore() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('userSearchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("item_container");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
