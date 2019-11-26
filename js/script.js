'use strict';

const answers = [];



function handlePage() {
    handleNewProblem(); // if the function is not in here, the page will initiate default behavior
    // if the function is called as the page opens, it will start looking for the input (click, submittion etc.)
    handleNewWhy();
    console.log('`handlePage` ran');
    //changePage();
    //handleItemCheckClicked();
    //handleDeleteItemClicked();
  }

function handleNewProblem() {
  $('.problem').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewProblem` ran');
    const Problem = $('#problem').val();
    // $('#problem').val('');
    addProblem(Problem);
    $(this).addClass('hide');
    $('.why').removeClass('hide');
    //console.log($(this));
    
    //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript
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
    const whyAmt = 0;
    $('.why').submit(function(event) {
      event.preventDefault();
      console.log('`handleNewWhy` ran');
      const Why = $('#why').val();
      // $('#why').val('');
      addWhy(Why, whyAmt);
    //$(this).addClass('hide');
    //console.log($(this));
    });
  }

  // -----------  ADD PROBLEM AND WHY ANSWERS -----

  function addWhy(itemName, whyAmt) {
    whyAmt = ++whyAmt;
    if (whyAmt <=5 ){
        console.log(`Adding "${itemName}" to the Whys`);
        answers.push({id: cuid(), type: 'Why', input: itemName});
        console.log(answers);
        console.log(whyAmt);
    };

    // add the itemName function input to the object with a new cuid and checked key initialized as false
  }


  function addProblem(itemName) {
    console.log(`Adding "${itemName}" as the Problem`);
    answers.push({id: cuid(), type: 'Problem', input: itemName});
    console.log(answers);

    // add the itemName function input to the object with a new cuid and checked key initialized as false
  }


  // when the page loads, call `handlePage`
$(handlePage);