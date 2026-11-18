import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  getContactWhatsAppMessage,
  getGeneralInquiryMessage,
  openWhatsApp,
  STUDIO_WHATSAPP_RAW,
} from '../utils/whatsapp';

interface FormErrors {
  fullName?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!phone.trim() || phone.trim().length < 7) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (!subject.trim()) next.subject = 'Please add a subject for your inquiry.';
    if (!message.trim()) next.message = 'Please write a short message.';
    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const whatsappText = getContactWhatsAppMessage({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    openWhatsApp(whatsappText);
  };

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#A8823A]">Get in Touch</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#141210] sm:text-5xl">
            Contact Gyanu Photo Studio
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#665E54]">
            Have a date in mind for a wedding, portrait session, or custom frame order? Fill in the form below to send your message directly to our studio WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Studio Details + Map Placeholder */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-[#E6DFD4] bg-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-[#141210]">
                Studio Information
              </h2>

              <dl className="mt-6 space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#A8823A]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-[#141210]">Phone</dt>
                    <dd className="mt-0.5 tabular-nums text-[#665E54]">
                      <a href={`tel:+977${STUDIO_WHATSAPP_RAW}`} className="hover:text-[#141210]">
                        +977 {STUDIO_WHATSAPP_RAW}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MessageCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#1E8E49]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-[#141210]">WhatsApp</dt>
                    <dd className="mt-0.5 tabular-nums text-[#665E54]">
                      <a
                        href={buildWhatsAppUrl(getGeneralInquiryMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1E8E49] hover:underline"
                      >
                        +977 {STUDIO_WHATSAPP_RAW} (Chat Now)
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#A8823A]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-[#141210]">Email</dt>
                    <dd className="mt-0.5 text-[#665E54]">
                      <a href="mailto:hello@gyanuphotostudio.com" className="hover:text-[#141210]">
                        hello@gyanuphotostudio.com
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#A8823A]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-[#141210]">Studio Address</dt>
                    <dd className="mt-0.5 text-[#665E54]">
                      Main Studio Street, Kathmandu, Nepal
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#A8823A]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-[#141210]">Business Hours</dt>
                    <dd className="mt-0.5 text-[#665E54]">
                      Sun – Fri: 9:30 AM – 7:00 PM · Sat: By Appointment
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 flex items-center gap-3 border-t border-[#E6DFD4] pt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E6DFD4] px-3.5 text-xs font-semibold text-[#141210] hover:bg-[#FAF8F5]"
                >
                  <Instagram className="h-4 w-4 text-[#A8823A]" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E6DFD4] px-3.5 text-xs font-semibold text-[#141210] hover:bg-[#FAF8F5]"
                >
                  <Facebook className="h-4 w-4 text-[#A8823A]" aria-hidden="true" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed Placeholder */}
            <div className="overflow-hidden rounded-xl border border-[#E6DFD4] bg-white">
              <div className="relative flex h-56 flex-col items-center justify-center bg-[#EFE9E0] p-6 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#A8823A] shadow-sm">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-3 font-serif text-xl font-semibold text-[#141210]">
                  Gyanu Photo Studio Location
                </p>
                <p className="mt-1 text-xs text-[#665E54]">
                  Main Studio Street, Kathmandu, Nepal
                </p>
                <a
                  href="https://maps.google.com/?q=Kathmandu,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#E6DFD4] bg-white px-4 py-2 text-xs font-semibold text-[#141210] shadow-xs transition-colors hover:border-[#A8823A]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right WhatsApp Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-[#E6DFD4] bg-white p-6 sm:p-8"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#141210]">
                Send an Inquiry via WhatsApp
              </h2>
              <p className="mt-1.5 text-sm text-[#665E54]">
                Your message is formatted cleanly and opened directly in WhatsApp so you can chat with us immediately.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#141210]">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    placeholder="Your full name"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-3.5 text-sm text-[#141210] placeholder:text-[#665E54]/70 focus:border-[#A8823A] focus:bg-white focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs font-medium text-red-700">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#141210]">
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="98XXXXXXXX"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-3.5 text-sm text-[#141210] placeholder:text-[#665E54]/70 focus:border-[#A8823A] focus:bg-white focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-red-700">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#141210]">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-3.5 text-sm text-[#141210] placeholder:text-[#665E54]/70 focus:border-[#A8823A] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#141210]">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    placeholder="e.g., Wedding Inquiry / Custom Frame"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-3.5 text-sm text-[#141210] placeholder:text-[#665E54]/70 focus:border-[#A8823A] focus:bg-white focus:outline-none"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs font-medium text-red-700">{errors.subject}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#141210]">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Tell us about your event date, preferred service, or product customization details..."
                  className="mt-1.5 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] p-3.5 text-sm text-[#141210] placeholder:text-[#665E54]/70 focus:border-[#A8823A] focus:bg-white focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-medium text-red-700">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1E8E49] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#18763C] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
