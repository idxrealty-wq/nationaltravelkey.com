"use client";

// ============================================
// NTK Profile Wizard (Firebase-connected)
// Path: src/components/profile/ProfileWizard.tsx
// Status: ACTIVE | Last Updated: 2026-04-09
// ============================================

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { getProfile, updateProfile, createProfile } from "../../lib/firebase/profiles";
import { Timestamp } from "firebase/firestore";
import ProgressBar from "./ProgressBar";
import StepPersonalInfo from "./StepPersonalInfo";
import StepContactEmergency from "./StepContactEmergency";
import StepLodgingPrefs from "./StepLodgingPrefs";
import StepCampingRV from "./StepCampingRV";
import StepPayment from "./StepPayment";
import StepDietaryAccess from "./StepDietaryAccess";
import StepMembership from "./StepMembership";
import StepPrivacy from "./StepPrivacy";

const TOTAL_STEPS = 8;

interface ProfileData {
  [key: string]: string | string[];
}

const INITIAL_DATA: ProfileData = {
  // Step 1 — Personal
  fullName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  // Step 2 — Contact & Emergency
  primaryPhone: "",
  secondaryPhone: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",
  preferredContact: "",
  // Step 3 — Lodging
  bedType: "",
  adultsCount: "1",
  childrenCount: "0",
  infantsCount: "0",
  petType: "",
  petSize: "",
  petCount: "",
  accessibilityNeeds: [],
  smokingPref: "",
  floorPref: "",
  roomLocation: "",
  // Step 4 — Camping & RV
  rvType: "",
  rvLength: "",
  hookupReq: "",
  tentPref: "",
  waterfrontPref: "",
  shadePref: "",
  petFriendlyReq: "",
  campAccessibility: [],
  // Step 5 — Payment
  primaryPayment: "",
  backupPayment: "",
  checkinPayment: "",
  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
  // Step 6 — Dietary & Accessibility
  dietaryRestrictions: [],
  customDietary: "",
  mobilityNeeds: "",
  serviceAnimalType: "",
  serviceAnimalTask: "",
  languagePref: "en",
  additionalAccommodations: "",
  // Step 7 — Membership
  membershipTier: "standard",
  loyaltyPrograms: [],
  customLoyalty: "",
  commPref: "",
  marketingOptIn: "",
  // Step 8 — Privacy
  publicProfile: "",
  supplierVisibility: [
    "name", "contact", "occupancy", "bed-pref", "rv-details",
    "hookup", "pet-info", "accessibility", "payment",
  ],
  photoVisibility: "",
  identityVerification: "",
  dataSharingConsent: "",
};

export default function ProfileWizard() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [saved, setSaved] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile from Firestore on mount
  useEffect(() => {
    if (!user) {
      setLoadingProfile(false);
      return;
    }
    (async () => {
      try {
        const profile = await getProfile(user.uid);
        if (profile) {
          setData({
            fullName: profile.fullName || "",
            dateOfBirth: profile.dateOfBirth
              ? profile.dateOfBirth.toDate().toISOString().split("T")[0]
              : "",
            phone: profile.phoneNumber || "",
            email: profile.email || "",
            primaryPhone: profile.phoneNumber || "",
            secondaryPhone: profile.secondaryPhone || "",
            emergencyName: profile.emergencyContactName || "",
            emergencyPhone: profile.emergencyContactPhone || "",
            emergencyRelationship: "",
            preferredContact: profile.preferredContactMethod || "",
            bedType: profile.bedTypePreference || "",
            adultsCount: String(profile.occupancyAdults ?? 1),
            childrenCount: String(profile.occupancyChildren ?? 0),
            infantsCount: String(profile.occupancyInfants ?? 0),
            petType: profile.petType || "",
            petSize: profile.petSize || "",
            petCount: profile.petCount ? String(profile.petCount) : "",
            accessibilityNeeds: profile.accessibilityNeeds || [],
            smokingPref: profile.smokingPreference || "",
            floorPref: profile.floorPreference || "",
            roomLocation: profile.roomLocationPreference || "",
            rvType: profile.rvType || "",
            rvLength: profile.rvLength || "",
            hookupReq: profile.hookupRequirements || "",
            tentPref: "",
            waterfrontPref: profile.waterfrontPreference ? "yes" : "",
            shadePref: profile.shadePreference ? "yes" : "",
            petFriendlyReq: profile.petFriendlyRequired ? "yes" : "",
            campAccessibility: [],
            primaryPayment: profile.primaryPaymentMethod || "",
            backupPayment: profile.backupPaymentMethod || "",
            checkinPayment: profile.preferredCheckInPayment || "",
            billingStreet: profile.billingAddress?.street || "",
            billingCity: profile.billingAddress?.city || "",
            billingState: profile.billingAddress?.state || "",
            billingZip: profile.billingAddress?.zip || "",
            dietaryRestrictions: profile.dietaryRestrictions || [],
            customDietary: "",
            mobilityNeeds: "",
            serviceAnimalType: profile.serviceAnimalInfo || "",
            serviceAnimalTask: "",
            languagePref: profile.languagePreference || "en",
            additionalAccommodations: "",
            membershipTier: profile.membershipTier || "standard",
            loyaltyPrograms: profile.loyaltyProgramNumbers
              ? Object.keys(profile.loyaltyProgramNumbers)
              : [],
            customLoyalty: "",
            commPref: "",
            marketingOptIn: profile.marketingOptIn ? "yes" : "",
            publicProfile: "",
            supplierVisibility: profile.supplierVisibleFields || [
              "name", "contact", "occupancy", "bed-pref", "rv-details",
              "hookup", "pet-info", "accessibility", "payment",
            ],
            photoVisibility: profile.facePhotoVisibility || "",
            identityVerification: "",
            dataSharingConsent: profile.dataSharingConsent ? "yes" : "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, [user]);

  const handleChange = useCallback((field: string, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const next = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  // Save to Firestore
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const firestoreData: Record<string, unknown> = {
        userId: user.uid,
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth
          ? Timestamp.fromDate(new Date(data.dateOfBirth as string))
          : null,
        phoneNumber: data.phone || data.primaryPhone,
        secondaryPhone: data.secondaryPhone,
        email: data.email || user.email || "",
        preferredContactMethod: data.preferredContact,
        emergencyContactName: data.emergencyName,
        emergencyContactPhone: data.emergencyPhone,
        bedTypePreference: data.bedType,
        occupancyAdults: parseInt(data.adultsCount as string) || 1,
        occupancyChildren: parseInt(data.childrenCount as string) || 0,
        occupancyInfants: parseInt(data.infantsCount as string) || 0,
        petType: data.petType || null,
        petSize: data.petSize || null,
        petCount: parseInt(data.petCount as string) || 0,
        accessibilityNeeds: data.accessibilityNeeds,
        smokingPreference: data.smokingPref,
        floorPreference: data.floorPref,
        roomLocationPreference: data.roomLocation,
        rvType: data.rvType,
        rvLength: data.rvLength || null,
        hookupRequirements: data.hookupReq,
        waterfrontPreference: data.waterfrontPref === "yes",
        shadePreference: data.shadePref === "yes",
        petFriendlyRequired: data.petFriendlyReq === "yes",
        primaryPaymentMethod: data.primaryPayment,
        backupPaymentMethod: data.backupPayment || null,
        preferredCheckInPayment: data.checkinPayment || null,
        billingAddress: {
          street: data.billingStreet,
          city: data.billingCity,
          state: data.billingState,
          zip: data.billingZip,
          country: "US",
        },
        dietaryRestrictions: data.dietaryRestrictions,
        serviceAnimalInfo: data.serviceAnimalType || null,
        languagePreference: data.languagePref,
        membershipTier: data.membershipTier || "STANDARD",
        marketingOptIn: data.marketingOptIn === "yes",
        dataSharingConsent: data.dataSharingConsent === "yes",
        supplierVisibleFields: data.supplierVisibility,
        facePhotoVisibility: data.photoVisibility || "NONE",
      };

      const existing = await getProfile(user.uid);
      if (existing) {
        await updateProfile(user.uid, firestoreData as Parameters<typeof updateProfile>[1]);
      } else {
        await createProfile(user.uid, firestoreData as Parameters<typeof createProfile>[1]);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepPersonalInfo
            data={{
              fullName: data.fullName as string,
              dateOfBirth: data.dateOfBirth as string,
              phone: data.phone as string,
              email: data.email as string,
            }}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <StepContactEmergency
            data={{
              primaryPhone: data.primaryPhone as string,
              secondaryPhone: data.secondaryPhone as string,
              emergencyName: data.emergencyName as string,
              emergencyPhone: data.emergencyPhone as string,
              emergencyRelationship: data.emergencyRelationship as string,
              preferredContact: data.preferredContact as string,
            }}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <StepLodgingPrefs
            data={{
              bedType: data.bedType as string,
              adultsCount: data.adultsCount as string,
              childrenCount: data.childrenCount as string,
              infantsCount: data.infantsCount as string,
              petType: data.petType as string,
              petSize: data.petSize as string,
              petCount: data.petCount as string,
              accessibilityNeeds: data.accessibilityNeeds as string[],
              smokingPref: data.smokingPref as string,
              floorPref: data.floorPref as string,
              roomLocation: data.roomLocation as string,
            }}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <StepCampingRV
            data={{
              rvType: data.rvType as string,
              rvLength: data.rvLength as string,
              hookupReq: data.hookupReq as string,
              tentPref: data.tentPref as string,
              waterfrontPref: data.waterfrontPref as string,
              shadePref: data.shadePref as string,
              petFriendlyReq: data.petFriendlyReq as string,
              campAccessibility: data.campAccessibility as string[],
            }}
            onChange={handleChange}
          />
        );
      case 4:
        return (
          <StepPayment
            data={{
              primaryPayment: data.primaryPayment as string,
              backupPayment: data.backupPayment as string,
              checkinPayment: data.checkinPayment as string,
              billingStreet: data.billingStreet as string,
              billingCity: data.billingCity as string,
              billingState: data.billingState as string,
              billingZip: data.billingZip as string,
            }}
            onChange={handleChange}
          />
        );
      case 5:
        return (
          <StepDietaryAccess
            data={{
              dietaryRestrictions: data.dietaryRestrictions as string[],
              customDietary: data.customDietary as string,
              mobilityNeeds: data.mobilityNeeds as string,
              serviceAnimalType: data.serviceAnimalType as string,
              serviceAnimalTask: data.serviceAnimalTask as string,
              languagePref: data.languagePref as string,
              additionalAccommodations: data.additionalAccommodations as string,
            }}
            onChange={handleChange}
          />
        );
      case 6:
        return (
          <StepMembership
            data={{
              membershipTier: data.membershipTier as string,
              loyaltyPrograms: data.loyaltyPrograms as string[],
              customLoyalty: data.customLoyalty as string,
              commPref: data.commPref as string,
              marketingOptIn: data.marketingOptIn as string,
            }}
            onChange={handleChange}
          />
        );
      case 7:
        return (
          <StepPrivacy
            data={{
              publicProfile: data.publicProfile as string,
              supplierVisibility: data.supplierVisibility as string[],
              photoVisibility: data.photoVisibility as string,
              identityVerification: data.identityVerification as string,
              dataSharingConsent: data.dataSharingConsent as string,
            }}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  // Loading state
  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#08152b] flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 rounded-lg bg-[#c9a227] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-[#08152b] font-black text-sm">NTK</span>
          </div>
          <p className="text-gray-400 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08152b]">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-[#c9a227]/20 bg-[#08152b]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#c9a227] flex items-center justify-center">
              <span className="text-[#08152b] font-black text-sm">NTK</span>
            </div>
            <span className="text-white font-black text-lg tracking-tight">Travel Key Profile</span>
          </a>
          <a
            href="/"
            className="text-gray-400 hover:text-white text-sm font-medium transition"
          >
            &larr; Back to Home
          </a>
        </div>
      </nav>

      {/* Wizard body */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        {/* Step content */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1f3c]/60 p-6 md:p-10">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className={`rounded-xl px-6 py-3.5 text-sm font-bold transition ${
              step === 0
                ? "text-gray-600 cursor-not-allowed"
                : "border border-white/20 text-white hover:border-white/40"
            }`}
          >
            &larr; Previous
          </button>

          <div className="flex items-center gap-3">
            {/* Save draft */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl border border-[#c9a227]/30 px-5 py-3.5 text-[#c9a227] text-sm font-bold hover:bg-[#c9a227]/10 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : saved ? "\u2713 Saved" : "Save Draft"}
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-[#c9a227] px-8 py-3.5 text-[#08152b] text-sm font-black hover:bg-[#d8b13a] transition"
              >
                Next Step &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-emerald-600 px-8 py-3.5 text-white text-sm font-black hover:bg-emerald-500 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "\u2713 Complete Profile"}
              </button>
            )}
          </div>
        </div>

        {/* Completion note on last step */}
        {step === TOTAL_STEPS - 1 && (
          <div className="mt-8 rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-5 text-center">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Almost Done
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Review your privacy settings above, then hit <strong className="text-white">Complete Profile</strong> to save your Travel Key. You can edit any section at any time from your dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
