import { useState } from "react";
import useDbCollection from "../../hooks/useDbCollection";
import { getProducts, updateProduct, deleteProduct, addProduct } from "../../lib/db";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";
import AdminModal from "../../components/admin/AdminModal";
import StyledSelect from "../../components/admin/StyledSelect";

const CONCERNS = ["Hydration", "Anti-Aging", "Brightening", "Acne & Pores"];
const CATEGORIES = ["Skincare"];

const emptyForm = {
  name: "",
  category: "Skincare",
  concern: "Hydration",
  size: "",
  badge: "",
  price: "",
  stock: "",
  description: "",
  longDescription: "",
  image: "",
  active: true,
};

const inputClass =
  "w-full border border-outline-variant rounded-lg px-3 py-2 bg-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
const labelClass = "font-label-caps text-label-caps text-outline block mb-1";

export default function AdminInventory() {
  const [products] = useDbCollection(getProducts);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...product} = editing
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const openNew = () => {
    setForm(emptyForm);
    setFormError("");
    setEditing({});
  };

  const openEdit = (p) => {
    setForm({
      name: p.name || "",
      category: p.category || "Skincare",
      concern: p.concern || "Hydration",
      size: p.size || "",
      badge: p.badge || "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      description: p.description || "",
      longDescription: p.longDescription || "",
      image: p.image || "",
      active: p.active !== false,
    });
    setFormError("");
    setEditing(p);
  };

  const closeModal = () => setEditing(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSaving(true);
    setFormError("");
    const payload = {
      name: form.name,
      category: form.category,
      concern: form.concern,
      size: form.size,
      badge: form.badge || null,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      description: form.description,
      longDescription: form.longDescription,
      image: form.image,
      active: form.active,
    };
    try {
      if (editing?.id) {
        await updateProduct(editing.id, payload);
      } else {
        await addProduct(payload);
      }
      closeModal();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <SupabaseSetupNotice />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary mb-1">Inventory</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage shop products, pricing, stock, and images.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary text-on-primary px-5 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Product
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-outline-variant/30 font-label-caps text-label-caps text-outline uppercase">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price (AED)</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant/20 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline">
                          <span className="material-symbols-outlined text-[20px]">image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-primary font-medium">{p.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {p.size} · {p.concern}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-on-surface">AED {p.price}</td>
                <td className="px-4 py-3">
                  <span className={(p.stock ?? 0) <= 5 ? "text-error font-medium" : "text-on-surface"}>
                    {p.stock ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateProduct(p.id, { active: !(p.active !== false) }).catch((err) => alert(err.message))}
                    className={`px-3 py-1 rounded text-xs font-label-caps uppercase tracking-wide ${
                      p.active !== false ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {p.active !== false ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEdit(p)} className="text-primary hover:text-primary-container" title="Edit">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id).catch((err) => alert(err.message));
                      }}
                      className="text-outline hover:text-error"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <AdminModal title={editing.id ? `Edit ${editing.name}` : "Add Product"} onClose={closeModal}>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={labelClass}>Image URL</label>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 border border-outline-variant/30">
                  {form.image ? (
                    <img src={form.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[24px]">image</span>
                    </div>
                  )}
                </div>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className={`${inputClass} flex-1`}
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Paste an image URL (e.g. from Unsplash). File upload isn't wired up yet — see README.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Badge (optional)</label>
                <input name="badge" value={form.badge} onChange={handleChange} placeholder="Bestseller, New…" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <StyledSelect
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={CATEGORIES}
                  className="w-full"
                />
              </div>
              <div>
                <label className={labelClass}>Concern</label>
                <StyledSelect
                  name="concern"
                  value={form.concern}
                  onChange={handleChange}
                  options={CONCERNS}
                  className="w-full"
                />
              </div>
              <div>
                <label className={labelClass}>Size</label>
                <input name="size" value={form.size} onChange={handleChange} placeholder="30ml" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (AED)</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Stock</label>
                <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Short Description</label>
              <input name="description" value={form.description} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Full Description</label>
              <textarea
                name="longDescription"
                value={form.longDescription}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/40"
              />
              <span className="font-body-md text-body-md text-on-surface">Active (visible in shop)</span>
            </label>

            {formError && <p className="text-error text-sm">{formError}</p>}

            <div className="flex gap-3 justify-end pt-2 border-t border-outline-variant/30">
              <button type="button" onClick={closeModal} className="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded font-label-caps text-label-caps uppercase tracking-widest disabled:opacity-50"
              >
                {saving ? "Saving…" : editing.id ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
