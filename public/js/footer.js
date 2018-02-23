function loadFooter(container) {
	var html_string;
	var container_box; 
    container_box = document.getElementById(container);

	html_string = ` <div class="container">
						<div class="col-md-3 cust">
							<h4>CUSTOMER CARE</h4>
							<li><a href="#">Help Center</a></li>
							<li><a href="#">FAQ</a></li>
							<li><a href="buy.html">How To Buy</a></li>
							<li><a href="#">Delivery</a></li>
						</div>
						<div class="col-md-2 abt">
							<h4>ABOUT US</h4>
							<li><a href="#">Our Stories</a></li>
							<li><a href="#">Press</a></li>
							<li><a href="#">Career</a></li>
							<li><a href="#">Contact</a></li>
						</div>
						<div class="col-md-2 myac">
							<h4>MY ACCOUNT</h4>
							<li><a href="#">Register</a></li>
							<li><a href="#">My Cart</a></li>
							<li><a href="#">Order History</a></li>
							<li><a href="buy.html">Payment</a></li>
						</div>
						<div class="col-md-5 our-st">
							<div class="our-left">
								<h4>OUR STORES</h4>
							</div>
							<div class="clearfix"> </div>
							<li><i class="add"> </i>1 Shields Ave, Davis, CA</li>
					<!--	<li><i class="phone"> </i>(555) 901-3434</li> -->
							<li><a href="mailto:193tees@gmail.com"><i class="mail"> </i>193tees@gmail.com </a></li>	
						</div>
						<div class="clearfix"> </div>
						<p>Copyrights © 2015 Gretong. All rights reserved | Template by <a href="http://w3layouts.com/">W3layouts</a></p>
					</div>`;

	container_box.insertAdjacentHTML('afterbegin',html_string);
}


