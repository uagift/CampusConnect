const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

const formatDate = (localDate) => localDate
  ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${localDate}T12:00:00`))
  : '';

export const normalizeTicketmasterEvent = (raw) => {
  const venue = raw._embedded?.venues?.[0];
  const classification = raw.classifications?.[0];
  const categoryText = [raw.name, classification?.segment?.name, classification?.genre?.name].filter(Boolean).join(' ').toLowerCase();
  const category = categoryText.includes('workshop') ? 'Workshops' : categoryText.includes('hack') || categoryText.includes('tech') || categoryText.includes('ai') || categoryText.includes('computer') ? 'Technology' : categoryText.includes('competition') || categoryText.includes('contest') || categoryText.includes('tournament') ? 'Competitions' : categoryText.includes('leadership') ? 'Leadership' : categoryText.includes('art') || categoryText.includes('design') ? 'Creative' : categoryText.includes('community') || categoryText.includes('volunteer') ? 'Community' : classification?.segment?.name || classification?.genre?.name || 'Other';
  const image = raw.images?.find((item) => item.ratio === '16_9') || raw.images?.[0];
  const date = raw.dates?.start?.localDate || '';
  const time = raw.dates?.start?.localTime || '';
  const venueName = venue?.name || '';
  const place = [venue?.city?.name, venue?.state?.stateCode || venue?.country?.name].filter(Boolean).join(', ');

  return {
    id: `tm-${raw.id}`,
    ticketmasterId: raw.id,
    source: 'ticketmaster',
    title: raw.name || 'Untitled event',
    description: raw.info || raw.pleaseNote || '',
    shortDescription: raw.info || raw.pleaseNote || '',
    image: image?.url || '',
    category,
    date: formatDate(date),
    time,
    location: place,
    venue: venueName,
    organizer: raw.promoter?.name || '',
    registrationLink: raw.url || '',
    externalLink: raw.url || '',
    tags: [classification?.genre?.name, classification?.subGenre?.name].filter(Boolean),
    spotsLeft: null,
    isPopular: false,
    isCommunityCreated: false,
  };
};

const getKey = () => import.meta.env.VITE_TICKETMASTER_API_KEY;

export const searchTicketmasterEvents = async ({ keyword = '', category = 'All', signal } = {}) => {
  const apiKey = getKey();
  if (!apiKey) throw new Error('Ticketmaster is not configured. Add VITE_TICKETMASTER_API_KEY to your .env file.');
  const params = new URLSearchParams({ apikey: apiKey, size: '20' });
  const query = [keyword.trim(), category !== 'All' ? category : ''].filter(Boolean).join(' ');
  if (query) params.set('keyword', query);
  const response = await fetch(`${BASE_URL}?${params}`, { signal });
  if (!response.ok) throw new Error(`Ticketmaster could not load events (${response.status}).`);
  const payload = await response.json();
  return (payload._embedded?.events || []).map(normalizeTicketmasterEvent);
};

export const getTicketmasterEvent = async (ticketmasterId, signal) => {
  const apiKey = getKey();
  if (!apiKey) throw new Error('Ticketmaster is not configured.');
  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${ticketmasterId}.json?apikey=${apiKey}`, { signal });
  if (!response.ok) throw new Error('This Ticketmaster event could not be loaded.');
  return normalizeTicketmasterEvent(await response.json());
};
