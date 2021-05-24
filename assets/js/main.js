---
---

/*###########################
  Navbar transition on scroll 
  ###########################*/
 function checkScroll(){
  var startY = $('.navbar').height() * 5; //The point where the navbar changes in px

  if($(window).scrollTop() > startY){
      $('.navbar').addClass("scrolled");
  }else{
      $('.navbar').removeClass("scrolled");
  }
}

if($('.navbar').length > 0){
  $(window).on("scroll load resize", function(){
      checkScroll();
  });
}

/*##########################
  Copy to clipboard on click
  ##########################*/
function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported('copy');
  var elOriginalText = el.attr('data-original-title');

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Copied!' : 'Whoops, not copied!';
      el.attr('data-original-title', msg).tooltip('show');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(copyTextArea);
    el.attr('data-original-title', elOriginalText);
  } else {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}

$(document).ready(function() {
  // Initialize
  // ---------------------------------------------------------------------

  // Tooltips
  // Requires Bootstrap 3 for functionality
  $('.js-tooltip').tooltip();

  // Copy to clipboard
  // Grab any text in the attribute 'data-copy' and pass it to the 
  // copy function
  $('.js-copy').click(function() {
    var text = $(this).attr('data-copy');
    var el = $(this);
    copyToClipboard(text, el);
  });
});

/*###############################
  MDBootstrap (animate on scroll)
  ###############################*/
new WOW().init();

/*###########
  Radar Chart
  ###########*/

/* Set-up */
const data = {
  labels: [
    {% for item in site.data.skills %}'{{ item.skill }}',{% endfor %}
  ],
  datasets: [{
    label: 'Competency',
    data: [
      {% for item in site.data.skills %}'{{ item.level }}',{% endfor %}
    ],
    fill: true,
    backgroundColor: '#cce4f150',
    borderColor: '#2694fa',
    pointBackgroundColor: '#2694fa',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#2694fa',
  }]
};

/* Config */
const config = {
  type: 'radar',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    pointLabelFontSize: 20,
    elements: {
      line: {borderWidth: 3}
    },
    plugins: {
      legend: {display: false}
    },
    scales: {
      r: {
        angleLines: {
            display: false
        },
        suggestedMin: 0,
        suggestedMax: 5,
        pointLabels: {
          font: {
            size: 15,
          }
        }
      },
    }
  }
};

/* Render chart */
var myRadarChart = new Chart(
  document.getElementById('myRadarChart'),
  config,
);