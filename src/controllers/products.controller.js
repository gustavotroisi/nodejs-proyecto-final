import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  deleteProductService,
} from "../services/products.service.js";

export async function getAllProducts(req, res) {
  //res.status(200).json(products);
  const category = req.query.category;
  try {
    //res.status(200).json(productsService.getAllProductsService());
    const products = await getAllProductsService(category);
    if (products.length > 0) {
      res.send({
        message: "Productos encontrados",
        data: products,
      });
    } else {
      res.status(404).send({
        message: "Produto(s) no encontrado(s)",
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

  // const body = req.body;
  //console.log(body);

  const { category, name, stock, price } = req.body;

  if (!category || !name || !stock || !price) {
    return res.status(400).json({
      message: "Error al obtener los datos del producto",
    });
  }

  const newProduct = await createProductService({
    category,
    name,
    stock,
    price,
  });

  res.status(201).json(newProduct);
};
