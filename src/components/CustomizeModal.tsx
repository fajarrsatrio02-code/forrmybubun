import React, { useState } from 'react';
import { BirthdayData } from '../types';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayData;
  onSave: (newData: BirthdayData) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<BirthdayData>({ ...data });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof BirthdayData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCopyShareLink = () => {
    const params = new URLSearchParams();
    params.set('to', formData.recipientName);
    params.set('from', formData.senderName);
    if (formData.birthdayDate) params.set('date', formData.birthdayDate);
    if (formData.specialNote) params.set('note', formData.specialNote);
    if (formData.age) params.set('age', formData.age.toString());
    if (formData.whatsappNumber) params.set('wa', formData.whatsappNumber);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-50 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-serif-title text-xl font-bold text-amber-950">
              Kustomisasi Ucapan Ulang Tahun & Surat
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Quick info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Nama yang Berulang Tahun <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                placeholder="Misal: My Yelloow duck"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Nama Kamu (Pengirim) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => handleChange('senderName', e.target.value)}
                placeholder="Misal: Fajar"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Tanggal Ulang Tahun
              </label>
              <input
                type="text"
                value={formData.birthdayDate || '05 Oktober 2026'}
                onChange={(e) => handleChange('birthdayDate', e.target.value)}
                placeholder="Misal: 05 Oktober 2026"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Catatan Spesial
              </label>
              <input
                type="text"
                value={formData.specialNote || 'aku suka dia yang periang'}
                onChange={(e) => handleChange('specialNote', e.target.value)}
                placeholder="Misal: aku suka dia yang periang"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Usia Ulang Tahun (Opsional)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age || ''}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                placeholder="Misal: 22"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                No. WhatsApp Kamu (Opsional)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="Contoh: 6281234567890"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
              />
              <span className="text-[10px] text-stone-400">Digunakan untuk menerima jawaban jadian via WhatsApp</span>
            </div>
          </div>

          {/* Letter Greeting */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Sapaan Surat Pribadi
            </label>
            <input
              type="text"
              value={formData.letterGreeting}
              onChange={(e) => handleChange('letterGreeting', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
            />
          </div>

          {/* Letter Body */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Isi Surat Pribadi
            </label>
            <textarea
              rows={4}
              value={formData.letterBody}
              onChange={(e) => handleChange('letterBody', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900 leading-relaxed text-xs sm:text-sm font-sans"
            />
          </div>

          {/* Proposal Question */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Pertanyaan Ajakan Jadian
            </label>
            <input
              type="text"
              value={formData.confessionQuestion}
              onChange={(e) => handleChange('confessionQuestion', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-900"
            />
          </div>

          {/* Share Link Generator Section */}
          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-950">
                  Bagikan Link Langsung ke Pasangan
                </p>
                <p className="text-[11px] text-stone-600">
                  Salin link dengan nama yang sudah dikustomisasi untuk dikirimkan ke WhatsApp/chat.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                {copiedLink ? '✅ Link Tersalin!' : '🔗 Salin Link'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-amber-800 hover:bg-amber-900 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
