import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";

/**
 * The Google tag (gtag.js), mounted once in the public site layout.
 *
 * Sits in the (site) group rather than the root layout on purpose, so the
 * /admin area stays out of the Ads data and staff activity cannot land in a
 * remarketing audience.
 *
 * afterInteractive, not beforeInteractive: conversion measurement must never
 * sit on the critical path of a page a customer is trying to read.
 */
export function GoogleAds() {
  return (
    <>
      <Script
        id="google-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
