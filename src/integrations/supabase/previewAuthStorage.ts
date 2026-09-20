// Simplified auth storage for standalone deployment.
// Outside Lovable's editor preview environment this always returns the browser's
// localStorage, which is the correct default for a regular web application.
export function brokeredPreviewStorage() {
  if (typeof window === 'undefined') return undefined;
  return localStorage;
}
