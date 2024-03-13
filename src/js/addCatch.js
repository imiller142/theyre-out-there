
async function addCatch(event) {
    event.preventDefault()
    const fish_id = document.getElementById('inputGroupSelect01').value.trim();
    const lake_id = document.getElementById('inputGroupSelect02').value.trim();
    const length  = document.getElementById('length').value.trim();
    const weight = document.getElementById('weight').value.trim();
    const getSpecies = document.getElementById('inputGroupSelect01');
    const species = getSpecies.options[getSpecies.selectedIndex].text;

    if (fish_id && lake_id && length && weight) {
        const response = await fetch('/api/catch', {
            method: 'post',
            body: JSON.stringify({
                species,
                length,
                weight,
                lake_id,
                fish_id

            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/');
          } else {
            alert(response.statusText);
          }
    }
}

document.getElementById('btn').addEventListener('click', addCatch);