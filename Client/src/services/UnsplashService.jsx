const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getUnsplashImage(query) {
  try {

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${ACCESS_KEY}`
    );

    const data = await res.json();

    // If image found
    if (data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    // fallback search
    const fallback = await fetch(
      `https://api.unsplash.com/search/photos?query=travel destination&per_page=1&client_id=${ACCESS_KEY}`
    );

    const fallbackData = await fallback.json();

    return fallbackData.results[0]?.urls?.regular;

  } catch (error) {

    console.error("Unsplash error:", error);
    return null;

  }
}
