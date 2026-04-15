// app/components/widget/HubSpotForm.tsx
"use client";

import Script from "next/script";

export default function HubSpotForm() {
  return (
    <>
      <Script
        id="hubspot-form"
        src="https://js-eu1.hsforms.net/forms/embed/145107528.js"
        strategy="afterInteractive"
      />
      <div
        className="hs-form-frame"
        data-region="eu1"
        data-form-id="a90c1617-0004-4638-9138-0f6729a280a5"
        data-portal-id="145107528"
      />
    </>
  );
}
