import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/adminApi";

const initialState = {
  name: "",
  description: "",
  category: "",
};

const ProductForm = ({ editingProduct, setEditingProduct, refresh, toast }) => {
  const [form, setForm] = useState(initialState);
  const [variants, setVariants] = useState([{ size: "", type: "", pages: "" }]);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Clean up preview URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Load edit data
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
      });

      setVariants(
        editingProduct.variants?.length
          ? editingProduct.variants.map(v => ({
              size: v.size || "",
              type: v.type || "",
              pages: v.pages || "",
            }))
          : [{ size: "", type: "", pages: "" }]
      );

      setDynamicFields(editingProduct.dynamicFields || []);
      setIsExpanded(true);
    }
  }, [editingProduct]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    URL.revokeObjectURL(previewUrls[index]);
    setFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", type: "", pages: "" }]);
  };

  const removeVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated.length ? updated : [{ size: "", type: "", pages: "" }]);
  };

  const addDynamicField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      setDynamicFields([...dynamicFields, { 
        key: newFieldKey.trim(), 
        value: newFieldValue.trim() 
      }]);
      setNewFieldKey("");
      setNewFieldValue("");
    }
  };

  const removeDynamicField = (index) => {
    setDynamicFields(dynamicFields.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm(initialState);
    setVariants([{ size: "", type: "", pages: "" }]);
    setFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setDynamicFields([]);
    setNewFieldKey("");
    setNewFieldValue("");
    setEditingProduct(null);
    setError("");
    setIsExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name?.trim()) return setError("Product name is required");
    if (!form.category?.trim()) return setError("Category is required");
    if (!form.description?.trim()) return setError("Description is required");

    const validVariants = variants.filter(v => v.size && v.type && v.pages);
    if (validVariants.length === 0) {
      return setError("At least one complete variant is required");
    }

    if (!editingProduct && files.length === 0) {
      return setError("At least one image is required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      
      // Capitalize first letter of each word for name and category
      const capitalizeWords = (str) => {
        return str.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      };
      
      formData.append("name", capitalizeWords(form.name.trim()));
      formData.append("description", form.description.trim());
      formData.append("category", capitalizeWords(form.category.trim()));
      formData.append("brand", "NSWPL");
      
      // Clean variants with capitalized size and type
      const cleanVariants = validVariants.map(v => ({
        size: v.size.trim().charAt(0).toUpperCase() + v.size.trim().slice(1).toLowerCase(),
        type: v.type.trim().charAt(0).toUpperCase() + v.type.trim().slice(1).toLowerCase(),
        pages: parseInt(v.pages) || 0,
      }));
      formData.append("variants", JSON.stringify(cleanVariants));
      
      // Clean dynamic fields with capitalized keys
      const cleanDynamicFields = dynamicFields.map(field => ({
        key: field.key.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' '),
        value: field.value
      }));
      formData.append("dynamicFields", JSON.stringify(cleanDynamicFields));
      
      console.log("Sending dynamic fields:", cleanDynamicFields);

      // Append images
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        toast?.success("Product updated successfully!");
      } else {
        await createProduct(formData);
        toast?.success("Product created successfully!");
      }

      resetForm();
      refresh();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`product-form-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <div className="form-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <h4>{editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}</h4>
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>

      {isExpanded && (
        <form className="product-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                placeholder="Premium Notebook"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={50}
              />
              <small className="char-count">{form.name?.length || 0}/50</small>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                placeholder="Notebooks"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                maxLength={30}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              placeholder="Describe your product..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              maxLength={200}
            />
            <small className="char-count">{form.description?.length || 0}/200</small>
          </div>

          {/* Variants Section */}
          <div className="variants-section">
            <h5>📦 Variants *</h5>
            
            {variants.map((v, index) => (
              <div key={index} className="variant-group">
                <input
                  type="text"
                  placeholder="Size (A4/A5)"
                  value={v.size}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Type (Ruled/Plain)"
                  value={v.type}
                  onChange={(e) => handleVariantChange(index, "type", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Pages"
                  value={v.pages}
                  onChange={(e) => handleVariantChange(index, "pages", e.target.value)}
                  min="1"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeVariant(index)}
                >
                  ×
                </button>
              </div>
            ))}

            <button type="button" className="add-variant-btn" onClick={addVariant}>
              + Add Variant
            </button>
          </div>

          {/* Dynamic Fields */}
          <div className="dynamic-fields-section">
            <h5>🔧 Additional Fields (Optional)</h5>
            <p className="hint-text">Add price, material, or any other custom fields here</p>
            
            <div className="dynamic-fields-list">
              {dynamicFields.map((field, index) => (
                <div key={index} className="dynamic-field-item">
                  <span className="field-key">{field.key}:</span>
                  <span className="field-value">{field.value}</span>
                  <button
                    type="button"
                    className="remove-field"
                    onClick={() => removeDynamicField(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="dynamic-field-input">
              <input
                type="text"
                placeholder="Key (e.g., Price)"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="Value (e.g., ₹299)"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
              />
              <button type="button" onClick={addDynamicField}>
                + Add Field
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="image-upload-section">
            <label>📸 Product Images {!editingProduct && "*"}</label>
            <div className="upload-area">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-label">
                <span>📁</span> Choose Images
              </label>
            </div>
            
            {previewUrls.length > 0 && (
              <div className="image-preview-grid">
                {previewUrls.map((url, index) => (
                  <div key={index} className="preview-item">
                    <img src={url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                    {index === 0 && <span className="main-badge">Main</span>}
                  </div>
                ))}
              </div>
            )}
            
            <small className="help-text">First image will be the main product image</small>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <span className="loading-dots">Saving<span>.</span><span>.</span><span>.</span></span>
              ) : (
                <>
                  <span>{editingProduct ? "💾 Update Product" : "✨ Create Product"}</span>
                  <span className="btn-shine"></span>
                </>
              )}
            </button>
            
            <button type="button" className="cancel-btn" onClick={resetForm}>
              ❌ Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;