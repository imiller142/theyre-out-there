async function addLake(event) {
    event.preventDefault()
    const name = document.querySelector('.lake-name').value.trim();
    const city = document.querySelector('.city').value.trim();
    const latitude = document.querySelector('.latitude').value.trim();
    const longitude = document.querySelector('.longitude').value.trim();

    if (latitude >  90 || latitude < -90) {
      alert('Invalid Latitude')
    }
    else if (longitude > 180 || longitude < -180) {
      alert('invalid longitude')
    }
    else{
      if (name && city && latitude && longitude) {
        const response = await fetch('/api/lakes', {
            method: 'post',
            body: JSON.stringify({
              name,
              city,
              latitude,
              longitude
            }),
            headers: { 'Content-Type': 'application/json' }
          });

        if (response.ok) {
          document.location.replace('/lakes');
        } else {
          alert(response.statusText);
        }
      }
  }
}

document.querySelector('#add-lake').addEventListener('submit', addLake);