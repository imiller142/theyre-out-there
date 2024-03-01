async function addLake {
    const lakeName = document.querySelector('.lake-name').value.trim()
    const response = await fetch('/api/lakes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
}