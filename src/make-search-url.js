const BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const API_KEY = '698ecfea67de32ae8e6a3b78e74af2b3';
const SEARCH_CHARACTERS_URL = `${BASE_URL}/characters?`;
const SEARCH_COMICS_URL = `${BASE_URL}/comics?`;

export default function makeCharacterSearchUrl(searchOptions) {
    const url = new URL(SEARCH_CHARACTERS_URL);
    url.searchParams.set('name', searchOptions.keyword);
    url.searchParams.set('apikey', API_KEY);
    
    console.log(url.href);
    return url.toString();
}