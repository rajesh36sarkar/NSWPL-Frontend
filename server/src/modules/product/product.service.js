import Product from "./product.model.js";

class ProductService {
  // ✅ GET ALL PRODUCTS (with filters + pagination)
  async getAllProducts(query = {}) {
    const {
      category,
      featured,
      search,
      sort,
      page = 1,
      limit = 10,
    } = query;

    const filter = {};

    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === "true";
    if (search) filter.name = { $regex: search, $options: "i" };

    const sortOptions = sort
      ? {
          [sort.split(":")[0]]:
            sort.split(":")[1] === "desc" ? -1 : 1,
        }
      : {};

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .limit(limitNum)
        .skip(skip),
      Product.countDocuments(filter),
    ]);

    return {
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum * limitNum < total,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  // ✅ GET SINGLE PRODUCT
  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  // ✅ CREATE PRODUCT
  async createProduct(productData) {
    return await Product.create(productData);
  }

  // ✅ UPDATE PRODUCT
  async updateProduct(id, updateData) {
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error("Product not found");

    return product;
  }

  // ✅ DELETE PRODUCT (ONLY DB DELETE)
  async deleteProduct(id) {
    const product = await Product.findById(id);

    if (!product) throw new Error("Product not found");

    await product.deleteOne();

    return { message: "Product deleted successfully" };
  }
}

export default new ProductService();