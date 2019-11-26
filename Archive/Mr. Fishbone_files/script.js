'use strict';

const answers = [];



function handlePage() {
    handleNewProblem();
    console.log('`handlePage` ran');
    //changePage();
    //handleItemCheckClicked();
    //handleDeleteItemClicked();
  }

function handleNewProblem() {
  $('form .active').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewProblem` ran');
    const Problem = $('#problem').val();
    $('#problem').val('');
    addProblem(Problem);
    //$(this).addClass('.hide');
    console.log($(this));

    //const href = $(this).attr('href');
    //console.log(href);
        //window.history.pushState(null,null,href);
       // $.ajax({
       //     url: href,
       //     success: function(data){
       //         $('.problem').fadeOut(250, function(){
       //             const newPage = data.filter('form').html();
       //             $('.problem').html(newPage);
       //             $('.problem').fadeIn(250)
       //         })
       //     }
       // })
    // 

  });
}

function handleNewWhy() {
    $('.why').submit(function(event) {
      event.preventDefault();
      console.log('`handleNewWhy` ran');
      const Why = $('#why').val();
      $('#why').val('');
    });
  }

  

  function addProblem(itemName) {
    console.log(`Adding "${itemName}" as the Problem`);
    answers.push({id: cuid(), type: 'Problem', input: itemName});
    console.log(answers);

    // add the itemName function input to the object with a new cuid and checked key initialized as false
  }

  // when the page loads, call `handlePage`
$(handlePage);