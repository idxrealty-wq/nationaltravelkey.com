"use client";

import { useState, useCallback } from "react";
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
  pronouns: "",
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
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
              pronouns: data.pronouns as string,
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
            ← Back to Home
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
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {/* Save draft */}
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl border border-[#c9a227]/30 px-5 py-3.5 text-[#c9a227] text-sm font-bold hover:bg-[#c9a227]/10 transition"
            >
              {saved ? "✓ Saved" : "Save Draft"}
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-[#c9a227] px-8 py-3.5 text-[#08152b] text-sm font-black hover:bg-[#d8b13a] transition"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-emerald-600 px-8 py-3.5 text-white text-sm font-black hover:bg-emerald-500 transition"
              >
                ✓ Complete Profile
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
