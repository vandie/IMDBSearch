import config from '../config.json';

async function request(options) {
  const requestURL = new URL('/', config.apiBaseUrl);
  requestURL.searchParams.append('apikey', config.apikey);
  for (const [option, value] of Object.entries(options)) {
    requestURL.searchParams.append(option, value);
  }
  const res = await fetch(
    requestURL.toString(),
  );

  if (!res.ok) {
    throw new Error('Request Failed');
  }

  try {
    const json = await res.json();
    if (json.Search) return json.Search;
    return json;
  } catch (e) {
    throw new Error('Response is invalid JSON');
  }
}

export default request;
