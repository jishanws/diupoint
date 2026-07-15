export const DIU_EMAIL_DOMAINS = ['@diu.edu.bd', '@s.diu.edu.bd'] as const;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isDiuEmail(email: string): boolean {
  const normalizedEmail = normalizeEmail(email);
  return DIU_EMAIL_DOMAINS.some((domain) => normalizedEmail.endsWith(domain));
}
