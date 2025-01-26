"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GitHubCallback() {
  const router = useRouter();

  useEffect(() => {
    // Extract the token from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("access_token", token);

      // Redirect the user to the editor page
      router.push("/editor");
    } else {
      // Handle error (e.g., token not found)
      router.push("/login");
    }
  }, [router]);

  return <div>Loading...</div>;
}
