import React, { useState } from "react";
import {
  Phone,
  Award,
  ChevronRight,
  ChevronLeft,
  Check,
  Home,
  Building2,
  Sparkles,
  Wrench,
  Palette,
  Shield,
  Send,
  MapPin,
  User,
  Mail,
} from "lucide-react";
import logo from "../assets/barnone-lightmode.svg?url";
import heroBg from "../assets/photos/12.png?url";

const RECAPTCHA_SITE_KEY = "6Le9SD4sAAAAAMVbV3GukJA_MVYdE4W0LSEkLpjY";

type ServiceType = "epoxy" | "polishing" | "staining" | "repair" | null;
type ProjectType = "residential" | "commercial" | "industrial" | null;

interface FormData {
  service: ServiceType;
  projectType: ProjectType;
  sqft: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  details: string;
}

export const QuotePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: null,
    projectType: null,
    sqft: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    location: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalSteps = 4;

  const services = [
    {
      id: "epoxy",
      label: "Epoxy Flooring",
      icon: Sparkles,
      desc: "Garage, showroom, industrial",
    },
    {
      id: "polishing",
      label: "Concrete Polishing",
      icon: Shield,
      desc: "High-gloss, matte, or satin",
    },
    {
      id: "staining",
      label: "Staining & Sealing",
      icon: Palette,
      desc: "Decorative concrete finishes",
    },
    {
      id: "repair",
      label: "Crack Repair",
      icon: Wrench,
      desc: "Structural & cosmetic repairs",
    },
  ];

  const projectTypes = [
    {
      id: "residential",
      label: "Residential",
      icon: Home,
      desc: "Garage, basement, patio",
    },
    {
      id: "commercial",
      label: "Commercial",
      icon: Building2,
      desc: "Office, retail, warehouse",
    },
  ];

  const timelines = [
    { id: "asap", label: "ASAP" },
    { id: "1-2weeks", label: "1-2 Weeks" },
    { id: "1month", label: "Within a Month" },
    { id: "flexible", label: "Flexible" },
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service !== null;
      case 2:
        return formData.projectType !== null;
      case 3:
        return formData.sqft !== "" && formData.timeline !== "";
      case 4:
        return formData.name !== "" && formData.phone !== "";
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Get reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: "QUOTE_FORM",
            });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData, recaptchaToken: token }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please call us directly at (972) 900-1009."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => (
    <div className="flex items-center gap-1 sm:gap-2">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-tech text-xs sm:text-sm font-bold transition-all duration-300 transform -skew-x-6 ${
              s < step
                ? "bg-brand-blue text-white"
                : s === step
                ? "bg-brand-red text-white"
                : "bg-brand-black/10 text-brand-black/40"
            }`}
          >
            <span className="skew-x-6">
              {s < step ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : s}
            </span>
          </div>
          {s < 4 && (
            <div
              className={`w-4 sm:w-8 h-0.5 transition-all duration-300 ${
                s < step ? "bg-brand-blue" : "bg-brand-black/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="font-tech text-brand-red text-xs uppercase tracking-[0.2em] font-bold">
          Step 1 of 4
        </span>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl italic uppercase text-brand-black mt-2 leading-[0.9]">
          What Do You <span className="text-brand-blue">Need?</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = formData.service === service.id;
          return (
            <button
              key={service.id}
              onClick={() =>
                setFormData({ ...formData, service: service.id as ServiceType })
              }
              className={`group relative p-3 sm:p-6 text-left transition-all duration-300 border ${
                isSelected
                  ? "bg-brand-blue border-brand-blue"
                  : "bg-white border-brand-black/10 hover:border-brand-blue/50 hover:bg-brand-blue/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transform -skew-x-6 transition-colors flex-shrink-0 ${
                    isSelected
                      ? "bg-white/20"
                      : "bg-brand-blue/10 group-hover:bg-brand-blue/20"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 transform skew-x-6 ${
                      isSelected ? "text-white" : "text-brand-blue"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    className={`font-heading text-sm sm:text-xl italic uppercase leading-tight ${
                      isSelected ? "text-white" : "text-brand-black"
                    }`}
                  >
                    {service.label}
                  </h3>
                  <p
                    className={`font-tech text-xs sm:text-sm mt-1 hidden sm:block ${
                      isSelected ? "text-white/70" : "text-brand-black/50"
                    }`}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="font-tech text-brand-red text-xs uppercase tracking-[0.2em] font-bold">
          Step 2 of 4
        </span>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl italic uppercase text-brand-black mt-2 leading-[0.9]">
          Project <span className="text-brand-blue">Type?</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = formData.projectType === type.id;
          return (
            <button
              key={type.id}
              onClick={() =>
                setFormData({
                  ...formData,
                  projectType: type.id as ProjectType,
                })
              }
              className={`group relative p-4 sm:p-6 text-center transition-all duration-300 border ${
                isSelected
                  ? "bg-brand-blue border-brand-blue"
                  : "bg-white border-brand-black/10 hover:border-brand-blue/50 hover:bg-brand-blue/5"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center transform -skew-x-6 transition-colors mb-3 sm:mb-4 ${
                  isSelected
                    ? "bg-white/20"
                    : "bg-brand-blue/10 group-hover:bg-brand-blue/20"
                }`}
              >
                <Icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 transform skew-x-6 ${
                    isSelected ? "text-white" : "text-brand-blue"
                  }`}
                />
              </div>
              <h3
                className={`font-heading text-lg sm:text-xl italic uppercase ${
                  isSelected ? "text-white" : "text-brand-black"
                }`}
              >
                {type.label}
              </h3>
              <p
                className={`font-tech text-xs mt-1 sm:mt-2 hidden sm:block ${
                  isSelected ? "text-white/70" : "text-brand-black/50"
                }`}
              >
                {type.desc}
              </p>
              {isSelected && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <div>
        <span className="font-tech text-brand-red text-xs uppercase tracking-[0.2em] font-bold">
          Step 3 of 4
        </span>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl italic uppercase text-brand-black mt-2 leading-[0.9]">
          Project <span className="text-brand-blue">Details</span>
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-8">
        <div>
          <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
            Approximate Square Footage
          </label>
          <input
            type="text"
            value={formData.sqft}
            onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
            className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30"
            placeholder="e.g., 500 sq ft, 2-car garage"
          />
        </div>

        <div>
          <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
            Timeline
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {timelines.map((t) => (
              <button
                key={t.id}
                onClick={() => setFormData({ ...formData, timeline: t.id })}
                className={`p-2 sm:p-3 font-tech text-xs sm:text-sm transition-all border ${
                  formData.timeline === t.id
                    ? "bg-brand-blue border-brand-blue text-white"
                    : "bg-white border-brand-black/20 text-brand-black/70 hover:border-brand-blue/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
            Additional Details{" "}
            <span className="text-brand-black/40">(Optional)</span>
          </label>
          <textarea
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            rows={2}
            className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30 resize-none"
            placeholder="Current floor condition, color preferences..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <div>
        <span className="font-tech text-brand-red text-xs uppercase tracking-[0.2em] font-bold">
          Step 4 of 4
        </span>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl italic uppercase text-brand-black mt-2 leading-[0.9]">
          Your <span className="text-brand-blue">Info</span>
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-5 mt-4 sm:mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <div>
            <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
              Name <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-black/30" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 pl-10 sm:pl-12 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30"
                placeholder="John Smith"
              />
            </div>
          </div>
          <div>
            <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
              Phone <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-black/30" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 pl-10 sm:pl-12 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <div>
            <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
              Email <span className="text-brand-black/40">(Optional)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-black/30" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 pl-10 sm:pl-12 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block font-tech text-xs font-bold text-brand-black uppercase tracking-widest mb-2 sm:mb-3">
              City / Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-black/30" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-white border border-brand-black/20 p-3 sm:p-4 pl-10 sm:pl-12 font-tech text-sm sm:text-base focus:outline-none focus:border-brand-blue focus:bg-brand-blue/5 transition-all text-brand-black placeholder-brand-black/30"
                placeholder="Dallas, TX"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-brand-blue flex items-center justify-center transform -skew-x-6">
        <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white transform skew-x-6" />
      </div>
      <div>
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl italic uppercase text-brand-black leading-[0.9]">
          Request <span className="text-brand-blue">Sent!</span>
        </h2>
        <p className="font-tech text-brand-black/60 mt-3 sm:mt-4 max-w-md mx-auto text-sm sm:text-base">
          Thanks, {formData.name}! We'll review your project details and get
          back to you within 24 hours with a detailed quote.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
        <a
          href="tel:9729001009"
          className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-brand-red text-white px-6 py-3 sm:px-8 sm:py-4 font-heading italic uppercase transform -skew-x-6 hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          <span className="transform skew-x-6 flex items-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            Call Now
          </span>
        </a>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-brand-black/10 text-brand-black px-6 py-3 sm:px-8 sm:py-4 font-heading italic uppercase transform -skew-x-6 hover:bg-brand-black/20 transition-colors text-sm sm:text-base"
        >
          <span className="transform skew-x-6">Back to Home</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="quote-page fixed inset-0 bg-white overflow-y-auto overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover grayscale opacity-[0.12]"
          />
          {/* Gradient mask - fades right side to white */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-40% to-white" />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 via-30% to-transparent lg:block hidden" />
        </div>
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Bar None Coatings" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-brand-black text-xl uppercase italic leading-none tracking-tighter">
                Bar None
              </span>
              <span className="font-tech text-brand-red text-[9px] tracking-[0.2em] uppercase font-bold">
                Coatings LLC
              </span>
            </div>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-brand-black/60 font-tech text-xs uppercase tracking-widest">
              <Award className="w-4 h-4 text-brand-red" />
              <span>Veteran Owned</span>
            </div>
            <a
              href="tel:9729001009"
              className="flex items-center gap-2 text-brand-black font-tech text-sm hover:text-brand-blue transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(972) 900-1009</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Info (visible on lg+) */}
            <div className="hidden lg:block">
              <div className="space-y-8">
                <div>
                  <span className="font-tech text-brand-blue font-bold uppercase tracking-[0.2em] text-sm">
                    Free Estimate
                  </span>
                  <h1 className="font-heading text-6xl xl:text-7xl italic uppercase text-brand-black mt-4 leading-[0.85]">
                    Get Your
                    <br />
                    <span className="text-brand-red">Free Quote</span>
                  </h1>
                  <p className="font-tech text-brand-black/60 text-lg mt-6 max-w-md leading-relaxed">
                    Tell us about your project and we'll provide a detailed,
                    no-obligation quote within 24 hours.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    "On-site assessment included",
                    "Transparent pricing, no hidden fees",
                    "Licensed & insured professionals",
                    "Serving TX, OK, AR",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-brand-blue/20 flex items-center justify-center transform -skew-x-6">
                        <Check className="w-4 h-4 text-brand-blue transform skew-x-6" />
                      </div>
                      <span className="font-tech text-brand-black/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Trust Badge & Contact */}
                <div className="flex flex-col gap-6 pt-8 border-t border-brand-black/10">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:9729001009"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-brand-blue/10 flex items-center justify-center transform -skew-x-6 group-hover:bg-brand-blue transition-colors">
                        <Phone className="w-5 h-5 text-brand-blue transform skew-x-6 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <span className="font-tech text-brand-black/50 text-[10px] uppercase tracking-widest block">
                          Call or Text
                        </span>
                        <span className="font-heading text-lg italic text-brand-black">
                          (972) 900-1009
                        </span>
                      </div>
                    </a>

                    <a
                      href="mailto:barnonecoatingsllc@gmail.com"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-brand-blue/10 flex items-center justify-center transform -skew-x-6 group-hover:bg-brand-blue transition-colors">
                        <Mail className="w-5 h-5 text-brand-blue transform skew-x-6 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <span className="font-tech text-brand-black/50 text-[10px] uppercase tracking-widest block">
                          Email
                        </span>
                        <span className="font-heading text-sm italic text-brand-black">
                          barnonecoatingsllc@gmail.com
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full">
              <div className="bg-white/95 backdrop-blur-xl border border-brand-black/10 shadow-2xl p-5 sm:p-8 md:p-10 relative">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-transparent" />

                {!isSubmitted ? (
                  <>
                    {/* Progress */}
                    <div className="mb-6 sm:mb-8">{renderProgressBar()}</div>

                    {/* Form Steps */}
                    <div className="min-h-[280px] sm:min-h-[400px]">
                      {step === 1 && renderStep1()}
                      {step === 2 && renderStep2()}
                      {step === 3 && renderStep3()}
                      {step === 4 && renderStep4()}
                    </div>

                    {/* Error Message */}
                    {submitError && (
                      <div className="mt-4 bg-red-500/10 border border-red-500/30 p-4 text-red-600 font-tech text-sm">
                        {submitError}
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-brand-black/10">
                      {step > 1 ? (
                        <button
                          onClick={() => setStep(step - 1)}
                          className="flex items-center gap-1 sm:gap-2 font-tech text-brand-black/60 hover:text-brand-black transition-colors uppercase text-xs sm:text-sm tracking-wider"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < totalSteps ? (
                        <button
                          onClick={() => canProceed() && setStep(step + 1)}
                          disabled={!canProceed()}
                          className={`flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 font-heading italic uppercase transform -skew-x-6 transition-all text-sm sm:text-base ${
                            canProceed()
                              ? "bg-brand-red text-white hover:bg-red-700"
                              : "bg-brand-black/10 text-brand-black/30 cursor-not-allowed"
                          }`}
                        >
                          <span className="transform skew-x-6 flex items-center gap-2">
                            Continue
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => canProceed() && handleSubmit()}
                          disabled={!canProceed() || isSubmitting}
                          className={`flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 font-heading italic uppercase transform -skew-x-6 transition-all text-sm sm:text-base ${
                            canProceed() && !isSubmitting
                              ? "bg-brand-red text-white hover:bg-red-700"
                              : "bg-brand-black/10 text-brand-black/30 cursor-not-allowed"
                          }`}
                        >
                          <span className="transform skew-x-6 flex items-center gap-2">
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Get My Quote
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                              </>
                            )}
                          </span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  renderSuccess()
                )}
              </div>

              {/* Mobile Trust Badge */}
              <div className="lg:hidden flex items-center justify-center gap-4 mt-8">
                <Award className="w-5 h-5 text-brand-red" />
                <span className="font-tech text-brand-black/60 text-sm uppercase tracking-widest">
                  Veteran Owned & Operated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-transparent z-50" />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};
