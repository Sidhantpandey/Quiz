import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageSquare, User, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  concerns: string;
  preferredTherapist: string;
  previousTherapy: string;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM'
];

const therapists = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Stress Management' },
];

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    concerns: '',
    preferredTherapist: '',
    previousTherapy: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.date && formData.time;
      case 3:
        return formData.concerns && formData.preferredTherapist;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 text-center animate-fadeIn">
          <div className="inline-flex p-4 rounded-full bg-emerald-500 mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for scheduling a consultation. We've sent a confirmation email to {formData.email} with all the details.
          </p>
          <div className="bg-secondary/50 rounded-lg p-6 text-left space-y-3">
            <p className="text-card-foreground"><strong>Date:</strong> {formData.date}</p>
            <p className="text-card-foreground"><strong>Time:</strong> {formData.time}</p>
            <p className="text-card-foreground"><strong>Therapist:</strong> {formData.preferredTherapist}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full bg-card rounded-2xl shadow-xl p-8 animate-fadeIn">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">Book Your Consultation</h2>
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of 3
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-card-foreground mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-card-foreground mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label htmlFor="concerns" className="block text-sm font-medium text-card-foreground mb-2">
                  Primary Concerns
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <textarea
                    id="concerns"
                    name="concerns"
                    value={formData.concerns}
                    onChange={handleInputChange}
                    rows={4}
                    className="pl-10 w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Please describe your main concerns..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredTherapist" className="block text-sm font-medium text-card-foreground mb-2">
                  Preferred Therapist
                </label>
                <select
                  id="preferredTherapist"
                  name="preferredTherapist"
                  value={formData.preferredTherapist}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a therapist</option>
                  {therapists.map(therapist => (
                    <option key={therapist.id} value={therapist.name}>
                      {therapist.name} - {therapist.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="previousTherapy" className="block text-sm font-medium text-card-foreground mb-2">
                  Previous Therapy Experience
                </label>
                <select
                  id="previousTherapy"
                  name="previousTherapy"
                  value={formData.previousTherapy}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select an option</option>
                  <option value="none">No previous experience</option>
                  <option value="some">Some experience</option>
                  <option value="extensive">Extensive experience</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="ml-auto inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepValid()}
                className="ml-auto inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Consultation
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}