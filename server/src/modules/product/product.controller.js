// src/modules/product/product.controller.js
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import productService from "./product.service.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";

// Helper function to capitalize first letter of each word
const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Helper function to capitalize first letter only
const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// ✅ GET ALL PRODUCTS
export const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getAllProducts(req.query);
  ApiResponse.success(res, "Products retrieved successfully", result);
});

// ✅ GET SINGLE PRODUCT
export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  ApiResponse.success(res, "Product retrieved successfully", product);
});

// ✅ CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  let images = [];

  // ✅ Files are already uploaded to Cloudinary
  if (req.files?.length) {
    images = req.files.map(file => ({
      public_id: file.filename,
      url: file.path,
    }));
  }

  // ✅ Parse and validate variants (with pages)
  let variants = [];
  if (req.body.variants) {
    try {
      variants = JSON.parse(req.body.variants);
      
      if (!Array.isArray(variants) || variants.length === 0) {
        throw new Error("At least one variant is required");
      }
      
      variants = variants.map(v => ({
        size: capitalizeFirst(v.size?.trim() || ""),
        type: capitalizeFirst(v.type?.trim() || ""),
        pages: parseInt(v.pages) || 0
      }));
      
      for (const variant of variants) {
        if (!variant.size || !variant.type || !variant.pages) {
          throw new Error("Each variant must have size, type, and pages");
        }
      }
    } catch (err) {
      throw new Error(err.message || "Invalid variants format");
    }
  } else {
    throw new Error("Variants are required");
  }

  // ✅ Parse dynamic fields with capitalization
  let dynamicFields = [];
  if (req.body.dynamicFields) {
    try {
      const parsed = JSON.parse(req.body.dynamicFields);
      dynamicFields = parsed.map(field => ({
        key: capitalizeWords(field.key?.trim() || ""),
        value: field.value?.trim() || ""
      }));
      console.log("Parsed dynamic fields:", dynamicFields);
    } catch (err) {
      console.error("Dynamic fields parse error:", err);
      dynamicFields = [];
    }
  }

  // ✅ Generate slug from name
  const baseSlug = req.body.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const slug = `${baseSlug}-${Date.now()}`;

  const productData = {
    name: capitalizeWords(req.body.name?.trim() || ""),
    slug: slug,
    description: req.body.description?.trim() || "",
    category: capitalizeWords(req.body.category?.trim() || ""),
    brand: req.body.brand || "NSWPL",
    variants,
    images,
    dynamicFields, // ✅ Save dynamic fields
  };

  console.log("Product data to save:", productData);

  if (!productData.name || !productData.category) {
    throw new Error("Name and category are required");
  }

  if (!productData.description) {
    throw new Error("Description is required");
  }

  try {
    const product = await productService.createProduct(productData);
    ApiResponse.success(res, "Product created successfully", product, 201);
  } catch (error) {
    console.error("Product creation error:", error);
    
    if (error.code === 11000) {
      throw new Error("A product with this name already exists.");
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      throw new Error(messages.join(', '));
    }
    
    throw error;
  }
});

// ✅ UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req, res) => {
  let updateData = { ...req.body };

  // Remove slug from update data
  delete updateData.slug;

  // Parse variants
  if (req.body.variants) {
    try {
      updateData.variants = JSON.parse(req.body.variants);
      
      if (!Array.isArray(updateData.variants) || updateData.variants.length === 0) {
        throw new Error("At least one variant is required");
      }
      
      updateData.variants = updateData.variants.map(v => ({
        size: capitalizeFirst(v.size?.trim() || ""),
        type: capitalizeFirst(v.type?.trim() || ""),
        pages: parseInt(v.pages) || 0
      }));
    } catch (err) {
      throw new Error("Invalid variants format");
    }
  }

  // Parse dynamic fields
  if (req.body.dynamicFields) {
    try {
      const parsed = JSON.parse(req.body.dynamicFields);
      updateData.dynamicFields = parsed.map(field => ({
        key: capitalizeWords(field.key?.trim() || ""),
        value: field.value?.trim() || ""
      }));
    } catch (err) {
      console.error("Dynamic fields parse error:", err);
    }
  }

  // Capitalize name and category if provided
  if (updateData.name) {
    updateData.name = capitalizeWords(updateData.name.trim());
  }
  if (updateData.category) {
    updateData.category = capitalizeWords(updateData.category.trim());
  }

  // Handle new images
  if (req.files?.length) {
    const newImages = req.files.map(file => ({
      public_id: file.filename,
      url: file.path,
    }));
    updateData.images = newImages;
  }

  try {
    const product = await productService.updateProduct(req.params.id, updateData);
    ApiResponse.success(res, "Product updated successfully", product);
  } catch (error) {
    console.error("Product update error:", error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      throw new Error(messages.join(', '));
    }
    
    throw error;
  }
});

// ✅ DELETE PRODUCT
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.images && product.images.length > 0) {
    for (let img of product.images) {
      try {
        await deleteFromCloudinary(img.public_id);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
      }
    }
  }

  await productService.deleteProduct(req.params.id);
  ApiResponse.success(res, "Product deleted successfully");
});