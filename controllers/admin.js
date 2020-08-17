const Product = require("../models/product");

exports.getAddProduct = (req, res, next)=>{
    res.render("admin/edit-product", {
        pageTitle: "Add Product", 
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true, 
        editing: false
    });
};

exports.postAddProduct = (req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products"
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editing = req.query.edit;
    const product = Product.findById(productId, (product) => {
        res.render("admin/edit-product", {
            pageTitle: "Edit Product", 
            path: "/admin/edit-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            product: product,
            editing: editing
        });
    });
    
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updateImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(productId, updatedTitle, updateImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect("/admin/products");
}