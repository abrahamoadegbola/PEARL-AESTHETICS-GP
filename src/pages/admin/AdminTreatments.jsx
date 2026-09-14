import { useState } from "react";
import useDbCollection from "../../hooks/useDbCollection";
import { getTreatments, updateTreatment, deleteTreatment, addTreatment } from "../../lib/db";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";
import AdminModal from "../../components/admin/AdminModal";
import StyledSelect from "../../components/admin/StyledSelect";

const CATEGORIES = ["Face", "Skin", "Body", "Hair", "Wellness", "IV Therapy", "Longevity", "GP"];

const emptyForm = {
  name: "",
  category: "Face",
  description: "",
  priceFrom: "",
  priceLabel: "",
  durationMinutes: "",
  icon: "spa",
  image: "",
  featured: false,
  active: true,
};

const inputClass =
  "w-full border border-outline-variant rounded-lg px-3 py-2 bg-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
const labelClass = "font-label-caps text-label-caps text-outline block mb-1";

export default function AdminTreatments() {
  const [treatments] = useDbCollection(getTreatments);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...treatment} = editing
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const openNew = () => {
    setForm(emptyForm);
    setFormError("");
    setEditing({});
  };

  const openEdit = (t) => {
    setForm({
      name: t.name || "",
      category: t.category || "Face",
      description: t.description || "",
      priceFrom: t.priceFrom ?? "",
      priceLabel: t.priceLabel || "",
      durationMinutes: t.durationMinutes ?? "",
      icon: t.icon || "spa",
      image: t.image || "",
      featured: Boolean(t.featured),
      active: t.active !== false,
    });
    setFormError("");
    setEditing(t);
  };

  const closeModal = () => setEditing(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    setSaving(true);
    setFormError("");
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description,
      priceFrom: Number(form.priceFrom) || 0,
      priceLabel: form.priceLabel || null,
      durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : null,
      icon: form.icon || "spa",
      image: form.image,
      featured: form.featured,
      active: form.active,
    };
    try {
      if (editing?.id) {
        await updateTreatment(editing.id, payload);
      } else {
        await addTreatment(payload);
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
          <h1 className="font-display-lg text-headline-md text-primary mb-1">Treatments</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage the treatment menu shown on Home, Treatments, and Treatment Menu.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary text-on-primary px-5 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Treatment
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-outline-variant/30 font-label-caps text-label-caps text-outline uppercase">
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price From (AED)</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((t) => (
              <tr key={t.id} className="border-b border-outline-variant/20 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline">
                          <span className="material-symbols-outlined text-[20px]">{t.icon || "spa"}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-primary font-medium">{t.name}</p>
                      <p className="text-xs text-on-surface-variant max-w-xs truncate">{t.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-on-surface-variant">{t.category}</td>
                <td className="px-4 py-3 text-on-surface">{t.priceLabel || `AED ${t.priceFrom}`}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateTreatment(t.id, { featured: !t.featured }).catch((err) => alert(err.message))}
                    className={`px-3 py-1 rounded text-xs font-label-caps uppercase tracking-wide ${
                      t.featured ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {t.featured ? "Featured" : "Standard"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateTreatment(t.id, { active: !(t.active !== false) }).catch((err) => alert(err.message))}
                    className={`px-3 py-1 rounded text-xs font-label-caps uppercase tracking-wide ${
                      t.active !== false ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {t.active !== false ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEdit(t)} className="text-primary hover:text-primary-container" title="Edit">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${t.name}"?`)) deleteTreatment(t.id).catch((err) => alert(err.message));
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
        <AdminModal title={editing.id ? `Edit ${editing.name}` : "Add Treatment"} onClose={closeModal}>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={labelClass}>Image URL</label>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 border border-outline-variant/30">
                  {form.image ? (
                    <img src={form.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-[24px]">{form.icon || "spa"}</span>
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
                Used on the Treatment Menu page. Paste an image URL — file upload isn't wired up yet, see README.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
              </div>
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
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Price From (AED)</label>
                <input name="priceFrom" type="number" min="0" value={form.priceFrom} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Price Label (optional)</label>
                <input
                  name="priceLabel"
                  value={form.priceLabel}
                  onChange={handleChange}
                  placeholder="Consultation complimentary"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Duration (min)</label>
                <input name="durationMinutes" type="number" min="0" value={form.durationMinutes} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Icon (Material Symbol name)</label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="spa, water_drop, colorize, flare, vaccines, stethoscope…"
                className={inputClass}
              />
              <p className="text-xs text-on-surface-variant mt-1">
                Shown on the Home page cards. See{" "}
                <a
                  href="https://fonts.google.com/icons"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-primary"
                >
                  Material Symbols
                </a>{" "}
                for names.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/40"
                />
                <span className="font-body-md text-body-md text-on-surface">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/40"
                />
                <span className="font-body-md text-body-md text-on-surface">Active (visible on site)</span>
              </label>
            </div>

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
                {saving ? "Saving…" : editing.id ? "Save Changes" : "Add Treatment"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
