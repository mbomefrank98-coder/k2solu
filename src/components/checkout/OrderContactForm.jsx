'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaPaperPlane,
  FaUser,
  FaMapMarkerAlt,
  FaCommentDots,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
} from 'react-icons/fa';

const WHATSAPP_NUMBER = '17406027691'; // +1 740-602-7691
const ORDER_EMAIL = 'info@k2solutionpro.com';

function buildMessage({ name, contact, address, notes }, cart, orderDetails) {
  const itemLines = cart
    .map((item) => {
      const price = Number(item.price ?? item.variant?.price ?? 0);
      const lineTotal = (price * item.quantity).toFixed(2);
      const variantLabel = item.variant?.label ?? (item.variant?.grams ? `${item.variant.grams}g` : '');
      const variant = variantLabel ? ` (${variantLabel})` : '';
      return `- ${item.name}${variant} x${item.quantity} @ €${price.toFixed(2)} = €${lineTotal}`;
    })
    .join('\n');

  return [
    '*K2SolutionPro — New Order Request*',
    '_k2solutionpro.com_',
    '',
    '───────────────────',
    '  CUSTOMER DETAILS',
    '───────────────────',
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Shipping Address: ${address}`,
    notes ? `Message: ${notes}` : null,
    '',
    '───────────────────',
    '  ORDER ITEMS',
    '───────────────────',
    itemLines,
    '',
    '───────────────────',
    '  ORDER TOTAL',
    '───────────────────',
    `Subtotal: €${orderDetails.subtotal.toFixed(2)}`,
    `Shipping: €${orderDetails.shipping.toFixed(2)}`,
    `Tax: €${orderDetails.tax.toFixed(2)}`,
    `*Total: €${orderDetails.total.toFixed(2)}*`,
    '',
    '───────────────────',
    'Payment: Bitcoin (BTC)',
    'Telegram: t.me/K2solutionpro',
    'Email: info@k2solutionpro.com',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export default function OrderContactForm({ cart, orderDetails }) {
  const [method, setMethod] = useState('whatsapp');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState(null);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() &&
    form.address.trim() &&
    confirmed &&
    (method === 'email'
      ? form.email.trim() && form.phone.trim()
      : form.contact.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    if (method === 'email') {
      setSubmitting(true);
      try {
        const res = await fetch('/api/orders/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            notes: form.notes.trim(),
            cart,
            orderDetails,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send order');
        setReference(data.reference);
        toast.success(`Order sent — reference ${data.reference}`);
      } catch (err) {
        toast.error(err.message || 'Could not send your order. Please try WhatsApp or Telegram instead.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const message = buildMessage(form, cart, orderDetails);
    const text = encodeURIComponent(message);

    if (method === 'telegram') {
      const url = `https://t.me/K2solutionpro?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const methodLabels = {
    whatsapp: { title: 'WhatsApp', field: 'WhatsApp number', placeholder: '+1 740-602-7691', Icon: FaWhatsapp, verb: 'WhatsApp' },
    telegram: { title: 'Telegram', field: 'Telegram username', placeholder: '@K2solutionpro', Icon: FaTelegramPlane, verb: 'Telegram' },
    email: { title: 'Email', Icon: FaEnvelope, verb: 'email' },
  };
  const active = methodLabels[method];

  const inputClass = 'field pl-9';
  const labelClass = 'field-label';
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-bone-faint text-xs';

  if (reference) {
    return (
      <div className="cell p-6 sm:p-8 text-center">
        <FaCheckCircle className="mx-auto h-12 w-12 text-volt" />
        <h2 className="h-display mt-5 text-2xl">Order request sent</h2>
        <p className="mt-2 text-sm text-bone-muted">
          Reference <span className="font-mono font-semibold text-volt">{reference}</span>
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bone-muted">
          We&apos;ve emailed the order details to our team and sent a confirmation to{' '}
          <span className="text-bone">{form.email}</span>. We&apos;ll reply with payment
          instructions (BTC) shortly.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
          Check your inbox (and spam) for the confirmation
        </p>
      </div>
    );
  }

  return (
    <div className="cell p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <FaUser className="text-sm text-volt" />
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-bone">
          Your details
        </h2>
      </div>

      {/* Method choice cards */}
      <p className={labelClass}>Choose how to continue</p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Object.entries(methodLabels).map(([key, { title, Icon }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMethod(key)}
            className={`flex items-center gap-3 border rounded-xl p-3.5 text-left transition-colors ${
              method === key
                ? 'border-volt bg-volt/10'
                : 'border-line bg-night-800 hover:border-line-strong'
            }`}
          >
            <Icon className={method === key ? 'text-volt' : 'text-bone-faint'} />
            <div>
              <p className="text-sm font-bold leading-none text-bone">{title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-bone-faint">
                Order by {title}
              </p>
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Full name</label>
          <div className="relative">
            <FaUser className={iconClass} />
            <input name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="John Doe" className={inputClass} />
          </div>
        </div>

        {method === 'email' ? (
          <>
            <div>
              <label className={labelClass}>Your email address</label>
              <div className="relative">
                <FaEnvelope className={iconClass} />
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone number</label>
              <div className="relative">
                <FaPhone className={iconClass} />
                <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  placeholder="+1 555 000 0000" className={inputClass} />
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className={labelClass}>{active.field}</label>
            <div className="relative">
              <active.Icon className={iconClass} />
              <input
                name="contact"
                type="text"
                required
                value={form.contact}
                onChange={handleChange}
                placeholder={active.placeholder}
                className={inputClass}
              />
            </div>
          </div>
        )}

        <div>
          <label className={labelClass}>Shipping address</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconClass} />
            <input name="address" type="text" required value={form.address} onChange={handleChange}
              placeholder="123 Main St, Berlin, Germany" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Message (optional)</label>
          <div className="relative">
            <FaCommentDots className="absolute left-3 top-3.5 text-xs text-bone-faint" />
            <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
              placeholder="Any special requests or questions..."
              className="field resize-none pl-9" />
          </div>
        </div>

        {/* Confirmation */}
        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-night-800 p-3.5">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="checkbox mt-0.5"
          />
          <span className="text-[11px] leading-relaxed text-bone-muted">
            I am a serious buyer. I understand this is a real order request and I am ready to receive
            payment instructions via {active.verb}.
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="btn-volt w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaPaperPlane className="h-3.5 w-3.5" />
          {submitting
            ? 'Sending…'
            : `Send order via ${active.verb} — €${orderDetails.total.toFixed(2)}`}
        </button>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
          {method === 'email'
            ? `Order is emailed directly to ${ORDER_EMAIL} — you get a confirmation copy.`
            : `Your details will be sent directly to us on ${active.verb}.`}
        </p>
      </form>
    </div>
  );
}
