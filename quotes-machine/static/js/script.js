function getRandomColor() {
     var letters = 'BCDEF'.split('');
     var color = '#';
     for (var i = 0; i < 6; i++ ) {
         color += letters[Math.floor(Math.random() * letters.length)];
     }
     return color;
 }

// Knockout JS
function QuoteAppViewModel(){
  var self = this;

  self.quote = ko.observable("");
  self.author = ko.observable("");

  self.tweet = function(){
    var url = 'https://twitter.com/home?status=';
    var post = '\"'+ self.quote() + '\" ' + self.formatAuthor();

    var totalLength = post.length;

    if (totalLength > 140){
      alert("Tweets must be 140 characters or less");
    } else {
      window.open(url + post, '_blank');
    }
  }

  self.formatAuthor = ko.computed(function(){
    if (self.author()){
      return "- " + self.author();
    } else {
      return '';
    }
  });

  self.formatQuote = ko.computed(function(){
    return '<h1> <i class="fa fa-quote-left"></i> ' + self.quote() + ' <i class="fa fa-quote-right"></i>' + '</h1>';
  });

  self.randomQuote = function(){
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json){
      self.quote(json.quoteText);
      self.author(json.quoteAuthor);
      $('.container').css({"background-color": getRandomColor()});
    });
  }

  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json){
    self.quote(json.quoteText);
    self.author(json.quoteAuthor);
  })

}

ko.applyBindings(new QuoteAppViewModel());
