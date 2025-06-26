import { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setState, setError }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.cloudinary) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Cloudinary script");
      setError?.("Failed to load Cloudinary widget. Check your network or ad blocker.");
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [setError]);

  useEffect(() => {
    if (!isScriptLoaded || !window.cloudinary) {
      if (!isScriptLoaded) console.error("Cloudinary script not loaded yet");
      return;
    }

    console.log("Cloudinary config:", uwConfig); // Log config for debugging
    const widget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setState([url]); // Use single URL since multiple: false
          console.log("Upload successful, URL:", url);
          setError?.(null);
        } else if (error) {
          console.error("Upload error:", error);
          const errorMessage = error.statusText || error.message || "Failed to upload image";
          setError?.(`Image upload failed: ${errorMessage}`);
        }
      }
    );

    const handleClick = () => {
      console.log("Opening upload widget");
      widget.open();
    };

    const button = document.getElementById("upload-widget-button");
    if (button) {
      button.addEventListener("click", handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [isScriptLoaded, uwConfig, setState, setError]);

  return (
    <button id="upload-widget-button" disabled={!isScriptLoaded}>
      {isScriptLoaded ? "Upload Image" : "Loading..."}
    </button>
  );
}

export default UploadWidget;