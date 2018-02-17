/*
PRINT THIS HTML FOR EACH ITEM IN THE LIST
        <li>
            <a href="../html/details.html"><img src="../images/black_tee_m.jpg" class="img-responsive" alt=""></a>
            <div class="special-info grid_1 simpleCart_shelfItem">
                <h5>Consectetur adipis</h5>
                <div class="item_add"><span class="item_price"><h6>$20.00</h6></span></div>
                <center>
  
                </center>
            </div>
        </li>
*/

function getStoreItems (item_container) {
    console.log("Loaded getStoreItems!");
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "https://api.mlab.com/api/1/databases/items/collections/tshirts?apiKey=TWDrwzV7Bh-9-oQuxwZDqBsyk-940NX6",
        success: function(data) {
            console.log("Our data: " + JSON.stringify(data));
            printStoreItems(item_container, data)
        }
    });
}

function printStoreItems (item_container, data) {
    console.log("Loaded loadItems.js!");

    const paypal_button1 = ' \
    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post"> \
    <input type="hidden" name="cmd" value="_s-xclick"> \
    <input type="hidden" name="hosted_button_id" value="';
    const paypal_button2 = ' "> \
    <table> \
    <tr><td><input type="hidden" name="on0" value="Sizes">Sizes</td></tr><tr><td><select name="os0"> \
        <option value="S">S </option> \
        <option value="M">M </option> \
        <option value="L">L </option> \
    </select> </td></tr> \
    </table> \
    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> \
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> \
    </form>';

//    console.log(data);
    var html_string;
    var container_box;

    for (var i = 0; i < data.length; i++) {
        itemid = data[i].itemid;
        price = data[i].price;
        name = data[i].name;
        description = data[i].description;
        paypal_id = data[i].paypal_id;

        container_box = document.getElementById(item_container);
        html_string = ' \
            <li> \
                <a href="../html/details.html"><img src="../images/'+ itemid +'.jpg" class="img-responsive" alt=""></a> \
                <div class="special-info grid_1 simpleCart_shelfItem"> \
                    <h5>' + name +'</h5> \
                    <div class="item_add"><span class="item_price"><h6>$'+ price +'</h6></span></div> \
                    <center>' + paypal_button1 + paypal_id + paypal_button2 + ' </center> \
                </div> \
            </li>';
        container_box.insertAdjacentHTML('beforeend',html_string);
    }
} // end function
