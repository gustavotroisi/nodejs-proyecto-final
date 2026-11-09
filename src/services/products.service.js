import {
  getProducts,
  getProductById,
  saveProduct,
  deleteProduct,
} from "../models/products.models.js";

export const getAllProductsService = async (category) => {
  const products = await getProducts();
  if (category) {
    const products_q = await products.filter(
      (product) => product.category == category,
    );
    return products_q;
  }

  return products;
};

export const getProductByIdService = async (id) => {
  const product = await getProductById(id);
  return product;
};

export const createProductService = async (productData) => {
  const newProduct = {
    //id: products.length + 1,
    category: productData.category,
    name: productData.name,
    stock: productData.stock,
    price: productData.price,
  };
  const savedProduct = await saveProduct(newProduct);
  console.log("Producto creado:", savedProduct);
  return savedProduct;
};

export const deleteProductService = async (id) => {
 

  //revisa si existe el producto antes de eliminarlo
  const productToRemove = await getProductById(id);
  if (!productToRemove) {
    throw new Error(`Producto con ID ${id} no encontrado`);
  }
  
  const removedProduct = await deleteProduct(id);
  return removedProduct;
};
