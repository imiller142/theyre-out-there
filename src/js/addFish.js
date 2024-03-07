async function addFish(event) {
    event.preventDefault()
    const common_name = document.querySelector('.common-name').value.trim();
    const description = document.querySelector('.description').value.trim();
    const wiki_link = document.querySelector('.wiki-link').value.trim();


      if (common_name && description && wiki_link) {
        const response = await fetch('/api/fish', {
            method: 'post',
            body: JSON.stringify({
              description,
              common_name,
              wiki_link
            }),
            headers: { 'Content-Type': 'application/json' }
          });

        if (response.ok) {
          document.location.replace('/fish');
        } else {
          alert(response.statusText);
        }
      }
  }


document.querySelector('.fish-form').addEventListener('submit', addFish);