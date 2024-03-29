/* eslint-disable no-console */
/* eslint-disable no-undef */

const basedUrl = 'http://localhost:3001';

window.client = (function () {
  function getTimers(success) {
    return fetch(`${basedUrl}/api/timers`, {
							headers: { Accept: 'application/json' },
					}).then(checkStatus)
						.then(parseJSON)
						.then(success);
  }

  function createTimer(data) {
    return fetch(`${basedUrl}/api/timers`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function updateTimer(data) {
    return fetch(`${basedUrl}/api/timers`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function deleteTimer(data) {
    return fetch(`${basedUrl}/api/timers`, {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function startTimer(data) {
    return fetch(`${basedUrl}/api/timers/start`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function stopTimer(data) {
    return fetch(`${basedUrl}/api/timers/stop`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    getTimers,
    createTimer,
    updateTimer,
    startTimer,
    stopTimer,
    deleteTimer,
  };
}());
