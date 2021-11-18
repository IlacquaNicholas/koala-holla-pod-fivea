console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  // Deleting a koala
  $('#viewKoalas').on('click', '.delete-btn', deleteKoala);

}); // end doc ready

// Added a deleteKoala function
function deleteKoala() {
  const koalaIdToDelete = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    url: `/koalas/${koalaIdToDelete}`
  }).then((response) => {
    console.log(response);
    getKoalas();
  })
};


function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  });
}

function getKoalas(){
  console.log( 'in getKoalas' );
  $.ajax ({
    method: 'GET', 
    url: '/koalas'
  }).then((response)=>{
  console.log(response);
    $('#viewKoalas').empty();
    for (let koala of response){
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td><${koala.age}/td>
        <td>${koala.gender}</td>
        <td><${koala.readyForTransfer}/td>
        <td>${koala.notes}</td>
        <td><button class="delete-btn" data-id="${koala.id}">Delete</button></td>
      </tr>
      `)
    }
  }).catch((error)=>{
  console.log('this is an error', error);

  });


} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then((response) => {
    console.log('POST /koalas added successfully')
    $('#nameIn').val(''),
    $('#ageIn').val(''),
    $('#genderIn').val(''),
    $('#readyForTransferIn').val('')
    $('#notesIn').val('')
  getKoalas();
  }).catch((error) => {
    console.log('bruh, fix the error!', error);
  });
};

function updateKoala() {
  //This koalaID will need some HTML and click listener love
  const koalaID = $(this).data('id');
  const koalaUpdate = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  };

  $.ajax({
    type: 'PUT',
    url: `/koalas/${koalaID}`,
    data: koalaUpdate
  }).then((res) => {
    console.log('database supposedly updated');
    getKoalas();
  }).catch((error) => {
    console.log('database did not do the thing right');
  });
};