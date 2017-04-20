var updateButton = document.getElementById('update')
var deleteButton = document.getElementById('delete')

updateButton.addEventListener('click', function () {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'twd',
      'quote': 'Most of us are familiar with the proper use of toilet paper.'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})

deleteButton.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'twd'
    })
  }).then(function (response) {
    window.location.reload()
  })
})
