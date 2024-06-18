// api.js
import axios from 'axios';

const BASE_URL = 'https://bp-prod-api.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
});

// GET MODEL
export const fetchAllLeagueProviders = async () => {
  try {
    const response = await api.get('/sport-entities?filter_by=league_provider');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST MODEL
export const createPlayerProfile = async (playerProfile) => {
  try {
    const response = await api.post('/auth/register/', playerProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the player profile');
  }
};

// POST MODEL WITH TOKEN
export const createTeam = async (teamInformation) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('No token found');
    }

    // Set up the headers with the Authorization token
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Make the POST request with the headers
    const response = await api.post('/teams/', teamInformation, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the team');
  }
};

export const fetchAllNations = async () => {
  try {
    const response = await api.get('/nations/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllPlayingPositions = async () => {
  try {
    const response = await api.get('/playing-positions/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllPlayingPos = async () => {
  try {
    const response = await api.get('/playing-positions/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProxyData = async (code) => {
  try {
    const response = await api.get(`/players/proxy/get-proxy?code=${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching proxy data');
  }
};

export const updateLeague = async (teamId, leagueId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.patch(`/teams/${teamId}`, leagueId, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while joining a league');
  }
};

export const updateCaptainSquadNumber = async (playerId, data) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.patch(`/players/${playerId}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while joining a league');
  }
};

export const getAllVenuesByProvider = async (providerId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.get(`/venues?entity_id=${providerId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching proxy data');
  }
};

export const getAllLeaguesByVenue = async (venueId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.get(`/leagues?venue_id=${venueId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching proxy data');
  }
};

export const getProxyCodes = async (teamId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.get(`/players/proxy?team_id=${teamId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching squad codes data');
  }
};

export const loginRequest = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in');
  }
};

export const createProxyPlayerSquad = async (proxyPlayersData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Token ${token}`,
    };

    const config = {
      headers,
      timeout: 25000,
    };

    const response = await api.post(
      '/players/proxy/bulk-create/',
      proxyPlayersData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('The request timed out');
    } else {
      throw new Error('An error occurred while creating your squad');
    }
  }
};

export const redeemProxyPlayer = async (playerProfile) => {
  try {
    const response = await api.post('/register/', playerProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while redeeming your player profile');
  }
};

export const fetchPlayerStats = async (playerId, seasonId) => {
  try {
    const response = await api.get(
      `/queries/type-1?player_id=${playerId}&season_id=${seasonId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching player stats');
  }
};

export const fetchPlayerProfile = async (playerId) => {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching player profile');
  }
};
