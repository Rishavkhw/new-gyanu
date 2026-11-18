import { CartItem, Product } from '../types';
import { formatNPR } from './formatPrice';

export const STUDIO_WHATSAPP_RAW = '9862339743';
export const STUDIO_WHATSAPP_INTL = '9779862339743';

export function buildWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${STUDIO_WHATSAPP_INTL}`;
  if (!message || !message.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message?: string): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function getGeneralInquiryMessage(): string {
  return 'Hello Gyanu Photo Studio! I would like to know more about your services.';
}

export function getServiceInquiryMessage(serviceName: string): string {
  return `Hello Gyanu Photo Studio! I am interested in your ${serviceName} service. Please provide more information.`;
}

export function getProductBuyNowMessage(product: Product, quantity = 1): string {
  return [
    'Hello Gyanu Photo Studio!',
    '',
    'I am interested in purchasing:',
    '',
    `Product: ${product.name}`,
    `Price: ${formatNPR(product.price)}`,
    `Quantity: ${quantity}`,
    '',
    'Please provide more details about ordering.',
    '',
    'Thank you!',
  ].join('\n');
}

export function getCartOrderMessage(items: CartItem[], totalAmount: number): string {
  const lines: string[] = [
    'Hello Gyanu Photo Studio!',
    '',
    'I would like to order the following products:',
    '',
  ];

  items.forEach((item, index) => {
    const unitSuffix = item.quantity > 1 ? ' each' : '';
    lines.push(`${index + 1}. ${item.product.name}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ${formatNPR(item.product.price)}${unitSuffix}`);
    lines.push('');
  });

  lines.push(`Total Amount: ${formatNPR(totalAmount)}`);
  lines.push('');
  lines.push('Please confirm my order. Thank you!');

  return lines.join('\n');
}

export interface ContactFormPayload {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function getContactWhatsAppMessage(payload: ContactFormPayload): string {
  return [
    'Hello Gyanu Photo Studio!',
    '',
    `New Inquiry: ${payload.subject}`,
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    '',
    'Message:',
    payload.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}
