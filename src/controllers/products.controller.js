import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  deleteProductService,
} from "../services/products.service.js";

export async function getAllProducts(req, res) {
  const category = req.query.category;
  try {
    const products = await getAllProductsService(category);
    if (products.length > 0) {
      res.send({
        message: `${products.length} productos encontrados`,
        data: products,
      });
    } else {
      res.status(404).send({
        message: "No se encontraron productos",
      });
    }
  } catch (error) {
    console.log("ERROR INTERNO ", error);
    res.status(500).send({
      message: "Error interno",
    });
  }
}

export async function getProductById(req, res) {
  const id = req.params.id;
  if (id) {
    try {
      const product = await getProductByIdService(id);
console.log("Producto encontrado:", product);
      if (product) {
        res.status(200).json({
          message: "Producto encontrado",
          data: product,
        });
      } else {
        res.status(404).json({
          message: "Producto no encontrado",
        });
      }
    } catch (error) {
      console.log("ERROR INTERNO ", error);
      res.status(404).json({
        message: "Error al obtener el producto",
      });
    }
  } else {
    res.status(400).send({
      //400: Bad Request
      message: "Falta el ID del producto",
    });
  }
}


export async function createProduct(req, res) {

  const product = req.body;
  
  if (!product) { 
      return res.status(400).json({
      message: "Falta enviar los datos del producto",
    });
  }

  const { category, name, stock, price } = req.body;

  if (!category || !name || !stock || !price) {
    return res.status(400).json({
      message: "Faltan datos obligatorios del producto",
    });
  }

  
  try {

    const newProduct = await createProductService({
      category,
      name,
      stock,
      price,
    });

    res.status(201).json({
      message: `Producto creado exitosamente`,  
      data: newProduct
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};


export async function deleteProduct(req, res) {
  
  const id = req.params.id;
  
  if (!id) {
    return res.status(400).json({
      message: "Falta enviar el ID del producto",
    });
  }

  try {
    const result = await deleteProductService(id);
    
    if(result){
        res.send({
            message: "Producto Eliminado",
            data: id
        })
    }else{
        res.status(404).send({
            message: "Producto no encontrado"
        })
    }
    
  } catch (error) {
    res.status(500).json({ message: "Error: "+ error.message });
  }
}