'use strict';
  let i = 1;
  console.log('this is i global: '+i);
  let score = 0;
  console.log('this is score global: '+score);
  let trys = 0
  console.log('this is the number of trys: '+trys);
  startQuiz();

  function startQuiz() {
    $('#start').on('click', function(event) {
      console.log('`startQuiz` ran');
      const href = $(this).attr('href');
      event.preventDefault();
      console.log('href='+href);
      //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript

      //window.history.pushState(null,null,href);
      $.ajax({
             url: href,
             success: function(data){
                 $('#start').fadeOut(1000, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     // gets form content from the start page (index.html), does not work for getting 'fieldset'
                     // has to look for a parent element, if a child is looked for then newPage is undefined
                     //console.log(data); // data is page2.1.html
                     //console.log(newQ);
                     //console.log(foot);
                     $('form').html(newPage).hide().fadeIn(1000);
                     $('footer').html(foot).hide().fadeIn(1000);
                     $('footer').removeClass('blank');
                     countQuestions();
                 })
             }
         })
    })
  }

  function countQuestions(){
    console.log('`countQuestions` ran');
    console.log(i);
    if(i==1){
      let ans='answer-4';
      //console.log(ans);
      //console.log(i);
      getSelection();
      submitQuestion(ans);
    } else if(i==2){
      let ans='answer-2';
      //console.log(ans);
      //console.log(i);
      getSelection();
      submitQuestion(ans);
    } else if(i==3){
      let ans='answer-3';
      //console.log(ans);
      //console.log(i);
      getSelection();
      submitQuestion(ans);
    } else if(i==4){
      let ans='answer-4';
      //console.log(ans);
      //console.log(i);
      getSelection();
      submitQuestion(ans);
    } else if(i==5){
      let ans='answer-2';
      //console.log(ans);
      //console.log(i);
      getSelection();
      submitQuestion(ans);
    }
  }

function getSelection(){
  $("input[name='answer']").on('click', function(event) {
      console.log('`getSelection` ran');
      const eyedee = this.id;
      console.log(eyedee);
    })
}

function submitQuestion(answer) {
    $('#submit').on('click', function(event) {
      trys = ++trys;
      event.preventDefault();
      const href = $(this).attr('href');
      console.log('href is '+href);
      //window.history.pushState(null,null,href); //prints false to console



      if(document.getElementById(answer).checked) {
        score = ++score;
        console.log('`submitQuestion` ran - right answer');
        //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript
        $.ajax({
             url: href,
             success: function(data){
                 $("#submit, #trys, #score").fadeOut(500, function(){ // if input[name='answer'] is put in here the loop will loop once for every input[name='answer'] that exists (4 times)
                     console.log($(data).filter('form').html());
                     const newPage = $(data).filter('form').html();// gets form content from the start page (index.html), does not work for getting 'fieldset'
                     // has to look for a parent element, if a child is looked for then newPage is undefined
                     const foot = $(data).filter('footer').html();
                     console.log('right answer');
                     //console.log(data); // data is showAnswer.html
                     //console.log(but); // but is 
                     $('form').html(newPage);
                     
                     $("input[name='answer']").fadeOut(500);
                     $('#message').html("Nice!! You're Correct!!");
                     $('#message').addClass('green');
                     $('#message').hide().fadeIn(500);
                     $('#'+answer+'-text').html('Correct Answer');
                     $('#'+answer+'-text').hide().fadeIn(500);

                     $('footer').html(foot);
                     //$('footer').hide().fadeIn(500);
                     $('#score').html(score).hide().fadeIn(500);
                     //$('#score').hide().fadeIn(500);
                     $('#trys').html(trys).hide().fadeIn(500);
                     //$('#trys').hide().fadeIn(500);

                     if (trys<5){
                       console.log(trys);
                       $('.button').html(`<button type='submit' id='submit' href='Q${i+1}.html'>Next Question</button>`).hide().fadeIn(500);
                       nextQuestion();
                     } else{
                       $('.button').html("<button type='submit' id='submit' href='Finish.html'>Finish Quiz</button>").hide().fadeIn(500);
                       nextQuestion();
                     };
                     
                 })
             }
         })
         
      }else {
        console.log(document.getElementById(answer).checked);
        console.log('`submitQuestion` ran - wrong answer');
        let sel = $("input[name='answer']:checked").val();
        console.log('sel is '+sel);
        //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript
        $.ajax({
             url: href,
             success: function(data){
                 $('#submit, #trys, #score').fadeOut(500, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     console.log('wrong answer');
                     //console.log(newPage);
                     //console.log(data); // data is showAnswer.html
                     //console.log(but); // but is
                     $('form').html(newPage); // add the 'form' element of Show Answer to the page
                     // only once the form element is there, can jquery call ids from it as the code does below
                     $("input[name='answer']").fadeOut(500);
                     $("input[name='answer']:checked").fadeOut(500);
                     $('#message').addClass('red');
                     $('#message').html("Oops!").hide().fadeIn(500);
                     $('#'+answer+'-text').html('Correct Answer').hide().fadeIn(500);
                     $('#'+sel+'-text').html('Your Answer').hide().fadeIn(500);

                     $('footer').html(foot);
                     $('#score').html(score).hide().fadeIn(500);
                     $('#trys').html(trys).hide().fadeIn(500);

                     if (trys<5){
                       console.log(trys);
                       $('.button').html(`<button type='submit' id='submit' href='Q${i+1}.html'>Next Question</button>`).hide().fadeIn(500);
                       nextQuestion();
                     } else{
                       $('.button').html("<button type='submit' id='submit' href='Finish.html'>Finish Quiz</button>").hide().fadeIn(500);
                       nextQuestion();
                     };
                 })
             }
         })
    }
    })
  }

  function nextQuestion() {
    $('#submit').on('click', function(event) {
      event.preventDefault();
      i = ++i;
      console.log('this is i inside: '+i);
      console.log('`nextQuestion` ran');
      //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript
      if (i<=5){
        let href = 'Q'+i+'.html';
        console.log(href);
        //window.history.pushState(null,null,href);
        $.ajax({
               url: href,
               success: function(data){
                   $('.questions, footer').fadeOut(500, function(){
                       const newPage = $(data).filter('form').html();
                       const foot = $(data).filter('footer').html();
                       //console.log(data);
                       //console.log(but);
                       $('form').html(newPage);
                       $('fieldset').hide().fadeIn(500);
                       $('footer').html(foot).hide().fadeIn(500);
                       $('#score').html(score).hide().fadeIn(500);
                       $('#trys').html(trys).hide().fadeIn(500);
                       
                       countQuestions();
                   })
               }
        })
      } else{
        let href = 'Finish.html';
        //window.history.pushState(null,null,href);
        $.ajax({
               url: href,
               success: function(data){
                   $('.questions, footer').fadeOut(500, function(){
                       const newPage = $(data).filter('form').html();
                       // ------- HERE ----- fade out the form and fade in the section, fade out the footer, fade in button
                       $('form').html(newPage); // put newPage html into the form element
                       $('form').hide().fadeIn(500);
                       $('#score').html(score);
                       $('#score').hide().fadeIn(4000);
                       //$('body').css('background','url(img/final-background.jpg)');
                       $('body').css('background','url(img/final-background.jpg)').css('background-repeat', 'no-repeat').css('background-size', 'cover').css('background-position', 'center').css('height','100%');
                       startOver();
                   })
               }
        })
      }
      
    })
  }

  function startOver() {
    $('#start-over').on('click', function(event) {
      console.log('`startOver` ran');
      const href = 'Q1.html';
      event.preventDefault();
      console.log('href='+href);
      //https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript

      //window.history.pushState(null,null,href);
      $.ajax({
             url: href,
             success: function(data){
                 $('#start-over, form').fadeOut(1000, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     //console.log(data); // data is page2.1.html
                     console.log(newPage);
                     console.log(foot);
                     console.log($('section'));
                     $('form').html(newPage);
                     $('form').fadeIn(500);
                     $('footer').html(foot);
                     $('footer').fadeIn(500);
                     //$('body').css('background','url(img/final-background.jpg)');
                     $('body').css('background','url(img/woods-background.jpg)').css('background-repeat', 'no-repeat').css('background-size', 'cover').css('background-position', 'center').css('height','100%');
                     i=1;
                     score=0;
                     trys=0;
                     countQuestions();
                 })
             }
         })
    })
  }


  // when the page loads, call `handlePage`
//$(handlePage);