'use strict';
  let i = 1;
  let score = 0;
  let trys = 0
  startQuiz();

  function startQuiz() {
    $('#start').on('click', function(event) {
      const href = 'Q1.html';
      event.preventDefault();

      $.ajax({
             url: href,
             success: function(data){
                 $('#start').fadeOut(1000, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
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
    if(i==1){
      let ans='answer-4';
      getSelection();
      submitQuestion(ans);
    } else if(i==2){
      let ans='answer-2';
      getSelection();
      submitQuestion(ans);
    } else if(i==3){
      let ans='answer-3';
      getSelection();
      submitQuestion(ans);
    } else if(i==4){
      let ans='answer-4';
      getSelection();
      submitQuestion(ans);
    } else if(i==5){
      let ans='answer-2';
      getSelection();
      submitQuestion(ans);
    }
  }

function getSelection(){
  $("input[name='answer']").on('click', function(event) {
      const eyedee = this.id;
    })
}

function submitQuestion(answer) {
    $('#submit').on('click', function(event) {
      trys = ++trys;
      event.preventDefault();
      const href = $(this).attr('href');
      if(document.getElementById(answer).checked) {
        score = ++score;
        $.ajax({
             url: href,
             success: function(data){
                 $("#submit, #trys, #score").fadeOut(500, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     $('form').html(newPage);
                     $("input[name='answer']").fadeOut(500);
                     $('#message').html("Nice!! You're Correct!!");
                     $('#message').addClass('green');
                     $('#message').hide().fadeIn(500);
                     $('#'+answer+'-text').html('Correct Answer');
                     $('#'+answer+'-text').hide().fadeIn(500);
                     $('footer').html(foot);
                     $('#score').html(score).hide().fadeIn(500);
                     $('#trys').html(trys).hide().fadeIn(500);
                     if (trys<5){
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
        let sel = $("input[name='answer']:checked").val();
        $.ajax({
             url: href,
             success: function(data){
                 $('#submit, #trys, #score').fadeOut(500, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     $('form').html(newPage);
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
      if (i<=5){
        let href = 'Q'+i+'.html';
        $.ajax({
               url: href,
               success: function(data){
                   $('.questions, footer').fadeOut(500, function(){
                       const newPage = $(data).filter('form').html();
                       const foot = $(data).filter('footer').html();
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
        $.ajax({
               url: href,
               success: function(data){
                   $('.questions, footer').fadeOut(500, function(){
                       const newPage = $(data).filter('form').html();
                       $('form').html(newPage);
                       $('form').hide().fadeIn(500);
                       $('#score').html(score);
                       $('#score').hide().fadeIn(4000);
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
      const href = 'Q1.html';
      event.preventDefault();
      $.ajax({
             url: href,
             success: function(data){
                 $('#start-over, form').fadeOut(1000, function(){
                     const newPage = $(data).filter('form').html();
                     const foot = $(data).filter('footer').html();
                     $('form').html(newPage);
                     $('form').fadeIn(500);
                     $('footer').html(foot);
                     $('footer').fadeIn(500);
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