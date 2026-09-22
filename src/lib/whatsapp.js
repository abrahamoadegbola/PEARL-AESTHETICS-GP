import BUSINESS from "../data/business";

export function buildWhatsAppLink(message, phone = BUSINESS.whatsappNumber) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function generalInquiryMessage() {
  return `Hi ${BUSINESS.shortName}, I'd like to find out more about your treatments.`;
}

export function bookingWhatsAppMessage(booking) {
  return [
    `Hi ${BUSINESS.shortName}, I'd like to confirm a consultation booking:`,
    `• Category: ${booking.category}`,
    booking.doctor ? `• Doctor: ${booking.doctor}` : null,
    `• Preferred date: ${booking.date}`,
    `• Preferred time: ${booking.time}`,
    `• Name: ${booking.name}`,
    `• Phone: ${booking.phone}`,
    booking.notes ? `• Notes: ${booking.notes}` : null,
    `• Reference: ${booking.id}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function orderWhatsAppMessage(order) {
  const lines = order.items.map((item) => `• ${item.qty} x ${item.name} — AED ${item.price * item.qty}`);
  return [
    `Hi ${BUSINESS.shortName}, I'd like to arrange payment for my order:`,
    `Order reference: ${order.id}`,
    ...lines,
    `Total: AED ${order.total}`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
  ].join("\n");
}

export function productInquiryMessage(product) {
  return `Hi ${BUSINESS.shortName}, I'd like to ask about ${product.name} (AED ${product.price}).`;
}
