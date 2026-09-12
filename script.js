/* =====================================================
   ZUNVERO — COMPLETE WEBSITE SCRIPT
   ===================================================== */


/* =====================================================
   CART SYSTEM
   ===================================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem("zunveroCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "zunveroCart",
        JSON.stringify(cart)
    );

}


/* ADD TO CART */

function addToCart(name, price, image, size, quantity) {
    var cart = getCart();
    var qty = Number(quantity) || 1;
    if (qty < 1) qty = 1;
    var itemSize = size || "";

    var existing = cart.find(function(item) {
        return item.name === name && (item.size || "") === itemSize;
    });

    if (existing) {
        existing.quantity = (Number(existing.quantity) || 0) + qty;
    } else {
        cart.push({
            name: name,
            price: Number(price) || 0,
            image: image || "",
            quantity: qty,
            size: itemSize
        });
    }

    saveCart(cart);
    updateCartCount();
    alert(name + " added to cart!");
}


/* CART COUNT */

function updateCartCount() {

    var cart = getCart();

    var count = 0;

    cart.forEach(function(item) {

        count += Number(item.quantity) || 0;

    });


    var cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


/* REMOVE CART ITEM */

function removeFromCart(index) {

    var cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    showCart();

    updateCartCount();

}


/* CHANGE CART QUANTITY */

function changeQuantity(index, change) {

    var cart = getCart();

    if (!cart[index]) {
        return;
    }


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    showCart();

    updateCartCount();

}


/* SHOW CART */

function showCart() {

    var container =
        document.getElementById("cartItems");

    var totalElement =
        document.getElementById("cartTotal");


    if (!container) {
        return;
    }


    var cart = getCart();

    container.innerHTML = "";

    var total = 0;


    if (cart.length === 0) {

        container.innerHTML =

            "<div class='empty-cart'>" +

            "<h2>Your Cart Is Empty</h2>" +

            "<p>Add some beautiful products from ZUNVERO.</p>" +

            "<a href='index.html'>CONTINUE SHOPPING</a>" +

            "</div>";


        if (totalElement) {

            totalElement.textContent =
                "Rs. 0";

        }

        return;

    }


    cart.forEach(function(item, index) {

        var itemTotal =
            Number(item.price) *
            Number(item.quantity);


        total += itemTotal;


        var sizeHTML =
            item.size
                ? "<p>Size: " +
                  item.size +
                  "</p>"
                : "";


        container.innerHTML +=

            "<div class='cart-item'>" +

            "<img src='" +
            item.image +
            "'>" +

            "<div class='cart-details'>" +

            "<h3>" +
            item.name +
            "</h3>" +

            "<p>Rs. " +
            Number(item.price).toLocaleString() +
            "</p>" +

            sizeHTML +

            "<div class='quantity'>" +

            "<button onclick='changeQuantity(" +
            index +
            ",-1)'>−</button>" +

            "<span>" +
            item.quantity +
            "</span>" +

            "<button onclick='changeQuantity(" +
            index +
            ",1)'>+</button>" +

            "</div>" +

            "<button class='remove' " +
            "onclick='removeFromCart(" +
            index +
            ")'>" +

            "Remove" +

            "</button>" +

            "</div>" +

            "</div>";

    });


    if (totalElement) {

        totalElement.textContent =
            "Rs. " +
            total.toLocaleString();

    }

}


/* OLD CART WHATSAPP ORDER */

function orderCart() {

    var cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    var message =
        "Assalam o Alaikum ZUNVERO\n\n" +
        "I want to place an order:\n\n";


    var total = 0;


    cart.forEach(function(item) {

        var itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        message +=
            item.name +
            " x " +
            item.quantity;


        if (item.size) {

            message +=
                " | Size: " +
                item.size;

        }


        message +=
            " = Rs. " +
            itemTotal +
            "\n";

    });


    message +=
        "\nTotal: Rs. " +
        total +
        "\n\nPlease confirm my order.";


    var phone =
        "923714696172";


    window.open(

        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message),

        "_blank"

    );

}


/* =====================================================
   PRODUCT MANAGEMENT
   ===================================================== */

var defaultZunveroProducts = [

    {
        id: 1,
        name: "Floral Elegance 2-Piece",
        price: 3499,
        salePrice: 0,
        category: "women twopiece",
        description:
            "A graceful floral 2-piece suit featuring an elegant print and comfortable fabric. Perfect for everyday wear and casual occasions.",
        sizes: ["S", "M", "L", "XL"],
        colors: "Floral",
        stock: 20,
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80"
        ],
        badge: "NEW"
    },

    {
        id: 2,
        name: "Classic Premium T-Shirt",
        price: 1699,
        salePrice: 0,
        category: "men tshirts",
        description:
            "A clean and versatile premium T-shirt made for everyday comfort. Its classic design makes it easy to style with your everyday wardrobe.",
        sizes: ["S", "M", "L", "XL"],
        colors: "Black, White",
        stock: 30,
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
        ],
        badge: "TRENDING"
    },

    {
        id: 3,
        name: "Elegant Embroidered Suit",
        price: 4299,
        salePrice: 0,
        category: "women twopiece",
        description:
            "An elegant embroidered 2-piece suit with refined detailing and a graceful finish. A beautiful choice for a polished look.",
        sizes: ["S", "M", "L", "XL"],
        colors: "Beige, White",
        stock: 15,
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80",
        images: [
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80"
        ],
        badge: ""
    },

    {
        id: 4,
        name: "Oversized Street T-Shirt",
        price: 1999,
        salePrice: 0,
        category: "men tshirts",
        description:
            "A relaxed oversized T-shirt created for a modern streetwear look. Comfortable, stylish and easy to pair with everyday outfits.",
        sizes: ["M", "L", "XL"],
        colors: "Black, Grey",
        stock: 25,
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80",
        images: [
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80"
        ],
        badge: "POPULAR"
    }

];


function getProducts() {

    var products =
        JSON.parse(
            localStorage.getItem(
                "zunveroProducts"
            )
        );


    if (!products) {

        products =
            defaultZunveroProducts;

        localStorage.setItem(
            "zunveroProducts",
            JSON.stringify(products)
        );

    }


    return products;

}


function saveProducts(products) {

    localStorage.setItem(
        "zunveroProducts",
        JSON.stringify(products)
    );

}




        

/* =====================================================
   ADMIN — DELETE PRODUCT
   ===================================================== */

function deleteAdminProduct(id) {

    if (
        !confirm(
            "Delete this product?"
        )
    ) {

        return;

    }


    var products =
        getProducts();


    products =
        products.filter(function(product) {

            return String(product.id) !==
                   String(id);

        });


    saveProducts(
        products
    );


    showAdminProducts();


    alert(
        "Product deleted."
    );

}

/* =====================================================
   ADMIN GALLERY IMAGE SYSTEM
===================================================== */

var adminExistingImages = [];


/* =========================
   IMAGE PREVIEW
========================= */

function previewAdminImage(input, previewId) {

    var preview =
        document.getElementById(previewId);

    if (!preview) {
        return;
    }

    preview.innerHTML = "";

    if (!input.files || !input.files[0]) {
        return;
    }

    var file = input.files[0];

    if (!file.type.startsWith("image/")) {
        alert("Please select an image.");
        input.value = "";
        return;
    }

    var reader = new FileReader();

    reader.onload = function(event) {

        var img =
            document.createElement("img");

        img.src =
            event.target.result;

        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "10px";

        preview.appendChild(img);

    };

    reader.readAsDataURL(file);

}


/* =========================
   COMPRESS IMAGE
========================= */

function compressAdminImage(file) {

    return new Promise(function(resolve, reject) {

        var reader =
            new FileReader();

        reader.onload = function(event) {

            var img =
                new Image();

            img.onload = function() {

                var maxSize = 1000;

                var width =
                    img.width;

                var height =
                    img.height;


                if (width > height) {

                    if (width > maxSize) {

                        height =
                            Math.round(
                                height *
                                maxSize /
                                width
                            );

                        width =
                            maxSize;

                    }

                } else {

                    if (height > maxSize) {

                        width =
                            Math.round(
                                width *
                                maxSize /
                                height
                            );

                        height =
                            maxSize;

                    }

                }


                var canvas =
                    document.createElement("canvas");

                canvas.width =
                    width;

                canvas.height =
                    height;


                var ctx =
                    canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );


                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        0.78
                    )
                );

            };


            img.onerror =
                reject;

            img.src =
                event.target.result;

        };


        reader.onerror =
            reject;

        reader.readAsDataURL(file);

    });

}


/* =========================
   SAVE PRODUCT
========================= */

async function saveAdminProduct() {

    var name =
        document.getElementById(
            "adminProductName"
        ).value.trim();


    var category =
        document.getElementById(
            "adminProductCategory"
        ).value;


    var price =
        Number(
            document.getElementById(
                "adminProductPrice"
            ).value
        );


    var salePrice =
        Number(
            document.getElementById(
                "adminProductSalePrice"
            ).value
        ) || 0;


    var description =
        document.getElementById(
            "adminProductDescription"
        ).value.trim();


    var colors =
        document.getElementById(
            "adminProductColors"
        ).value.trim();


    var stock =
        Number(
            document.getElementById(
                "adminProductStock"
            ).value
        ) || 0;


    var rating =
        Number(
            document.getElementById(
                "adminProductRating"
            ).value
        ) || 5;


    var badge =
        document.getElementById(
            "adminProductBadge"
        ).value;


    var editId =
        document.getElementById(
            "editProductId"
        ).value;


    var sizes = [];


    document
        .querySelectorAll(
            ".product-size:checked"
        )
        .forEach(function(box) {

            sizes.push(
                box.value
            );

        });


    if (
        name === "" ||
        price <= 0
    ) {

        alert(
            "Please enter Product Name and Price."
        );

        return;

    }


    if (
        salePrice > 0 &&
        salePrice >= price
    ) {

        alert(
            "Sale Price must be lower than Regular Price."
        );

        return;

    }


    /* =========================
       GET SELECTED FILES
    ========================= */

    var file1 =
        document.getElementById(
            "adminProductImage"
        ).files[0];


    var file2 =
        document.getElementById(
            "adminProductImage2"
        ).files[0];


    var file3 =
        document.getElementById(
            "adminProductImage3"
        ).files[0];


    var file4 =
        document.getElementById(
            "adminProductImage4"
        ).files[0];


    var files = [
        file1,
        file2,
        file3,
        file4
    ];


    /* =========================
       EXISTING IMAGE CHECK
    ========================= */

    var existingMain =
        adminExistingImages[0] || "";


    if (
        editId === "" &&
        !file1
    ) {

        alert(
            "Please select the Main Product Image from your gallery."
        );

        return;

    }


    if (
        editId !== "" &&
        !file1 &&
        !existingMain
    ) {

        alert(
            "Please select a Main Product Image."
        );

        return;

    }


    /* =========================
       COMPRESS SELECTED IMAGES
    ========================= */

    var finalImages = [];


    try {

        for (
            var i = 0;
            i < files.length;
            i++
        ) {

            if (files[i]) {

                var compressed =
                    await compressAdminImage(
                        files[i]
                    );

                finalImages[i] =
                    compressed;

            } else {

                finalImages[i] =
                    adminExistingImages[i] ||
                    "";

            }

        }

    } catch (error) {

        console.error(error);

        alert(
            "Image processing failed. Please select the images again."
        );

        return;

    }


    finalImages =
        finalImages.filter(Boolean);


    var image =
        finalImages[0] || "";


    if (!image) {

        alert(
            "Main Product Image is required."
        );

        return;

    }


    /* =========================
       GET PRODUCTS
    ========================= */

    var products =
        getProducts();


    /* =========================
       EDIT PRODUCT
    ========================= */

    if (editId !== "") {

        var existingProduct =
            products.find(
                function(product) {

                    return String(product.id) ===
                        String(editId);

                }
            );


        if (!existingProduct) {

            alert(
                "Product not found."
            );

            return;

        }


        existingProduct.name =
            name;

        existingProduct.category =
            category;

        existingProduct.price =
            price;

        existingProduct.salePrice =
            salePrice;

        existingProduct.description =
            description;

        existingProduct.sizes =
            sizes;

        existingProduct.colors =
            colors;

        existingProduct.stock =
            stock;

        existingProduct.rating =
            rating;

        existingProduct.badge =
            badge;

        existingProduct.image =
            image;

        existingProduct.images =
            finalImages;


        saveProducts(
            products
        );


        alert(
            "Product updated successfully."
        );


    } else {


        /* =========================
           NEW PRODUCT
        ========================= */

        var newProduct = {

            id:
                Date.now(),

            name:
                name,

            category:
                category,

            price:
                price,

            salePrice:
                salePrice,

            description:
                description,

            sizes:
                sizes,

            colors:
                colors,

            stock:
                stock,

            rating:
                rating,

            badge:
                badge,

            image:
                image,

            images:
                finalImages

        };


        products.push(
            newProduct
        );


        saveProducts(
            products
        );


        alert(
            "New product added successfully."
        );

    }


    clearAdminForm();

    showAdminProducts();

}


/* =====================================================
   ADMIN — EDIT PRODUCT
===================================================== */

function editAdminProduct(id) {

    var products =
        getProducts();


    var product =
        products.find(
            function(item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    document.getElementById(
        "editProductId"
    ).value =
        product.id;


    document.getElementById(
        "adminProductName"
    ).value =
        product.name || "";


    document.getElementById(
        "adminProductCategory"
    ).value =
        product.category || "women";


    document.getElementById(
        "adminProductPrice"
    ).value =
        product.price || "";


    document.getElementById(
        "adminProductSalePrice"
    ).value =
        product.salePrice || "";


    document.getElementById(
        "adminProductDescription"
    ).value =
        product.description || "";


    document.getElementById(
        "adminProductColors"
    ).value =
        product.colors || "";


    document.getElementById(
        "adminProductStock"
    ).value =
        product.stock || "";


    document.getElementById(
        "adminProductRating"
    ).value =
        product.rating || 5;


    document.getElementById(
        "adminProductBadge"
    ).value =
        product.badge || "";


    /* Existing images */

    adminExistingImages =
        Array.isArray(product.images)
            ? product.images.slice()
            : [product.image || ""];


    /* Clear file inputs */

    [
        "adminProductImage",
        "adminProductImage2",
        "adminProductImage3",
        "adminProductImage4"
    ].forEach(function(id) {

        var input =
            document.getElementById(id);

        if (input) {
            input.value = "";
        }

    });


    /* Sizes */

    document
        .querySelectorAll(
            ".product-size"
        )
        .forEach(function(box) {

            box.checked =
                Array.isArray(product.sizes) &&
                product.sizes.includes(
                    box.value
                );

        });


    /* Existing image previews */

    var previewIds = [
        "adminPreview1",
        "adminPreview2",
        "adminPreview3",
        "adminPreview4"
    ];


    previewIds.forEach(
        function(previewId, index) {

            var preview =
                document.getElementById(
                    previewId
                );


            if (!preview) {
                return;
            }


            preview.innerHTML = "";


            if (
                adminExistingImages[index]
            ) {

                var img =
                    document.createElement(
                        "img"
                    );

                img.src =
                    adminExistingImages[index];

                img.style.width =
                    "120px";

                img.style.height =
                    "120px";

                img.style.objectFit =
                    "cover";

                img.style.borderRadius =
                    "10px";

                preview.appendChild(
                    img
                );

            }

        }
    );


    document.getElementById(
        "adminFormTitle"
    ).textContent =
        "Edit Product";


    document.getElementById(
        "adminCancelBtn"
    ).style.display =
        "block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   ADMIN — CLEAR FORM
===================================================== */

function clearAdminForm() {

    var ids = [

        "editProductId",

        "adminProductName",

        "adminProductPrice",

        "adminProductSalePrice",

        "adminProductDescription",

        "adminProductColors",

        "adminProductStock"

    ];


    ids.forEach(function(id) {

        var element =
            document.getElementById(id);


        if (element) {

            element.value =
                "";

        }

    });


    document.getElementById(
        "adminProductRating"
    ).value =
        "5";


    document.getElementById(
        "adminProductBadge"
    ).value =
        "";


    document
        .querySelectorAll(
            ".product-size"
        )
        .forEach(function(box) {

            box.checked =
                false;

        });


    [
        "adminProductImage",
        "adminProductImage2",
        "adminProductImage3",
        "adminProductImage4"
    ].forEach(function(id) {

        var input =
            document.getElementById(id);

        if (input) {
            input.value = "";
        }

    });


    [
        "adminPreview1",
        "adminPreview2",
        "adminPreview3",
        "adminPreview4"
    ].forEach(function(id) {

        var preview =
            document.getElementById(id);

        if (preview) {
            preview.innerHTML = "";
        }

    });


    adminExistingImages = [];


    var title =
        document.getElementById(
            "adminFormTitle"
        );

    if (title) {

        title.textContent =
            "Add New Product";

    }


    var cancel =
        document.getElementById(
            "adminCancelBtn"
        );

    if (cancel) {

        cancel.style.display =
            "none";

    }

}


/* =====================================================
   ADMIN — CANCEL EDIT
===================================================== */

function cancelAdminEdit() {

    clearAdminForm();

}




/* =====================================================
   PRODUCT SIZE
   ===================================================== */

function selectSize(button) {

    if (!button) {
        return;
    }


    var buttons =
        document.querySelectorAll(
            ".size-btn"
        );


    buttons.forEach(function(btn) {

        btn.classList.remove(
            "active"
        );

    });


    button.classList.add(
        "active"
    );


    var selectedSize =
        document.getElementById(
            "selectedSize"
        );


    if (selectedSize) {

        selectedSize.value =
            button.dataset.size ||
            button.textContent.trim();

    }

}


/* =====================================================
   PRODUCT QUANTITY
   ===================================================== */

function changeProductQty(change) {

    var qtyInput =
        document.getElementById(
            "productQty"
        );


    if (!qtyInput) {
        return;
    }


    var current =
        Number(
            qtyInput.value
        ) || 1;


    current +=
        Number(change) || 0;


    if (current < 1) {

        current = 1;

    }


    var max =
        Number(
            qtyInput.max
        ) || 99;


    if (current > max) {

        current = max;

    }


    qtyInput.value =
        current;

}/* =====================================================
   PRODUCT DETAIL SYSTEM
   ===================================================== */

var selectedSize = "";
var productQty = 1;


/* FIX PRODUCT QUANTITY */

function changeProductQty(change) {

    var newQty = productQty + Number(change || 0);

    if (newQty < 1) {
        newQty = 1;
    }

    var stockElement =
        document.getElementById("productStock");

    var stock = stockElement
        ? Number(stockElement.getAttribute("data-stock")) || 0
        : 0;

    if (stock > 0 && newQty > stock) {

        alert(
            "Only " +
            stock +
            " items available in stock."
        );

        return;
    }

    productQty = newQty;

    var qtyElement =
        document.getElementById("productQty");

    if (qtyElement) {

        if (
            qtyElement.tagName === "INPUT" ||
            qtyElement.tagName === "SELECT"
        ) {
            qtyElement.value = productQty;
        } else {
            qtyElement.textContent = productQty;
        }
    }
}


/* SELECT SIZE */

function selectSize(button) {

    if (!button || button.disabled) {
        return;
    }

    document
        .querySelectorAll("#productSizes button")
        .forEach(function(btn) {

            btn.classList.remove("active");

        });

    button.classList.add("active");

    selectedSize =
        button.textContent.trim();
}


/* =====================================================
   PRODUCT DETAIL — LOAD
   ===================================================== */

var currentZunveroProduct = null;


function getProductFromUrl() {

    var params =
        new URLSearchParams(
            window.location.search
        );

    var requestedId =
        params.get("id");

    if (!requestedId) {
        return null;
    }

    var products =
        getProducts();

    var product =
        products.find(function(item) {

            return String(item.id) ===
                   String(requestedId);

        });


    if (
        !product &&
        /^zv\d+$/i.test(requestedId)
    ) {

        var numberId =
            requestedId.replace(
                /^zv/i,
                ""
            );


        product =
            products.find(function(item) {

                return String(item.id) ===
                       String(numberId);

            });


        if (!product) {

            var defaultIndex =
                Number(numberId) - 1;


            if (
                defaultIndex >= 0 &&
                defaultIndex < products.length
            ) {

                product =
                    products[defaultIndex];

            }

        }

    }


    return product || null;
}


/* LOAD PRODUCT */

function loadProduct() {

    var productName =
        document.getElementById(
            "productName"
        );

    if (!productName) {
        return;
    }


    var product =
        getProductFromUrl();


    if (!product) {

        productName.textContent =
            "Product Not Found";


        var descMissing =
            document.getElementById(
                "productDescription"
            );


        if (descMissing) {

            descMissing.textContent =
                "This product is no longer available.";

        }


        var missingButton =
            document.getElementById(
                "productAddButton"
            );


        if (missingButton) {

            missingButton.disabled =
                true;

        }

        return;

    }


    currentZunveroProduct =
        product;

    selectedSize = "";

    productQty = 1;


    var finalPrice =

        product.salePrice &&
        Number(product.salePrice) > 0 &&
        Number(product.salePrice) <
        Number(product.price)

            ? Number(product.salePrice)

            : Number(product.price);


    var category =
        document.getElementById(
            "productCategory"
        );


    var stars =
        document.getElementById(
            "productStars"
        );


    var rating =
        document.getElementById(
            "productRating"
        );


    var price =
        document.getElementById(
            "productPrice"
        );


    var oldPrice =
        document.getElementById(
            "productOldPrice"
        );


    var saleLabel =
        document.getElementById(
            "saleLabel"
        );


    var desc =
        document.getElementById(
            "productDescription"
        );


    var stock =
        document.getElementById(
            "productStock"
        );


    var sizes =
        document.getElementById(
            "productSizes"
        );


    var colors =
        document.getElementById(
            "productColors"
        );


    var qty =
        document.getElementById(
            "productQty"
        );


    var mainImage =
        document.getElementById(
            "productImage"
        );


    var thumbnails =
        document.getElementById(
            "productThumbnails"
        );


    productName.textContent =
        product.name ||
        "ZUNVERO Product";


    if (category) {

        category.textContent =
            product.category || "";

    }


    if (stars) {

        var starCount =
            Math.max(
                0,
                Math.min(
                    5,
                    Number(
                        product.rating
                    ) || 5
                )
            );


        stars.textContent =

            "★".repeat(
                Math.round(starCount)
            ) +

            "☆".repeat(
                5 -
                Math.round(starCount)
            );

    }


    if (rating) {

        rating.textContent =
            "(" +
            (
                Number(
                    product.rating
                ) || 5
            ).toFixed(1) +
            ")";

    }


    if (price) {

        price.textContent =
            "Rs. " +
            finalPrice.toLocaleString();

    }


    var onSale =

        product.salePrice &&
        Number(product.salePrice) > 0 &&
        Number(product.salePrice) <
        Number(product.price);


    if (oldPrice) {

        oldPrice.textContent =
            onSale
                ? "Rs. " +
                  Number(
                      product.price
                  ).toLocaleString()
                : "";


        oldPrice.style.display =
            onSale
                ? "inline"
                : "none";

    }


    if (saleLabel) {

        saleLabel.textContent =
            onSale
                ? (
                    product.badge ||
                    "SALE"
                  )
                : "";


        saleLabel.style.display =
            onSale
                ? "inline-block"
                : "none";

    }


    if (desc) {

        desc.textContent =
            product.description ||
            "";

    }


    var stockNumber =
        Number(product.stock) || 0;


    if (stock) {

        stock.setAttribute(
            "data-stock",
            stockNumber
        );


        stock.textContent =
            stockNumber > 0
                ? stockNumber +
                  " items in stock"
                : "Out of stock";

    }


    if (colors) {

        colors.textContent =
            product.colors ||
            "—";

    }


    if (qty) {

        if (
            qty.tagName === "INPUT" ||
            qty.tagName === "SELECT"
        ) {

            qty.value = 1;

        } else {

            qty.textContent = "1";

        }

    }


    /* SIZES */

    if (sizes) {

        sizes.innerHTML = "";

        var sizeList =
            Array.isArray(product.sizes)
                ? product.sizes
                : [];


        if (sizeList.length === 0) {

            sizes.innerHTML =
                "<span class='no-size'>One Size</span>";

        } else {

            sizeList.forEach(
                function(size) {

                    var button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.textContent =
                        size;


                    button.onclick =
                        function() {

                            selectSize(
                                button
                            );

                        };


                    sizes.appendChild(
                        button
                    );

                }
            );

        }

    }


    /* PRODUCT IMAGES */

    var imageList =

        Array.isArray(product.images) &&
        product.images.length

            ? product.images

            : [product.image];


    imageList =
        imageList.filter(
            Boolean
        );


    if (mainImage) {

        mainImage.src =
            imageList[0] || "";


        mainImage.alt =
            product.name ||
            "ZUNVERO Product";

    }


    if (thumbnails) {

        thumbnails.innerHTML =
            "";


        imageList.forEach(
            function(src, index) {

                var img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    src;


                img.alt =
                    product.name ||
                    "Product image";


                img.className =
                    index === 0
                        ? "active"
                        : "";


                img.onclick =
                    function() {

                        if (mainImage) {

                            mainImage.src =
                                src;

                        }


                        thumbnails
                            .querySelectorAll(
                                "img"
                            )
                            .forEach(
                                function(item) {

                                    item.classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                        img.classList.add(
                            "active"
                        );

                    };


                thumbnails.appendChild(
                    img
                );

            }
        );

    }


    var addButton =
        document.getElementById(
            "productAddButton"
        );


    if (addButton) {

        addButton.disabled =
            stockNumber <= 0;


        addButton.textContent =
            stockNumber > 0
                ? "ADD TO CART"
                : "OUT OF STOCK";

    }

}


/* ADD PRODUCT TO CART */

function addProductToCart() {

    if (!currentZunveroProduct) {

        currentZunveroProduct =
            getProductFromUrl();

    }


    var product =
        currentZunveroProduct;


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    var stock =
        Number(product.stock) || 0;


    if (stock <= 0) {

        alert(
            "This product is out of stock."
        );

        return;

    }


    var sizes =
        Array.isArray(product.sizes)
            ? product.sizes
            : [];


    if (
        sizes.length > 0 &&
        !selectedSize
    ) {

        alert(
            "Please select a size."
        );

        return;

    }


    var price =

        product.salePrice &&
        Number(product.salePrice) > 0 &&
        Number(product.salePrice) <
        Number(product.price)

            ? Number(product.salePrice)

            : Number(product.price);


    addToCart(
        product.name,
        price,
        product.image,
        selectedSize,
        productQty
    );

}


/* WHATSAPP PRODUCT ORDER */

function orderProduct() {

    if (!currentZunveroProduct) {

        currentZunveroProduct =
            getProductFromUrl();

    }


    var product =
        currentZunveroProduct;


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    var stock =
        Number(product.stock) || 0;


    if (stock <= 0) {

        alert(
            "This product is out of stock."
        );

        return;

    }


    var sizes =
        Array.isArray(product.sizes)
            ? product.sizes
            : [];


    if (
        sizes.length > 0 &&
        !selectedSize
    ) {

        alert(
            "Please select a size."
        );

        return;

    }


    var price =

        product.salePrice &&
        Number(product.salePrice) > 0 &&
        Number(product.salePrice) <
        Number(product.price)

            ? Number(product.salePrice)

            : Number(product.price);


    var total =
        price * productQty;


    var message =

        "Assalam o Alaikum ZUNVERO\n\n" +

        "I want to order:\n\n" +

        "Product: " +
        product.name +

        "\nQuantity: " +
        productQty;


    if (selectedSize) {

        message +=
            "\nSize: " +
            selectedSize;

    }


    message +=

        "\nPrice: Rs. " +
        price +

        "\nTotal: Rs. " +
        total +

        "\n\nPlease confirm my order.";


    var phone =
        "923714696172";


    window.open(

        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
            message
        ),

        "_blank"

    );

}


/* =====================================================
   HOMEPAGE PRODUCT CARDS
   ===================================================== */

function setupProductCards() {

    var cards =
        document.querySelectorAll(
            "[data-product-id]"
        );


    cards.forEach(
        function(card) {

            var productId =
                card.getAttribute(
                    "data-product-id"
                );


            if (!productId) {
                return;
            }


            card.style.cursor =
                "pointer";


            card.addEventListener(
                "click",
                function(event) {

                    var target =
                        event.target;


                    if (
                        target.closest(
                            "button"
                        ) ||
                        target.closest(
                            "a"
                        )
                    ) {

                        return;

                    }


                    window.location.href =
                        "product.html?id=" +
                        encodeURIComponent(
                            productId
                        );

                }
            );

        }
    );

}


/* =====================================================
   WISHLIST
   ===================================================== */

function getWishlist() {

    return JSON.parse(
        localStorage.getItem(
            "zunveroWishlist"
        )
    ) || [];

}


function saveWishlist(items) {

    localStorage.setItem(
        "zunveroWishlist",
        JSON.stringify(items)
    );

}


function toggleWishlist(
    name,
    price,
    image
) {

    var wishlist =
        getWishlist();


    var existing =
        wishlist.find(
            function(item) {

                return item.name ===
                       name;

            }
        );


    if (existing) {

        wishlist =
            wishlist.filter(
                function(item) {

                    return item.name !==
                           name;

                }
            );


        alert(
            "Removed from wishlist."
        );

    } else {

        wishlist.push({

            name: name,

            price: Number(price) || 0,

            image: image || ""

        });


        alert(
            "Added to wishlist."
        );

    }


    saveWishlist(
        wishlist
    );


    updateWishlistCount();

}


function updateWishlistCount() {

    var wishlist =
        getWishlist();


    var count =
        document.getElementById(
            "wishlistCount"
        );


    if (count) {

        count.textContent =
            wishlist.length;

    }

}


/* =====================================================
   WISHLIST DISPLAY
   ===================================================== */

function showWishlist() {

    var container =
        document.getElementById(
            "wishlistItems"
        );


    if (!container) {
        return;
    }


    var wishlist =
        getWishlist();


    container.innerHTML =
        "";


    if (wishlist.length === 0) {

        container.innerHTML =

            "<div class='empty-cart'>" +

            "<h2>Your Wishlist Is Empty</h2>" +

            "<p>Save your favourite ZUNVERO products here.</p>" +

            "</div>";

        return;

    }


    wishlist.forEach(
        function(item, index) {

            container.innerHTML +=

                "<div class='wishlist-item'>" +

                "<img src='" +
                item.image +
                "' alt='" +
                item.name +
                "'>" +

                "<div>" +

                "<h3>" +
                item.name +
                "</h3>" +

                "<p>Rs. " +
                Number(
                    item.price
                ).toLocaleString() +
                "</p>" +

                "<button onclick='addToCart(" +
                JSON.stringify(item.name) +
                "," +
                Number(item.price) +
                "," +
                JSON.stringify(item.image) +
                ")'>" +

                "ADD TO CART" +

                "</button>" +

                "<button onclick='removeWishlist(" +
                index +
                ")'>" +

                "REMOVE" +

                "</button>" +

                "</div>" +

                "</div>";

        }
    );

}


function removeWishlist(index) {

    var wishlist =
        getWishlist();


    wishlist.splice(
        index,
        1
    );


    saveWishlist(
        wishlist
    );


    showWishlist();

    updateWishlistCount();

}


/* =====================================================
   SEARCH SYSTEM
   ===================================================== */

function openSearch() {

    var box =
        document.getElementById(
            "searchBox"
        );


    if (!box) {
        return;
    }


    box.classList.toggle(
        "active"
    );


    if (
        box.classList.contains(
            "active"
        )
    ) {

        var input =
            document.getElementById(
                "searchInput"
            );


        if (input) {

            input.focus();

        }

    }

}


function searchProducts() {

    var input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {
        return;
    }


    var query =
        input.value
            .toLowerCase()
            .trim();


    var cards =
        document.querySelectorAll(
            "[data-product-id]"
        );


    cards.forEach(
        function(card) {

            var text =
                card.textContent
                    .toLowerCase();


            var category =
                (
                    card.getAttribute(
                        "data-category"
                    ) || ""
                ).toLowerCase();


            var match =
                !query ||
                text.includes(query) ||
                category.includes(query);


            card.style.display =
                match
                    ? ""
                  : "none";

        }
    );

}


/* =====================================================
   CATEGORY FILTER
   ===================================================== */

function filterCategory(category) {

    var cards =
        document.querySelectorAll(
            "[data-product-id]"
        );


    cards.forEach(
        function(card) {

            var cardCategory =
                (
                    card.getAttribute(
                        "data-category"
                    ) || ""
                ).toLowerCase();


            if (
                !category ||
                category === "all"
            ) {

                card.style.display =
                    "";

                return;

            }


            var wanted =
                category
                    .toLowerCase()
                    .trim();


            card.style.display =
                cardCategory.includes(
                    wanted
                )
                    ? ""
                    : "none";

        }
    );

}/* =====================================================
   LOGIN / SIGNUP / ACCOUNT SYSTEM
   ===================================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("zunveroUsers")
    ) || [];

}


function saveUsers(users) {

    localStorage.setItem(
        "zunveroUsers",
        JSON.stringify(users)
    );

}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "zunveroCurrentUser"
        )
    ) || null;

}


function saveCurrentUser(user) {

    localStorage.setItem(
        "zunveroCurrentUser",
        JSON.stringify(user)
    );

}


function logoutUser() {

    localStorage.removeItem(
        "zunveroCurrentUser"
    );

    window.location.href =
        "index.html";

}


/* =====================================================
   SIGN UP
   ===================================================== */

function signupUser() {

    var nameElement =
        document.getElementById(
            "signupName"
        );


    var emailElement =
        document.getElementById(
            "signupEmail"
        );


    var passwordElement =
        document.getElementById(
            "signupPassword"
        );


    var confirmElement =
        document.getElementById(
            "signupConfirmPassword"
        );


    if (
        !nameElement ||
        !emailElement ||
        !passwordElement
    ) {

        alert(
            "Signup form not found."
        );

        return;

    }


    var name =
        nameElement.value.trim();


    var email =
        emailElement.value
            .trim()
            .toLowerCase();


    var password =
        passwordElement.value;


    var confirmPassword =
        confirmElement
            ? confirmElement.value
            : password;


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;

    }


    if (
        password.length < 6
    ) {

        alert(
            "Password must be at least 6 characters."
        );

        return;

    }


    if (
        password !==
        confirmPassword
    ) {

        alert(
            "Passwords do not match."
        );

        return;

    }


    var users =
        getUsers();


    var existing =
        users.find(
            function(user) {

                return user.email ===
                       email;

            }
        );


    if (existing) {

        alert(
            "An account with this email already exists."
        );

        return;

    }


    var user = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        createdAt:
            new Date().toISOString()

    };


    users.push(
        user
    );


    saveUsers(
        users
    );


    saveCurrentUser({

        id: user.id,

        name: user.name,

        email: user.email

    });


    alert(
        "Account created successfully!"
    );


    window.location.href =
        "account.html";

}


/* =====================================================
   LOGIN
   ===================================================== */

function loginUser() {

    var emailElement =
        document.getElementById(
            "loginEmail"
        );


    var passwordElement =
        document.getElementById(
            "loginPassword"
        );


    if (
        !emailElement ||
        !passwordElement
    ) {

        alert(
            "Login form not found."
        );

        return;

    }


    var email =
        emailElement.value
            .trim()
            .toLowerCase();


    var password =
        passwordElement.value;


    if (!email || !password) {

        alert(
            "Please enter email and password."
        );

        return;

    }


    var users =
        getUsers();


    var user =
        users.find(
            function(item) {

                return (
                    item.email === email &&
                    item.password === password
                );

            }
        );


    if (!user) {

        alert(
            "Incorrect email or password."
        );

        return;

    }


    saveCurrentUser({

        id: user.id,

        name: user.name,

        email: user.email

    });


    alert(
        "Login successful!"
    );


    window.location.href =
        "account.html";

}


/* =====================================================
   ACCOUNT PAGE
   ===================================================== */

function loadAccount() {

    var user =
        getCurrentUser();


    var nameElement =
        document.getElementById(
            "accountName"
        );


    var emailElement =
        document.getElementById(
            "accountEmail"
        );


    if (!user) {

        if (nameElement) {

            nameElement.textContent =
                "Guest";

        }


        if (emailElement) {

            emailElement.textContent =
                "";

        }

        return;

    }


    if (nameElement) {

        nameElement.textContent =
            user.name || "";

    }


    if (emailElement) {

        emailElement.textContent =
            user.email || "";

    }

}


/* =====================================================
   AUTH UI
   ===================================================== */

function updateAuthUI() {

    var user =
        getCurrentUser();


    var loginLinks =
        document.querySelectorAll(
            ".login-link"
        );


    var accountLinks =
        document.querySelectorAll(
            ".account-link"
        );


    var logoutButtons =
        document.querySelectorAll(
            ".logout-btn"
        );


    loginLinks.forEach(
        function(element) {

            element.style.display =
                user
                    ? "none"
                    : "";

        }
    );


    accountLinks.forEach(
        function(element) {

            element.style.display =
                user
                    ? ""
                    : "none";

        }
    );


    logoutButtons.forEach(
        function(element) {

            element.style.display =
                user
                    ? ""
                    : "none";

        }
    );

}


/* =====================================================
   CHECKOUT SYSTEM
   ===================================================== */

function getCheckoutTotal() {

    var cart =
        getCart();


    var total = 0;


    cart.forEach(
        function(item) {

            total +=
                Number(item.price) *
                Number(item.quantity);

        }
    );


    return total;

}


/* SHOW CHECKOUT */

function showCheckout() {

    var cart =
        getCart();


    var container =
        document.getElementById(
            "checkoutItems"
        );


    var totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (cart.length === 0) {

        container.innerHTML =

            "<div class='empty-cart'>" +

            "<h2>Your Cart Is Empty</h2>" +

            "<a href='index.html'>SHOP NOW</a>" +

            "</div>";


        if (totalElement) {

            totalElement.textContent =
                "Rs. 0";

        }

        return;

    }


    var total = 0;


    cart.forEach(
        function(item) {

            var itemTotal =
                Number(item.price) *
                Number(item.quantity);


            total +=
                itemTotal;


            container.innerHTML +=

                "<div class='checkout-item'>" +

                "<div>" +

                "<strong>" +
                item.name +
                "</strong>" +

                (
                    item.size
                        ? "<p>Size: " +
                          item.size +
                          "</p>"
                        : ""
                ) +

                "<p>Qty: " +
                item.quantity +
                "</p>" +

                "</div>" +

                "<strong>Rs. " +
                itemTotal.toLocaleString() +
                "</strong>" +

                "</div>";

        }
    );


    if (totalElement) {

        totalElement.textContent =
            "Rs. " +
            total.toLocaleString();

    }

}


/* =====================================================
   CREATE WHATSAPP ORDER
   ===================================================== */

function createZunveroOrder() {

    var nameEl =
        document.getElementById("customerName") ||
        document.getElementById("checkoutName") ||
        document.getElementById("name");

    var phoneEl =
        document.getElementById("customerPhone") ||
        document.getElementById("checkoutPhone") ||
        document.getElementById("phone");

    var addressEl =
        document.getElementById("customerAddress") ||
        document.getElementById("checkoutAddress") ||
        document.getElementById("address");

    var cityEl =
        document.getElementById("customerCity") ||
        document.getElementById("checkoutCity") ||
        document.getElementById("city");


    var name = nameEl ? nameEl.value.trim() : "";
    var phone = phoneEl ? phoneEl.value.trim() : "";
    var address = addressEl ? addressEl.value.trim() : "";
    var city = cityEl ? cityEl.value.trim() : "";


    if (!name) {
        alert("Please enter your name.");
        return false;
    }

    if (!phone) {
        alert("Please enter your phone number.");
        return false;
    }

    if (!address) {
        alert("Please enter your address.");
        return false;
    }


    var cart = getCart();


    if (!cart.length) {
        alert("Your cart is empty.");
        return false;
    }


    var total = cart.reduce(function(sum, item) {

        return sum +
            ((Number(item.price) || 0) *
            (Number(item.quantity) || 1));

    }, 0);


    var orders = getOrders();


    var order = {

        id:
            "ZV-" +
            Date.now().toString().slice(-8),

        customer: {
            name: name,
            phone: phone,
            address: address,
            city: city
        },

        items: cart,

        total: total,

        status: "Pending",

        date: new Date().toLocaleString(),

        createdAt: Date.now()

    };


    orders.unshift(order);

    saveOrders(orders);


    /* =========================
       WHATSAPP MESSAGE
    ========================= */

    var message =
        "🛍️ ZUNVERO ORDER\n\n" +

        "Order ID: " + order.id + "\n" +

        "Name: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Address: " + address + "\n" +

        (city ? "City: " + city + "\n" : "") +

        "\nProducts:\n";


    cart.forEach(function(item) {

        message +=
            "• " +
            item.name +
            " × " +
            (item.quantity || 1) +
            (item.size
                ? " | Size: " + item.size
                : "") +
            "\n";

    });


    message +=
        "\nTotal: Rs. " +
        total.toLocaleString() +
        "\n\nPlease confirm my order.";


    var whatsappURL =
        "https://wa.me/923714696172?text=" +
        encodeURIComponent(message);


    /* =========================
       SAVE LAST ORDER
    ========================= */

    localStorage.setItem(
        "zunveroLastOrder",
        JSON.stringify(order)
    );


    /* Clear cart */

    localStorage.removeItem("zunveroCart");

    updateCartCount();


    /* =========================
       OPEN WHATSAPP FIRST
    ========================= */

    var whatsappWindow =
        window.open(
            whatsappURL,
            "923714696172"
        );


    /*
       If browser blocks new tab,
       open WhatsApp in same page.
    */

    if (!whatsappWindow) {

        window.location.href =
            whatsappURL;

        return true;

    }


    /* =========================
       THEN OPEN CONFIRMATION
    ========================= */

    setTimeout(function() {

        window.location.href =
            "confirmation.html";

    }, 700);


    return true;

}


/* =====================================================
   PLACE CHECKOUT ORDER
   ===================================================== */

function placeCheckoutOrder() {

    createZunveroOrder();

}


/* =====================================================
   CONFIRMATION PAGE
   ===================================================== */

function loadConfirmation() {

    var order =
        JSON.parse(
            localStorage.getItem(
                "zunveroLastOrder"
            )
        );


    if (!order) {
        return;
    }


    var name =
        document.getElementById(
            "confirmationName"
        );


    var total =
        document.getElementById(
            "confirmationTotal"
        );


    if (name) {

        name.textContent =
            order.customerName ||
            "";

    }


    if (total) {

        total.textContent =
            "Rs. " +
            Number(
                order.total || 0
            ).toLocaleString();

    }

}


/* =====================================================
   MOBILE MENU
   ===================================================== */

function toggleMenu() {

    var menu =
        document.querySelector(
            ".nav-menu"
        );


    if (!menu) {
        return;
    }


    menu.classList.toggle(
        "active"
    );

}


/* CLOSE MOBILE MENU */

function closeMenu() {

    var menu =
        document.querySelector(
            ".nav-menu"
        );


    if (menu) {

        menu.classList.remove(
            "active"
        );

    }

}/* =====================================================
   HEADER / NAVIGATION
   ===================================================== */

function goToCart() {

    window.location.href =
        "cart.html";

}


function goToCheckout() {

    var cart =
        getCart();


    if (!cart.length) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


/* =====================================================
   PRODUCT CARD BUTTONS
   ===================================================== */

function quickAddProduct(id) {

    var products =
        getProducts();


    var product =
        products.find(
            function(item) {

                return String(item.id) ===
                       String(id);

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    var price =

        product.salePrice &&
        Number(product.salePrice) > 0 &&
        Number(product.salePrice) <
        Number(product.price)

            ? Number(product.salePrice)

            : Number(product.price);


    var sizes =
        Array.isArray(product.sizes)
            ? product.sizes
            : [];


    if (sizes.length > 0) {

        window.location.href =
            "product.html?id=" +
            encodeURIComponent(
                product.id
            );

        return;

    }


    addToCart(
        product.name,
        price,
        product.image,
        "",
        1
    );

}


/* =====================================================
   PRODUCT CARD — OPEN
   ===================================================== */

function openProduct(id) {

    if (!id) {
        return;
    }


    window.location.href =
        "product.html?id=" +
        encodeURIComponent(id);

}


/* =====================================================
   LOGIN / SIGNUP FORM HELPERS
   ===================================================== */

function togglePassword(inputId) {

    var input =
        document.getElementById(
            inputId
        );


    if (!input) {
        return;
    }


    input.type =
        input.type === "password"
            ? "text"
            : "password";

}


/* =====================================================
   CONTACT FORM
   ===================================================== */

function submitContactForm() {

    var nameElement =
        document.getElementById(
            "contactName"
        );


    var emailElement =
        document.getElementById(
            "contactEmail"
        );


    var messageElement =
        document.getElementById(
            "contactMessage"
        );


    var name =
        nameElement
            ? nameElement.value.trim()
            : "";


    var email =
        emailElement
            ? emailElement.value.trim()
            : "";


    var message =
        messageElement
            ? messageElement.value.trim()
            : "";


    if (!name || !email || !message) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    var whatsappMessage =

        "Assalam o Alaikum ZUNVERO\n\n" +

        "CONTACT MESSAGE\n\n" +

        "Name: " +
        name +

        "\nEmail: " +
        email +

        "\nMessage: " +
        message;


    window.open(

        "https://wa.me/923714696172?text=" +
        encodeURIComponent(
            whatsappMessage
        ),

        "_blank"

    );

}


/* =====================================================
   NEWSLETTER
   ===================================================== */

function subscribeNewsletter() {

    var input =
        document.getElementById(
            "newsletterEmail"
        );


    if (!input) {
        return;
    }


    var email =
        input.value.trim();


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;

    }


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        alert(
            "Please enter a valid email."
        );

        return;

    }


    var subscribers =
        JSON.parse(
            localStorage.getItem(
                "zunveroSubscribers"
            )
        ) || [];


    if (
        subscribers.includes(
            email.toLowerCase()
        )
    ) {

        alert(
            "You are already subscribed."
        );

        return;

    }


    subscribers.push(
        email.toLowerCase()
    );


    localStorage.setItem(
        "zunveroSubscribers",
        JSON.stringify(
            subscribers
        )
    );


    input.value =
        "";


    alert(
        "Thank you for subscribing to ZUNVERO!"
    );

}


/* =====================================================
   SCROLL TO TOP
   ===================================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   CATEGORY LINKS
   ===================================================== */

function setupCategoryLinks() {

    var links =
        document.querySelectorAll(
            ".category-card"
        );


    links.forEach(
        function(link) {

            link.addEventListener(
                "click",
                function() {

                    closeMenu();

                }
            );

        }
    );

}


/* =====================================================
   HOME PRODUCT DISPLAY
   ===================================================== */

function renderHomeProducts() {

    var products =
        getProducts();


    var containers =
        document.querySelectorAll(
            "[data-products-container]"
        );


    containers.forEach(
        function(container) {

            var category =
                container.getAttribute(
                    "data-products-container"
                );


            var filtered =
                products.filter(
                    function(product) {

                        if (
                            !category ||
                            category === "all"
                        ) {

                            return true;

                        }


                        return (
                            product.category || ""
                        )
                        .toLowerCase()
                        .includes(
                            category.toLowerCase()
                        );

                    }
                );


            container.innerHTML =
                "";


            filtered.forEach(
                function(product) {

                    var price =

                        product.salePrice &&
                        Number(product.salePrice) > 0 &&
                        Number(product.salePrice) <
                        Number(product.price)

                            ? Number(product.salePrice)

                            : Number(product.price);


                    var oldPrice =

                        product.salePrice &&
                        Number(product.salePrice) > 0 &&
                        Number(product.salePrice) <
                        Number(product.price)

                            ? "<del>Rs. " +
                              Number(
                                  product.price
                              ).toLocaleString() +
                              "</del>"

                            : "";


                    container.innerHTML +=

                        "<div class='product-card' " +
                        "data-product-id='" +
                        product.id +
                        "' " +
                        "onclick='openProduct(" +
                        product.id +
                        ")'>" +

                        "<div class='product-image'>" +

                        "<img src='" +
                        product.image +
                        "' alt='" +
                        product.name +
                        "'>" +

                        (
                            product.badge
                                ? "<span class='product-badge'>" +
                                  product.badge +
                                  "</span>"
                                : ""
                        ) +

                        "</div>" +

                        "<div class='product-info'>" +

                        "<h3>" +
                        product.name +
                        "</h3>" +

                        "<div class='product-rating'>★ ★ ★ ★ ★</div>" +

                        "<p class='product-price'>" +

                        oldPrice +

                        " Rs. " +
                        price.toLocaleString() +

                        "</p>" +

                        "</div>" +

                        "</div>";

                }
            );

        }
    );


    setupProductCards();

}


/* =====================================================
   LOAD HEADER DATA
   ===================================================== */

function loadHeaderData() {

    updateCartCount();

    updateWishlistCount();

    updateAuthUI();

}


/* =====================================================
   PAGE DETECTION
   ===================================================== */

function getPageName() {

    var path =
        window.location.pathname;


    var parts =
        path.split("/");


    return (
        parts[
            parts.length - 1
        ] || "index.html"
    ).toLowerCase();

}


/* =====================================================
   PAGE INITIALIZATION
   ===================================================== */

function initializeZunveroPage() {

    loadHeaderData();


    var page =
        getPageName();


    if (
        page === "index.html" ||
        page === ""
    ) {

        setupProductCards();

        setupCategoryLinks();

        renderHomeProducts();

    }


    if (
        page === "product.html"
    ) {

        loadProduct();

    }


    if (
        page === "cart.html"
    ) {

        showCart();

    }


    if (
        page === "checkout.html"
    ) {

        showCheckout();

    }


    if (
        page === "confirmation.html"
    ) {

        loadConfirmation();

    }


    if (
        page === "account.html"
    ) {

        loadAccount();

    }


    if (
        page === "admin.html"
    ) {

        showAdminProducts();

    }


    var searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }


    var newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                subscribeNewsletter();

            }
        );

    }

}


/* =====================================================
   DOM READY
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeZunveroPage();

    }
);/* =========================================================
   ZUNVERO — PART 5/5
   ADMIN ORDERS + ACCOUNT SYSTEM
========================================================= */


/* =========================
   ORDERS STORAGE
========================= */

function getOrders() {

    try {
        return JSON.parse(localStorage.getItem("zunveroOrders")) || [];
    } catch (error) {
        return [];
    }

}


function saveOrders(orders) {

    localStorage.setItem(
        "zunveroOrders",
        JSON.stringify(orders)
    );

}


/* =========================
   CREATE ORDER
========================= */

function createZunveroOrder() {

    var nameEl =
        document.getElementById("customerName") ||
        document.getElementById("checkoutName") ||
        document.getElementById("name");

    var phoneEl =
        document.getElementById("customerPhone") ||
        document.getElementById("checkoutPhone") ||
        document.getElementById("phone");

    var addressEl =
        document.getElementById("customerAddress") ||
        document.getElementById("checkoutAddress") ||
        document.getElementById("address");

    var cityEl =
        document.getElementById("customerCity") ||
        document.getElementById("checkoutCity") ||
        document.getElementById("city");


    var name = nameEl ? nameEl.value.trim() : "";
    var phone = phoneEl ? phoneEl.value.trim() : "";
    var address = addressEl ? addressEl.value.trim() : "";
    var city = cityEl ? cityEl.value.trim() : "";


    if (!name) {
        alert("Please enter your name.");
        return false;
    }

    if (!phone) {
        alert("Please enter your phone number.");
        return false;
    }

    if (!address) {
        alert("Please enter your address.");
        return false;
    }


    var cart = getCart();


    if (!cart.length) {
        alert("Your cart is empty.");
        return false;
    }


    var total = cart.reduce(function(sum, item) {

        return sum +
            ((Number(item.price) || 0) *
            (Number(item.quantity) || 1));

    }, 0);


    var orders = getOrders();


    var order = {

        id:
            "ZV-" +
            Date.now().toString().slice(-8),

        customer: {
            name: name,
            phone: phone,
            address: address,
            city: city
        },

        items: cart,

        total: total,

        status: "Pending",

        date: new Date().toLocaleString(),

        createdAt: Date.now()

    };


    orders.unshift(order);

    saveOrders(orders);


    /* WhatsApp message */

    var message =
        "🛍️ ZUNVERO ORDER\n\n" +

        "Order ID: " + order.id + "\n" +

        "Name: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Address: " + address + "\n" +

        (city ? "City: " + city + "\n" : "") +

        "\nProducts:\n";


    cart.forEach(function(item) {

        message +=
            "• " +
            item.name +
            " × " +
            (item.quantity || 1) +
            (item.size ? " | Size: " + item.size : "") +
            "\n";

    });


    message +=
        "\nTotal: Rs. " +
        total.toLocaleString() +
        "\n\nPlease confirm my order.";


    var whatsappURL =
        "https://wa.me/923714696172?text=" +
        encodeURIComponent(message);


    /* Clear cart */

    localStorage.removeItem("zunveroCart");

    updateCartCount();


    /* Save confirmation */

    localStorage.setItem(
        "zunveroLastOrder",
        JSON.stringify(order)
    );


    window.location.href =
        "confirmation.html";


    return true;

}


/* =========================
   PLACE CHECKOUT ORDER
========================= */

function placeCheckoutOrder(event) {

    if (event) {
        event.preventDefault();
    }

    var cart = getCart();

    if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return false;
    }


    var nameEl = document.getElementById("customerName");
    var phoneEl = document.getElementById("customerPhone");
    var addressEl = document.getElementById("customerAddress");
    var cityEl = document.getElementById("customerCity");


    if (!nameEl || !phoneEl || !addressEl || !cityEl) {

        alert("Checkout fields not found. Please refresh the page.");

        return false;
    }


    var name = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var address = addressEl.value.trim();
    var city = cityEl.value.trim();


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        city === ""
    ) {

        alert("Please fill all delivery information.");

        return false;
    }


    var total = 0;

    cart.forEach(function(item) {

        total +=
            Number(item.price || 0) *
            Number(item.quantity || 1);

    });


    /* CREATE ORDER */

    var order = {

        id:
            "ZUN-" +
            Date.now(),

        date:
            new Date().toLocaleString(),

        customer: {

            name: name,
            phone: phone,
            address: address,
            city: city

        },

        payment:
            "Cash on Delivery",

        items:
            cart.map(function(item) {

                return {

                    name: item.name,

                    price:
                        Number(item.price || 0),

                    quantity:
                        Number(item.quantity || 1),

                    image:
                        item.image || "",

                    size:
                        item.size || ""

                };

            }),

        total: total,

        status:
            "Pending"

    };


    /* SAVE ORDER FOR ADMIN */

    var orders = getOrders();

    orders.unshift(order);

    saveOrders(orders);


    /* WHATSAPP MESSAGE */

    var message =
        "Assalam o Alaikum ZUNVERO\n\n" +

        "NEW ORDER\n\n" +

        "Order ID: " +
        order.id +

        "\nCustomer Name: " +
        name +

        "\nPhone: " +
        phone +

        "\nAddress: " +
        address +

        "\nCity: " +
        city +

        "\nPayment: Cash on Delivery\n\n" +

        "ORDER DETAILS\n\n";


    cart.forEach(function(item) {

        var itemTotal =
            Number(item.price || 0) *
            Number(item.quantity || 1);


        message +=
            item.name +
            " x " +
            (item.quantity || 1);


        if (item.size) {

            message +=
                " | Size: " +
                item.size;

        }


        message +=
            " = Rs. " +
            itemTotal.toLocaleString() +
            "\n";

    });


    message +=
        "\nTotal: Rs. " +
        total.toLocaleString() +

        "\n\nOrder ID: " +
        order.id +

        "\n\nPlease confirm my order.";


    var whatsappURL =
        "https://wa.me/923714696172?text=" +
        encodeURIComponent(message);


    /* SAVE LAST ORDER */

    localStorage.setItem(
        "zunveroLastOrder",
        JSON.stringify(order)
    );


    /* CLEAR CART */

    localStorage.removeItem(
        "zunveroCart"
    );

    updateCartCount();


    /* OPEN WHATSAPP DIRECTLY */

    window.location.href =
        whatsappURL;


    return false;
}


/* =========================
   CONFIRMATION PAGE
========================= */

function loadConfirmation() {

    var orderData =
        localStorage.getItem("zunveroLastOrder");


    if (!orderData) {
        return;
    }


    var order;

    try {
        order = JSON.parse(orderData);
    } catch (error) {
        return;
    }


    var idEl =
        document.getElementById("confirmationOrderId");

    var nameEl =
        document.getElementById("confirmationName");

    var totalEl =
        document.getElementById("confirmationTotal");


    if (idEl) {
        idEl.textContent =
            order.id || "ZUNVERO";
    }


    if (nameEl) {
        nameEl.textContent =
            order.customer &&
            order.customer.name
                ? order.customer.name
                : "";
    }


    if (totalEl) {
        totalEl.textContent =
            "Rs. " +
            Number(order.total || 0).toLocaleString();
    }

}


/* =========================
   ADMIN ORDER PAGE
========================= */

function showAdminOrders() {

    var container =
        document.getElementById("adminOrdersList") ||
        document.getElementById("ordersList") ||
        document.querySelector("[data-admin-orders]");


    if (!container) {
        return;
    }


    var orders = getOrders();


    if (!orders.length) {

        container.innerHTML =
            '<div class="empty-state">' +
            '<h3>No Orders Yet</h3>' +
            '<p>Customer orders will appear here.</p>' +
            '</div>';

        updateOrderStats();

        return;
    }


    container.innerHTML =
        orders.map(function(order, index) {

            var customer =
                order.customer || {};

            var items =
                order.items || [];


            var productsHTML =
                items.map(function(item) {

                    return (
                        '<div class="admin-order-product">' +

                        '<span>' +
                        escapeAdminText(item.name || "Product") +
                        '</span>' +

                        '<span>' +
                        '× ' +
                        Number(item.quantity || 1) +

                        (item.size
                            ? ' | ' + escapeAdminText(item.size)
                            : '') +

                        '</span>' +

                        '</div>'
                    );

                }).join("");


            return (

                '<div class="admin-order-card" data-order-index="' +
                index +
                '">' +

                '<div class="admin-order-header">' +

                '<div>' +

                '<strong>' +
                escapeAdminText(order.id || "Order") +
                '</strong>' +

                '<small>' +
                escapeAdminText(order.date || "") +
                '</small>' +

                '</div>' +

                '<span class="order-status ' +
                String(order.status || "Pending")
                    .toLowerCase() +
                '">' +

                escapeAdminText(order.status || "Pending") +

                '</span>' +

                '</div>' +


                '<div class="admin-order-customer">' +

                '<p><b>Name:</b> ' +
                escapeAdminText(customer.name || "") +
                '</p>' +

                '<p><b>Phone:</b> ' +
                escapeAdminText(customer.phone || "") +
                '</p>' +

                '<p><b>Address:</b> ' +
                escapeAdminText(customer.address || "") +
                '</p>' +

                (customer.city
                    ? '<p><b>City:</b> ' +
                      escapeAdminText(customer.city) +
                      '</p>'
                    : '') +

                '</div>' +


                '<div class="admin-order-products">' +
                productsHTML +
                '</div>' +


                '<div class="admin-order-footer">' +

                '<strong>' +
                'Total: Rs. ' +
                Number(order.total || 0).toLocaleString() +
                '</strong>' +


                '<div class="admin-order-actions">' +

                '<select onchange="changeOrderStatus(' +
                index +
                ', this.value)">' +

                '<option value="Pending" ' +
                (order.status === "Pending"
                    ? "selected"
                    : "") +
                '>Pending</option>' +

                '<option value="Confirmed" ' +
                (order.status === "Confirmed"
                    ? "selected"
                    : "") +
                '>Confirmed</option>' +

                '<option value="Shipped" ' +
                (order.status === "Shipped"
                    ? "selected"
                    : "") +
                '>Shipped</option>' +

                '<option value="Delivered" ' +
                (order.status === "Delivered"
                    ? "selected"
                    : "") +
                '>Delivered</option>' +

                '<option value="Cancelled" ' +
                (order.status === "Cancelled"
                    ? "selected"
                    : "") +
                '>Cancelled</option>' +

                '</select>' +


                '<button type="button" onclick="deleteAdminOrder(' +
                index +
                ')">' +

                'Delete' +

                '</button>' +

                '</div>' +

                '</div>' +

                '</div>'

            );

        }).join("");


    updateOrderStats();

}


/* =========================
   SAFE ADMIN TEXT
========================= */

function escapeAdminText(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================
   ORDER STATS
========================= */

function updateOrderStats() {

    var orders = getOrders();


    var total =
        orders.length;


    var pending =
        orders.filter(function(order) {

            return order.status === "Pending";

        }).length;


    var confirmed =
        orders.filter(function(order) {

            return order.status === "Confirmed";

        }).length;


    var shipped =
        orders.filter(function(order) {

            return order.status === "Shipped";

        }).length;


    var delivered =
        orders.filter(function(order) {

            return order.status === "Delivered";

        }).length;


    var cancelled =
        orders.filter(function(order) {

            return order.status === "Cancelled";

        }).length;


    var totalRevenue =
        orders
            .filter(function(order) {

                return order.status !== "Cancelled";

            })
            .reduce(function(sum, order) {

                return sum +
                    Number(order.total || 0);

            }, 0);


    var map = {

        totalOrders: total,
        pendingOrders: pending,
        confirmedOrders: confirmed,
        shippedOrders: shipped,
        deliveredOrders: delivered,
        cancelledOrders: cancelled,
        totalRevenue: totalRevenue

    };


    Object.keys(map).forEach(function(key) {

        var element =
            document.getElementById(key);

        if (!element) {
            return;
        }


        if (key === "totalRevenue") {

            element.textContent =
                "Rs. " +
                Number(map[key])
                    .toLocaleString();

        } else {

            element.textContent =
                map[key];

        }

    });

}


/* =========================
   CHANGE ORDER STATUS
========================= */

function changeOrderStatus(index, status) {

    var orders = getOrders();


    if (!orders[index]) {
        return;
    }


    orders[index].status =
        status;


    saveOrders(orders);

    showAdminOrders();

}


/* =========================
   DELETE ORDER
========================= */

function deleteAdminOrder(index) {

    var orders = getOrders();


    if (!orders[index]) {
        return;
    }


    var confirmed =
        confirm(
            "Delete this order permanently?"
        );


    if (!confirmed) {
        return;
    }


    orders.splice(index, 1);

    saveOrders(orders);

    showAdminOrders();

}


/* =========================
   FILTER ORDERS
========================= */

function filterAdminOrders() {

    var input =
        document.getElementById("orderSearch") ||
        document.getElementById("adminOrderSearch");


    var filter =
        input
            ? input.value.toLowerCase().trim()
            : "";


    var cards =
        document.querySelectorAll(
            ".admin-order-card"
        );


    cards.forEach(function(card) {

        var text =
            card.textContent.toLowerCase();


        card.style.display =
            !filter || text.includes(filter)
                ? ""
                : "none";

    });

}


/* =========================
   ACCOUNT PAGE
========================= */

function showAccount() {

    var user =
        getCurrentUser();


    var nameElements =
        document.querySelectorAll(
            "[data-account-name]"
        );


    var emailElements =
        document.querySelectorAll(
            "[data-account-email]"
        );


    nameElements.forEach(function(el) {

        el.textContent =
            user && user.name
                ? user.name
                : "Guest";

    });


    emailElements.forEach(function(el) {

        el.textContent =
            user && user.email
                ? user.email
                : "";

    });


    var loginSection =
        document.getElementById("accountLogin");


    var profileSection =
        document.getElementById("accountProfile");


    if (user) {

        if (loginSection) {
            loginSection.style.display =
                "none";
        }


        if (profileSection) {
            profileSection.style.display =
                "";
        }

    } else {

        if (loginSection) {
            loginSection.style.display =
                "";
        }


        if (profileSection) {
            profileSection.style.display =
                "none";
        }

    }

}


/* =========================
   ACCOUNT LOGOUT
========================= */

function logoutAccount() {

    logoutUser();

}


/* =========================
   ADMIN PAGE INITIALIZATION
========================= */

function initializeAdminOrdersPage() {

    showAdminOrders();

    updateOrderStats();


    var searchInput =
        document.getElementById("orderSearch") ||
        document.getElementById("adminOrderSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterAdminOrders
        );

    }

}


/* =========================
   CONFIRMATION INITIALIZATION
========================= */

function initializeConfirmationPage() {

    loadConfirmation();

}


/* =========================
   FINAL PAGE CHECK
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        var page =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (page === "admin-orders.html") {

            initializeAdminOrdersPage();

        }


        if (page === "confirmation.html") {

            initializeConfirmationPage();

        }


        if (page === "account.html") {

            showAccount();

        }

    }
);