var quotes = ["\"Musicians play their instruments. I play the orchestra.\" - <a target='blank' href='http://www.wsj.com/articles/apple-co-founders-allies-take-aim-at-hollywood-over-steve-jobs-1444000308'>The 'opportunistic Steve Jobs movie'</a>",
            "\"It doesn't matter if the glass is half empty or half full; all that matters is you're the one pouring the water.\" - Mark Cuban"];
var index = 0;
var booksAdded = false;

function changeQuote() {
    if(index == quotes.length) {
        index = 0;
    }
    $("#quotes").html(quotes[index++]);
}

function emailSampleHandler() {
    input_email = $(".freelance-proj-email-field").val();
    if(input_email) {
        email = {"email":input_email};
        $(".freelance-proj-email-button").val("Sent!");
        $(".freelance-proj-email-field").val("");
        $.ajax({
            url:"https://skurt-esender.herokuapp.com/send/",
            type: "GET",
            crossDomain: true,
            data: email,
            success: function(data) {
                $(".freelance-proj-email-button").val("Get Sample");
            },
            error: function(data) {
                $(".freelance-proj-email-button").val("Get Sample");
            }
        });
    }
}

$(document).ready(function() { 
    var dur = 625;
    $(".down-here").click(function() {
        $("html,body").animate({
          scrollTop: $(".concept-statement").offset().top + 100
        }, dur);
        $(".down-here").hide();
    });
    setInterval(function() {
        $(".down-here").fadeTo("fast", 0.3);
        $(".down-here").fadeTo("fast", 1);
    }, 1000);

    $("h1").animate({color:"#ffffff"}, dur, function() {
        $("h3").animate({color:"#ffffff"}, dur, function() {
            $(".socials").fadeIn(dur, function() {
                $(".concept-statement h4").fadeIn(dur);
            });
        });
    });


    $("header").animate({backgroundColor:"#131314"}, 0);
    $('.concept-statement').waypoint(function(direction) {
        if (direction == "up") {
            $("h1").animate({color:"#ffffff"}, {duration:dur, queue:false});
            $("body").animate({ backgroundColor: "#131314" }, {duration:dur, queue:false});
            $("h3").animate({color:"#ffffff"}, {duration:dur, queue:false});
            $("header").animate({backgroundColor:"#131314"}, {duration:dur, queue:false});
            $(".work-time").hide();
            $(".down-here").show();
        }
        else if (direction == "down") {
            $("h1").animate({color:"#131314"}, {duration:dur, queue:false});
            $("body").animate({ backgroundColor: "#ffffff" }, {duration:dur, queue:false});
            $("h3").animate({color:"#131314"}, {duration:dur, queue:false});
            $("header").animate({backgroundColor:"#ffffff"}, {duration:dur, queue:false});
            $(".work-time").show();
            $(".down-here").hide();
        }
    },
    {
        offset: function() {
            return 0;
        }
    });

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("#kickass").hide();
    }
    if(!(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent))) {
        $("head").append("<link href='https://fonts.googleapis.com/css?family=Muli:300' rel='stylesheet' type='text/css'>");
    }

    $(".freelance-proj-email-button").click(function() {
        emailSampleHandler();
    });
    $(".freelance-proj-email-field").keydown(function(e) {
        if(e.keyCode == 13){
            emailSampleHandler();
        }
    });

    setInterval(changeQuote, 10000);
}).scroll(function(){
    if($(this).scrollTop() >= $("#skills").position().top && !booksAdded){
        var books = $("#reading-list");

        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_buffet.jpg\"/><h5>Warren Buffet and the Interpretation of the Financial Statements</h5><h6>Mary Buffet and David Clark</h6><p>I read this book when I was taking an accounting class at UCSD. Although I wasn't a big fan of how this book was written, I learned a lot about accounting. The book was similar to an easy-to-read glossary of accounting terms. It outlined how Warren Buffet looked for particular metrics on companies' financial statements to value their stock prices and evaluate their \"durable competitive advantage\". I didn't take the book to heart and apply these concepts to investing in the stock market, but it definitely helped me understand financial statements on Yahoo! Finance.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_carnegie.jpg\"/><h5>How to Win Friends &amp; Influence People</h5><h6>Dale Carnegie &bull; <a href='/pdf/Carnegie.pdf'>Notes</a></h6><p>This classic truly lived up to its highly regarded reviews. It is fascinating how a book written almost 80 years ago is still so relevant and applicable. I thought my emotional intelligence and people skills were adequate until I read about how Carnegie handled people. His people-centric, common sense approach requires the practitioner to really understand the nature of human behavior. I had a hard time putting a few of Carnegie's principles into practice just because I couldn't relate to how many people behave. For instance, Carnegie suggested to \"call attention to other people's mistakes indirectly\", but I really prefer to receive very direct criticism when my work is subpar. It's going to take me some time to really put these principles to work.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_covey.jpeg\"/><h5>The 7 Habits of Highly Effective People</h5><h6>Stephen Covey &bull; <a href='/pdf/Covey.pdf'>Notes</a></h6><p>Dubbed as the blueprint for personal development when it was published in 1990, <i>The 7 Habits</i> certainly does not disappoint. It offers principles that I find very useful in life, including but definitely not limited to workplaces, relationships, leadership, and management. Covey's work helps me conceptualize the principles behind growing, changing, and becoming a more effective human. Although easy to understand, the 7 habits are very layered and difficult to put into practice. It is going to take me years to really get all the habits down, since they require a whole new level of paradigm shiftings. This is definitely not a quick life-hack type of book; the concepts preached here require years and years of commitment and a lot of integrity to implement.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_cuban.jpg\"/><h5>How to Win at the Sport of Business</h5><h6>Mark Cuban</h6><p>Mark Cuban has always been my favorite Shark ever since he first appeared on Season 3 of <i>Shark Tank</i>. I admire the fact that he's a very intelligent guy who cares less about what other people have to say about him and more about his businesses. I bought his \"book\", or rather a compilation of his edited blog posts, at an airport and it was probably the best $5 I've spent. Cuban's stories of rags to riches were very inspirational and witty. I especially like his advice on \"finding the path of least resistance\", a simple concept to validate the best solution to a problem.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_davis.jpg\"/><h5>Don't Know Much about History</h5><h6>Kenneth Davis</h6><p>This was my summer reading assignment for AP U.S history in high school. I wasn't very interested in history at the time, but this witty, entertaining anti-textbook really made the whole learning experience a lot better. It explored the many sides that other history textbooks chose to ignore: from when Christopher Columbus arrived until the historic election of the 44th President Barack Obama. It definitely did not go into details of any specific event, but that was the last thing I needed in high school...</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_driscoll.jpeg\"/><h5>Python 201: Intermediate Python</h5><h6>Michael Driscoll &bull; <a href='/pdf/Driscoll.md'>Notes</a></h6><p>I wish I had a lot of good things to say about this book, but I don’t… The overall read was a let-down for me. Beside the unacceptable amount of typos, this book really lacked depth and specificity. It tried to cover too much but accomplished too little. Although there were a few very good chapters on generators and advanced modules, the majority of the book only brushed on seemingly-advanced topics. For example, every so-called \"intermediate Python programmer\" should be able to write regular expressions well. He/she wouldn't need an intro to regex chapter in this book. I really wish the book dived much deeper into these topics.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_fisher.jpg\"/><h5>Getting to Yes</h5><h6>Roger Fisher and William Ury</h6><p>I have always thought of negotiation as a battle of will in which the more stubborn party will eventually force the other side to give in. According to Roger Fisher and William Ury, this approach of negotiation, called positional negotiation, does not yield the optimal outcomes for either party and may even damage the relationship in some cases. Fisher and Ury introduced the concept of principled negotiation, an merit-based approach aimed to protect both parties' interests without having to give in to pressures and deceptive attacks. Principled negotiation separated the people from the problems, focused solely on the parties' interests, attempted to create more options, and made final decisions based on some standard criteria. I realize that I have already been loosely practicing principled negotiation, but this book really helps me organize my thoughts into a comprehensive layout for future usage.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_gilchrist.jpg\"/><h5>Learning iBeacon</h5><h6>Craig Gilchrist</h6><p>I had a chance to be one of the reviewers for this wonderful intro to iBeacon book. iBeacon is a very interesting technology standard developed by Apple Inc. It is, however, still very green in the commerce world in term of adoption. Gilchrist did a solid job on familiarizing iOS developers with this technology. His detailed tutorials were very easy to follow. If you're looking to get your feet wet with this full-of-potential technology, I would recommend giving this a read.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_gladwell.jpg\"/><h5>Outliers</h5><h6>Malcolm Gladwell &bull; <a href='/pdf/Gladwell.pdf'>Notes</a></h6><p>A uniformly delightful book about the definition of success, Outliers was my very first interaction with Malcolm Gladwell. I had seen him a lot on TED Talks' YouTube channel and was always impressed with his unique perspective on the world. I witnessed his brilliance first hand in this extremely intriguing piece. Gladwell argued that we paid too much attention to how the outliers - the best, the brightest, the most successful - of the world were like, instead of where they came from. According to Gladwell, success followed a predictable course. It's not the brightest who succeed. Nor is it simply a sum of decisions and efforts were made on our own behalf. It is, rather, a gift. Outliers are those who have been given the opportunities and have had the strength and presence of mind to seize them. These are people who are willing to make a bargain with life and sacrifice many aspects of their lives to put in (literally) thousands of hours of work toward their goals. <b>\"There aren't any 'naturals' who float effortlessly to the top, nor are there any 'grinds', who work harder than everyone else, yet just don't have what it takes to break the top ranks.\"</b> Outliers had become one of my favorites since I could really resonate with the idea of effort-reward that Gladwell advocated for.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_gladwell2.jpg\"/><h5>David and Goliath</h5><h6>Malcolm Gladwell &bull; <a href='/pdf/Gladwell2.pdf'>Notes</a></h6><p>After reading Outliers, I was pretty certain that Gladwell's writing style would keep me reading every night - and I was right. In David and Goliath, Gladwell challenged us to think about the disadvantages of advantages - and the advantages of seeming disadvantages. This thought-provoking book dissected the centuries-old tale of a little shepherd boy named David, a true underdog, who somehow defeated the giant Goliath. The phrase \"David and Goliath\" has become an illusion in the everyday English language to describe a seemingly impossible victory. Gladwell explored why small-sized classrooms, having too much wealth, and attending Ivy League schools could put us in much worse-off positions. He also told great stories of people whose disadvantages helped them achieve incredible things that no one expected them to: David Boies - arguably one of the greatest American lawyer, was a dyslexic; Gary Cohn - president of Goldman Sachs, was a dyslexic; Dr. Emil Freirich - renowned for discovering an effective treatment for childhood acute leukemia, lost his parent when he was young. Although not everything in this book would be convincing to everyone, a lot of the stories told really made me stop and have a second thought at the giants I know. A mentally-intriguing, counterintuitive reading experience. <b>\"There is a set of advantages that have to do with material resources, and there is a set that have to do with the absence of material resources - and the reason underdogs win as often as they do is that the latter is sometimes every bit the equal of the former.\"</b></p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_greenfield.png\"/><h5>Two Scoops of Django</h5><h6>Daniel Roy Greenfield and Audrey Roy Greenfield &bull; <a href='/pdf/Greenfield.pdf'>Notes</a></h6><p>I've been using Django on a few projects and have got an amateur understanding of the framework. One of my mentors recommended this reference book and it has made me very aware of the design patterns and good practices for huge Django projects. The Greenfields have made this reference book a fun reading experience. I really enjoyed studying numerous code comparisons between good and bad practices, along with the rationale behind each decision. In the near future, I expect to be working on more involved Django projects and hope that the lessons learned from this book will come in handy.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_hecke.jpg\"/><h5>Learning iOS Design</h5><h6>William Van Hecke &bull; <a href='/pdf/Hecke.pdf'>Notes</a></h6><p>This is a pretty good read for astute iOS users to systematically understand the intentions behind the native elements. I got a glimpse into how software UI is traditionally crafted. Although slow at times, this book did a decent job at explaining why certain designs work and others don't.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_hsueh.jpg\"/><h5>Chineasy</h5><h6>ShaoLan Hsueh</h6><p>This book is a genius and entertaining way to learn Chinese characters. I'm mostly a visual learner; I learn by looking at things. <i>Chineasy</i> allows me to do exactly that: every building block characters in this colorful book is cleverly drawn into a memorable image, making the entire learning process less intimidating. Although I still don't know their pronunciation, I'm slowly picking up the meaning of the most basic characters in the Chinese language. In the next few years, I'm making it my goal to be able to read basic characters and hold a casual conversation with a native.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_knight.jpg\"/><h5>The Power of Negative Thinking</h5><h6>Bob Knight and Bob Hammel</h6><p>I've always admired Bob Knight as one of the greatest NCAA basketball coaches. His unorthodox coaching techniques, as described in his book, are actually very applicable to a lot of aspects in my everyday life: writing software, planning the week, or packing for a trip. His philosophy could be summed up as <b>\"being alert to the possible negatives in any situation is the best way to bring out positive results.\"</b> He argues against illusory superiority (the tendency to overestimate one's qualities over those of others) and points out that solid preparation trumps all estimation. In Knight's world, the team that makes less mistakes will always be the winner and the only way to achieve that is through constant practice and preparation. This piece reminds me that tomorrow won't always be better unless I thoroughly prepare for the worst today.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_krug.jpg\"/><h5>Don't Make Me Think</h5><h6>Steve Krug &bull; <a href='/pdf/Krug.pdf'>Notes</a></h6><p>I would recommend this book to anyone who's looking to start doing UI/UX work. This classic has stood the test of time since the dot com era. It is very easy to read and sprinkled with humors and illustrations. The primary premise of the book revolves around Krug's first law of usability - users shouldn't have to spend anytime, even milliseconds, to understand your design. This challenges a lot of design decisions that I have to make everyday, since I'm a big fan of flat and minimalism designs (if you couldn't already tell!), which could potentially put a heavier cognitive load on the users.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_levitt.jpg\"/><h5>Freakonomics</h5><h6>Steven Levitt and  Stephen Dubner</h6><p>I first watched the film version of <i>Freakonomics</i> in high school, when I did not have the knowledge to appreciate its brilliance. Then, I spotted a hard copy at a book sales on campus for merely 60 cents. Although this book has no unifying theme, it does a brilliant job at illustrating how data can challenge, sometimes even invalidate, conventional wisdoms. Levitt and Dubner had no problem presenting many controversial research topics and backing them up by analyzing a massive amount of data: from topics like \"<i>Roe v. Wade</i> was the cause of crime rates drop in the U.S in the 1990s\" to \"parents' obsessive behaviors have little effect on how successful or unsuccessful their children will turn out\". The book was really eye-opening. Yes, these topics could be very offensive to some, but it's pretty hard to argue with Levitt and Dubner when the data is on their side.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_lowe.jpg\"/><h5>Warren Buffet Speaks</h5><h6>Janet Lowe</h6><p>When I saw \"Warren Buffet\" in the title, my mind was sparked with enthusiasm, only to find out that this piece wasn't really about the Buffettology investing techniques that I was hoping to learn. Instead, it was a collection of very witty and inspirational quotes and stories from the Oracle of Omaha himself. Although not one of my favorite reads, the book did bring some good quotes. My favorite: <b>\"Investing in yourself is the best thing you can do. Anything that improves your own talents; nobody can tax it or take it away from you\"</b>.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_norman.jpg\"/><h5>The Design of Everyday Things</h5><h6>Don Norman &bull; <a href='/pdf/Norman.pdf'>Notes</a></h6><p>This is a very academic and foundational text on human-computer interaction and usability. Although I struggled through this textbook-like read, I found it useful to understand the common language used in the usability and related fields. I especially like Norman’s advice on solving design problems: \”<b>Never solve a problem that you are asked to solve because more often than not, that isn't the real, the root, or the fundamental problem</b>\”. This couldn’t be more true in the world of software’s UI design — or software in general. The book falls short for me when Norman starts making an argument for not tolerating poor designs. He seems to think that everyone should avoid using stoves that have poor mappings or normal light switches. From an economic standpoint, stoves are usually sold to builders and light switches to electricians. The majority of end users don’t get to make these decisions. Nevertheless, it was very interesting to read from a very renowned former Apple Fellow and UCSD faculty member.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_oleary.jpg\"/><h5>Cold Hard Truth On Men, Women, and Money</h5><h6>Kevin O'Leary</h6><p>When I first started watching <i>Shark Tank</i>, I wasn't very fond of Kevin \"Mr. Wonderful\" O'Leary because of his blunt comments and seemingly heartless attitude. But then I realized when we took the emotions and the people out of the equation and solely focused on the numbers, O'Leary's comments made a lot of sense. His book has taught me how to be extremely disciplined when it comes to personal finance at different stages in life and how to swallow the cold, hard truth about money that a lot of people choose to ignore. O'Leary's advice on money is easy to understand, but very hard to master and maintain. After all, it's pretty hard to imagine the first thing a newly-wed couple need to do, according to O'Leary, is to draft a prenup...</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_orwell.jpg\"/><h5>1984</h5><h6>George Orwell</h6><p>This is probably the darkest thing I've ever read thus far. I first read this book in high school and reread it again years later, since nothing about the negative dystopia sticked to my head the first time. I don't usually read social science fiction, but Orwell's works have always managed to catch my attention every time. Although I don't exactly enjoy reading most of his works, I wholeheartedly agree on their brilliance. </p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_sinek.jpg\"/><h5>Start with Why</h5><h6>Simon Sinek</h6><p>I first learned about Simon Sinek through his <a href=\"https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action\" target=\"blank\">TED talk</a>. Through his concept of \"The Golden Circle\", Sinek explained the reason why organizations and leaders like <i class=\"fa fa-apple\"></i> Apple Inc, Martin Luther King Jr., and the Wright brothers were so influential: they all start with WHY. Every business or organization know WHAT they do. Some know HOW they do it. Very few are able to articulate WHY they do what they do. My favorite quote from this piece would have to be <b>\"People don't buy what you do; they buy why you do it.\"</b> Sinek supported this theory by showing how the Golden Circle aligned perfectly with a cross section of the human brain. The inner-most part of our brains, the limbic brain (responsible for emotions and decisions making but incapable of language or analysis), corresponds perfectly to the WHY component in the Golden Circle. Sinek's book reminds me that money and fame are always byproducts of WHY. When I clearly articulate why I do what I do, I will have what it takes to lead and inspire others.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_tzu.jpg\"/><h5>The Art of War</h5><h6>Sun Tzu &bull; <a href='/pdf/Tzu.pdf'>Notes</a></h6><p>This tough piece, translated from a century-old book, has been extensively read and studied by military strategists and businessmen alike. It took me a great deal of effort to get through only a little over 100 pages of text. Sun Tzu's military tactics could definitely be applied to modern business, where deception is common in today's world. Although highly regarded, I find these tactics very hard to interpret and even more so to put them to practice.</p></div>");
        books.append("<div class=\"book\"><img src=\"img/books/long_tran_apple_weinschenk.jpg\"/><h5>100 Things Every Designer Needs to Know about People</h5><h6>Susan Weinschenk &bull; <a href='/pdf/Weinschenk.pdf'>Notes</a></h6><p>As I was trying to become better at designing software user interfaces, I thought it would make sense to understand the end users' behaviors. Instead of delving into platform-specific UI elements, this book covered a wide array of subtle nuisances that made people tick when interacting with an interface. With a strong emphasis on the human being's perceptions and senses, this book really helped me nurture a good design intuition and exposed me to the science behind many positive and negative user experiences. This book is not a checklist from which, upon completion, will yield beautiful UI. It is meant for developing design intuitions and providing scientific explanations to rationalize them.</p></div>");
        var owl = $("#reading-list");
        owl.owlCarousel({
          navigation : true,
          pagination: true,
          singleItem:true,
          lazyLoad: true,
          lazyFollow: true,
        });
        booksAdded = true;
    }
});
