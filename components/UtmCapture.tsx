"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";

/** Invisible: captures UTM params from the URL on first load of any page. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
