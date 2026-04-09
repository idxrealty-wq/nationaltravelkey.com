"use client";

import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase/config";
import { useAuth } from "../auth/AuthProvider";

interface StepPersonalInfoProps {
  data: {
    fullName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function StepPersonalInfo({ data, onChange }: StepPersonalInfoProps) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPG, PNG, etc.).");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB.");
      return;
    }

    setUploadError("");
    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const storageRef = ref(storage, `profile_photos/${user.uid}/face.${ext}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPhotoUrl(url);
      onChange("facePhotoUrl", url);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl font-black tracking-tight mb-1">Personal Information</h2>
      <p className="text-gray-400 text-sm mb-8">Basic details for your Travel Key profile.</p>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="First and last name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 555-5555"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={uploading}
                className="rounded-xl border border-[#c9a227]/30 px-5 py-2.5 text-[#c9a227] text-xs font-bold hover:bg-[#c9a227]/10 transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : photoUrl ? "Change Photo" : "Upload Photo"}
              </button>
              {uploadError && (
                <p className="text-red-400 text-xs mt-2">{uploadError}</p>
              )}
              <p className="text-gray-600 text-xs mt-1">JPG or PNG, max 5MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
