// src/modules/product/product.model.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "",
  },
  pages: {
    type: Number,
    required: true,
  },
});

const dynamicFieldSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Max 100 characters"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Max 1000 characters"],
    },

    brand: {
      type: String,
      default: "NSWPL",
    },

    variants: {
      type: [variantSchema],
      required: [true, "At least one variant is required"],
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "At least one variant is required",
      },
    },

    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    dynamicFields: {
      type: [dynamicFieldSchema],
      default: [],
    },

    badge: {
      type: String,
      enum: ["", "New", "Best Seller", "Sale", "Premium"],
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate slug before saving
productSchema.pre("save", async function(next) {
  if (!this.slug) {
    const baseSlug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    this.slug = `${baseSlug}-${Date.now()}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;