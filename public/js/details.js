function getDetails (details_container) {
    console.log("Loading details!");
    var url_string = window.location.href;
    var url = new URL(url_string);
    var iid = url.searchParams.get("itemid");
    console.log(iid);
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: 'https://api.mlab.com/api/1/databases/items/collections/tshirts?q={"itemid":' + iid + '}&apiKey=TWDrwzV7Bh-9-oQuxwZDqBsyk-940NX6',
        success: function(data) {
            //console.log("Our data: " + JSON.stringify(data));
            printItem(details_container, data)
        }
    });
}


function printItem (detail_container, data) {
    console.log("printing item");

    const paypal_button1half = ' \
    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post"> \
    <input type="hidden" name="cmd" value="_s-xclick"> \
    <input type="hidden" name="hosted_button_id" value="';
    const paypal_button2half = ' "> \
    <table> \
    <tr><td><input type="hidden" name="on0" value="Sizes">Sizes</td></tr><tr><td><select name="os0"> \
        <option value="S">S </option> \
        <option value="M">M </option> \
        <option value="L">L </option> \
    </select> </td></tr> \
    </table> \
    <br> \
    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> \
    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> \
    </form>';
    
    var html_string;
    var container_box; 
    container_box = document.getElementById(detail_container);

    itemid = data[0].itemid;
    price = data[0].price;
    name = data[0].name;
    description = data[0].description;
    paypal_id = data[0].paypal_id; 

    html_string = `<div class="women_main">
					<div class="row single">
						<div class="col-md-9 det">
							<div class="single_left">
								<div class="grid images_3_of_2">
									<ul id="etalage">
										<li>
											<a href="../html/optionallink.html">
												<img class="etalage_thumb_image" src="../images/d1.jpg" class="img-responsive" />
												<img class="etalage_source_image" src="../images/d1.jpg" class="img-responsive" title="" />
											</a>
										</li>
										<li>
											<img class="etalage_thumb_image" src="../images/d2.jpg" class="img-responsive" />
											<img class="etalage_source_image" src="../images/d2.jpg" class="img-responsive" title="" />
										</li>
										<li>
											<img class="etalage_thumb_image" src="../images/d3.jpg" class="img-responsive"  />
											<img class="etalage_source_image" src="../images/d3.jpg"class="img-responsive"  />
										</li>
									    <li>
											<img class="etalage_thumb_image" src="../images/d4.jpg" class="img-responsive"  />
											<img class="etalage_source_image" src="../images/d4.jpg"class="img-responsive"  />
										</li>
									</ul>
									<div class="clearfix"></div>		
							  	</div>
							  	<div class="desc1 span_3_of_2">
									<h3>` + name + `</h3>
									<span class="brand">Artist: <a href="#">Our Team </a></span>
									<br>
									<span class="code">Item ID: ` + itemid + `</span>
									<p>` + description + `</p>
									<div class="price">
										<span class="text">Price:</span>
										<span class="price">$` + price + `.00</span><br>
									</div> ` + paypal_button1half + paypal_id + paypal_button2half + `<a href="#"><span>login to save in wishlist </span></a>
						   	 	</div>
			          	    	<div class="clearfix"></div>
			          	   	</div>
				       	</div>	
			   		</div>
					<div class="clearfix"></div>		
				</div>`;

    container_box.insertAdjacentHTML('afterbegin',html_string);

    // Dynamically load jQuery for etalage image
    jQuery(document).ready(function($){
        $('#etalage').etalage({
            thumb_image_width: 300,
            thumb_image_height: 400,
            source_image_width: 900,
            source_image_height: 1200,
            show_hint: true,
            click_callback: function(image_anchor, instance_id){
                alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
            }
        });

    });
} // end function
